# Contact & Consultation Booking System — Implementation Plan

## Stack snapshot (verified from package.json and source)

| Item | Version / path |
|------|---------------|
| Next.js | 16.4.6 — App Router, no `runtime = 'edge'` allowed |
| React | 19.3.0 — `useActionState` lives in `'react'`, not `'react-dom'` |
| TypeScript | 5, strict mode, path alias `@/*` → `src/*` |
| Tailwind | 4.3.3 — CSS variables in `src/app/globals.css` |
| Payload CMS | 3.94.1 — do NOT touch `src/payload.config.ts` or collections |
| Fonts | `font-playfair` / `font-jakarta` Tailwind classes |
| Color tokens | `text-navy`, `text-teal`, `text-gold`, `bg-offwhite`, `border-border` |
| Shadow tokens | `shadow-card-1`, `shadow-card-2`, `shadow-card-3` |

## npm install command

```bash
npm install react-hook-form zod @hookform/resolvers resend @marsidev/react-turnstile @calcom/embed-react
```

Package versions as confirmed on npm: react-hook-form@7.92.0, zod@4.6.7, @hookform/resolvers@7.0.8, resend@6.39.0, @marsidev/react-turnstile@1.6.3, @calcom/embed-react@1.5.3.

If `@marsidev/react-turnstile` or `@calcom/embed-react` fail to install (peer conflict), fall back:
- Turnstile: render `<iframe src="https://challenges.cloudflare.com/turnstile/v0/api.js" ...>` in a `useEffect`-mounted div; extract token from a hidden input set by the Turnstile callback.
- Cal embed: render `<iframe src="https://cal.com/pulse-consultant/consultation?embed=true" ...>` directly.

## Environment variables

Append to both `.env.local` and `.env.example` (never overwrite existing entries):

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@pulseconsultant.ng
RESEND_TO_EMAIL=info@pulseconsultant.ng

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x000000000000000000000000
TURNSTILE_SECRET_KEY=0x000000000000000000000000000000000000000000

# Cal.com
NEXT_PUBLIC_CAL_LINK=pulse-consultant/consultation
```

## TypeScript gotchas for this stack

### 1. `useActionState` import — React 19

```ts
// CORRECT — React 19
import { useActionState } from 'react'

// WRONG — will cause a compile error in React 19
import { useFormState } from 'react-dom'
```

### 2. Server Action directive placement

The `'use server'` directive MUST be the first statement in a **dedicated file**. Never inline it inside a Client Component file. The coder must create `src/app/actions/submitInquiry.ts` where the first line is literally `'use server'` — not a comment, not an import, not a blank line.

```ts
// src/app/actions/submitInquiry.ts
'use server'                      // ← line 1, nothing before it

import { z } from 'zod'
// ...
```

Colocating `'use server'` inside a `'use client'` file is a compile error in Next.js App Router.

### 3. Portal mount guard (SSR hydration)

`ReactDOM.createPortal` must be guarded by a `mounted` state to prevent SSR/hydration mismatch:

```ts
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
return createPortal(<ModalContent />, document.body)
```

### 4. `useActionState` signature with Server Action

When wiring RHF + `useActionState`, the Server Action must accept `(prevState, formData)` as its first two arguments (the `initialState` becomes `prevState`):

```ts
export async function submitInquiry(
  prevState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> { ... }
```

On the client, call `useActionState(submitInquiry, initialState)` — it returns `[state, formAction, pending]`.

### 5. RHF + Server Action: use `handleSubmit` → manual fetch or `requestSubmit`

React Hook Form's `handleSubmit` intercepts submission. To keep both RHF validation and `useActionState` working together, trigger the native form submit programmatically via `formRef.current?.requestSubmit()` inside `handleSubmit`, so the Server Action fires through the form's `action` prop and `useActionState` captures the result.

### 6. Zod v4 API differences

Zod 4 (4.x) installs as `zod` (not `zod/v4`). The import is still `import { z } from 'zod'`. The `.flatten()` method on `ZodError` is now `error.flatten()` — same call, still valid. The shape of `fieldErrors` is `Record<string, string[]>`.

### 7. `@calcom/embed-react` — dynamic import with `ssr: false`

The Cal.com embed accesses `window` on mount. Wrap the import with `next/dynamic` and `ssr: false` to avoid SSR errors:

```ts
// src/components/contact/CalWidget.tsx
'use client'
import dynamic from 'next/dynamic'
const Cal = dynamic(() => import('@calcom/embed-react').then(m => m.Cal), { ssr: false })
```

### 8. Turnstile token flow

`@marsidev/react-turnstile` renders a widget; the `onSuccess` callback receives the token string. Store it in a `useRef` (not state, to avoid re-renders) and append it to `FormData` before submission or as a hidden input.

---

## Implementation plan

---

- [ ] 1. Install npm dependencies.
      Run `npm install react-hook-form zod @hookform/resolvers resend @marsidev/react-turnstile @calcom/embed-react` from the project root.
      Files: `package.json`, `package-lock.json` (auto-updated)
      Verify: `npm ls react-hook-form zod resend @marsidev/react-turnstile @calcom/embed-react` — all five packages listed without errors.

---

- [ ] 2. Append new env vars to `.env.local` and `.env.example`.
      Append (do NOT overwrite) the Resend, Turnstile, and Cal.com blocks shown in the "Environment variables" section above to both files.
      Files: `.env.local`, `.env.example`
      Verify: Both files retain their existing Payload CMS and `NEXT_PUBLIC_SERVER_URL` entries, and the new keys are present. Run `grep RESEND_API_KEY .env.local` to confirm.

---

- [ ] 3. Create `src/lib/schemas/inquirySchema.ts` — Zod schema + exported constants.

      Export:
      - `CONSULTING_SERVICES`: readonly array of the 9 service slugs/labels
        ```ts
        export const CONSULTING_SERVICES = [
          'Financial Advisory & Planning',
          'Strategic Business Consulting',
          'Investment Management',
          'Tax Planning & Compliance',
          'Risk Assessment & Management',
          'Corporate Governance',
          'Mergers & Acquisitions Advisory',
          'Business Restructuring',
          'Public Sector & Development Finance',
        ] as const
        ```
      - `SECTORS`: readonly array of the 5 sector names
        ```ts
        export const SECTORS = [
          'Financial Services',
          'Energy & Natural Resources',
          'Real Estate & Infrastructure',
          'Manufacturing & Industry',
          'Public Sector & NGOs',
        ] as const
        ```
      - `InquirySchema`: `z.object` with fields: `fullName` (min 2), `email` (email), `phone` (optional string), `company` (optional string), `service` (enum from CONSULTING_SERVICES), `sector` (optional enum from SECTORS), `message` (min 20), `turnstileToken` (string, non-empty).
      - `InquiryInput` type: `z.infer<typeof InquirySchema>`.

      Files: `src/lib/schemas/inquirySchema.ts` (new file)
      Verify: `npx tsc --noEmit` passes with no new errors.

---

- [ ] 4. Create `src/app/actions/submitInquiry.ts` — Server Action.

      First line must be `'use server'`.

      Logic:
      1. Parse `formData` into an object using `Object.fromEntries(formData)`.
      2. Validate with `InquirySchema.safeParse(...)`. Return `{ success: false, errors: validatedFields.error.flatten().fieldErrors }` on failure.
      3. Verify Cloudflare Turnstile: POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `secret = process.env.TURNSTILE_SECRET_KEY` and `response = data.turnstileToken`. Parse response JSON; if `success !== true`, return `{ success: false, error: 'Spam check failed. Please try again.' }`.
      4. Send email via Resend SDK (`new Resend(process.env.RESEND_API_KEY)`): `from` = `RESEND_FROM_EMAIL`, `to` = `RESEND_TO_EMAIL`, subject = `New Inquiry from ${name} — ${service}`, HTML body includes all fields in a styled table.
      5. On Resend error, return `{ success: false, error: 'Failed to send message. Please try again.' }`.
      6. On success, return `{ success: true }`.

      Exported type `InquiryActionState`:
      ```ts
      export type InquiryActionState =
        | { success: false; errors?: Record<string, string[]>; error?: string }
        | { success: true }
        | null
      ```

      Function signature: `export async function submitInquiry(prevState: InquiryActionState, formData: FormData): Promise<InquiryActionState>`

      Files: `src/app/actions/submitInquiry.ts` (new file)
      Verify: `npx tsc --noEmit` passes. No `runtime = 'edge'` anywhere in this file.

---

- [ ] 5. Create `src/lib/whatsapp.ts` — WhatsApp URL builder.

      ```ts
      const WHATSAPP_NUMBER = '2348000000000' // E.164 without +

      export function buildWhatsAppUrl(service?: string): string {
        const base = `https://wa.me/${WHATSAPP_NUMBER}`
        if (!service) return base
        const text = encodeURIComponent(
          `Hello, I'd like to enquire about your ${service} service. Please could you get back to me?`
        )
        return `${base}?text=${text}`
      }
      ```

      Files: `src/lib/whatsapp.ts` (new file)
      Verify: `npx tsc --noEmit` passes.

---

- [ ] 6. Create `src/components/contact/InquiryForm.tsx` — RHF + Zod + useActionState client form.

      `'use client'` directive at top.

      Imports: `useActionState` from `'react'`; `useForm`, `Controller` from `'react-hook-form'`; `zodResolver` from `'@hookform/resolvers/zod'`; `Turnstile` from `'@marsidev/react-turnstile'`; `submitInquiry` from `'@/app/actions/submitInquiry'`; `InquirySchema`, `CONSULTING_SERVICES`, `SECTORS` from `'@/lib/schemas/inquirySchema'`; `buildWhatsAppUrl` from `'@/lib/whatsapp'`.

      State:
      - `const [state, formAction, pending] = useActionState(submitInquiry, null)`
      - `const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<InquiryInput>({ resolver: zodResolver(InquirySchema) })`
      - `const turnstileTokenRef = useRef<string>('')`
      - `const formRef = useRef<HTMLFormElement>(null)`

      Submission flow:
      - Form `action={formAction}` (for `useActionState` wiring)
      - `onSubmit={handleSubmit(() => formRef.current?.requestSubmit())}` — RHF validates first, then triggers native submit which fires `formAction`
      - Before submitting, write turnstile token into a hidden `<input name="turnstileToken">` (or manage via a hidden input whose `value` is kept in sync via a state setter triggered by Turnstile's `onSuccess`).
      - Render `<Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} onSuccess={(token) => { turnstileTokenRef.current = token }} />` — the token must also reach `formData`; use a controlled hidden input: `<input type="hidden" name="turnstileToken" value={turnstileToken} />` where `turnstileToken` is a `useState` string updated in `onSuccess`.

      Fields (all styled with the `inputClass` pattern from the existing ContactSection):
      - `fullName` (text, required)
      - `email` (email, required)
      - `phone` (tel, optional)
      - `company` (text, optional)
      - `service` (select, CONSULTING_SERVICES, required) — also read this value via `watch('service')` to pass to `buildWhatsAppUrl`
      - `sector` (select, SECTORS, optional)
      - `message` (textarea, required, min 20 chars)
      - Turnstile widget
      - Submit button: disabled when `pending`; shows spinner text when pending

      On `state?.success === true`: show success panel identical to existing ContactSection success state, plus a "Send another message" link that calls `reset()`.
      On `state?.success === false && state.error`: show a top-level error banner.
      Field-level errors: render from both `errors` (RHF/Zod) and `state?.errors?.[field]` (server-side), preferring RHF errors.

      WhatsApp nudge: below the form, render `<a href={buildWhatsAppUrl(watch('service'))} target="_blank" ...>Prefer WhatsApp? Chat now →</a>` so the link deeplinks into the selected service.

      Props interface:
      ```ts
      interface InquiryFormProps {
        className?: string
      }
      ```

      Files: `src/components/contact/InquiryForm.tsx` (new file)
      Verify: `npx tsc --noEmit` passes. No import of `useFormState` from `react-dom`.

---

- [ ] 7. Create `src/components/contact/CalWidget.tsx` — Cal.com embed.

      `'use client'` directive at top.

      Use `dynamic` import with `ssr: false` to avoid window access during SSR:
      ```ts
      import dynamic from 'next/dynamic'
      const Cal = dynamic(
        () => import('@calcom/embed-react').then((m) => m.Cal),
        { ssr: false, loading: () => <CalPlaceholder /> }
      )
      ```

      `CalPlaceholder`: a `div` with `h-[600px] bg-slate-50 rounded-lg animate-pulse` for skeleton.

      Render `<Cal calLink={process.env.NEXT_PUBLIC_CAL_LINK ?? 'pulse-consultant/consultation'} style={{ width: '100%', height: '600px', overflow: 'scroll' }} config={{ theme: 'light' }} />` inside a `rounded-lg overflow-hidden border border-border shadow-card-1` wrapper.

      Props: none (uses env var for cal link).

      Files: `src/components/contact/CalWidget.tsx` (new file)
      Verify: `npx tsc --noEmit` passes. No SSR window errors.

---

- [ ] 8. Create `src/hooks/useConsultationModal.ts` — modal state hook.

      ```ts
      'use client'   // Not needed here — this is a plain .ts hook file; no directive required since it has no JSX

      import { useState, useCallback } from 'react'

      export type ModalTab = 'book' | 'inquiry'

      export interface ConsultationModalState {
        isOpen: boolean
        defaultTab: ModalTab
        preselectedService?: string
      }

      export function useConsultationModal() {
        const [modal, setModal] = useState<ConsultationModalState>({
          isOpen: false,
          defaultTab: 'book',
        })

        const openModal = useCallback((tab: ModalTab = 'book', service?: string) => {
          setModal({ isOpen: true, defaultTab: tab, preselectedService: service })
        }, [])

        const closeModal = useCallback(() => {
          setModal((prev) => ({ ...prev, isOpen: false }))
        }, [])

        return { modal, openModal, closeModal }
      }
      ```

      Files: `src/hooks/useConsultationModal.ts` (new file)
      Verify: `npx tsc --noEmit` passes.

---

- [ ] 9. Create `src/components/contact/ConsultationModal.tsx` — portal modal with Book/Inquiry tabs.

      `'use client'` directive at top.

      Imports: `createPortal` from `'react-dom'`; `useEffect`, `useState`, `useCallback` from `'react'`; `CalWidget`; `InquiryForm`; `ModalTab` from `'@/hooks/useConsultationModal'`.

      Mount guard (prevents hydration mismatch):
      ```ts
      const [mounted, setMounted] = useState(false)
      useEffect(() => setMounted(true), [])
      ```

      Keyboard / scroll lock:
      ```ts
      useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden'
          const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
          window.addEventListener('keydown', handleKey)
          return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKey)
          }
        }
        document.body.style.overflow = ''
      }, [isOpen, onClose])
      ```

      Structure (rendered into `document.body` via portal):
      ```
      backdrop (fixed inset-0 bg-navy/60 backdrop-blur-sm z-50)
      └── dialog panel (bg-white max-w-3xl w-full mx-auto mt-16 mb-8 rounded-xl shadow-card-3 overflow-hidden)
            ├── header (flex justify-between items-center px-6 py-4 border-b border-border)
            │     ├── Title: "Book a Consultation" (font-playfair text-navy)
            │     └── close button (×, aria-label="Close modal")
            ├── tab bar (flex border-b border-border)
            │     ├── "Schedule a Call" tab → 'book'
            │     └── "Send Inquiry" tab → 'inquiry'
            └── tab panel (overflow-y-auto max-h-[70vh] p-6)
                  ├── [book tab] <CalWidget />
                  └── [inquiry tab] <InquiryForm />
      ```

      Props interface:
      ```ts
      interface ConsultationModalProps {
        isOpen: boolean
        defaultTab?: ModalTab
        preselectedService?: string
        onClose: () => void
      }
      ```

      Pass `preselectedService` down to `InquiryForm` (add optional `defaultService?: string` prop to InquiryForm and use it as `defaultValues.service`).

      Only render portal when `mounted && isOpen` to avoid extra DOM writes.

      Files: `src/components/contact/ConsultationModal.tsx` (new file)
      Verify: `npx tsc --noEmit` passes. No runtime portal error.

---

- [ ] 10. Create `src/app/contact/page.tsx` — full /contact page (server component).

       This is a **server component** — no `'use client'` directive. It composes client subcomponents.

       Export metadata:
       ```ts
       export const metadata = {
         title: 'Contact Us | Pulse Consultant Ltd',
         description: 'Book an executive consultation or send a service inquiry to Pulse Consultant Ltd.',
       }
       ```

       Page layout (four distinct sections):

       **Section 1 — Hero banner** (bg-navy text-white py-20):
       - Breadcrumb: Home / Contact
       - `<h1>` "Get in Touch" (font-playfair)
       - Subtext about responding within one business day

       **Section 2 — Book a Consultation** (bg-white py-16, two-column on lg):
       - Left column: `<CalWidget />` (dynamic, so it renders on the client)
       - Right column: contact info card (address, phone, email, WhatsApp) — reuse the info block structure from the existing ContactSection (copy the JSX, same Tailwind classes)

       **Section 3 — Send an Inquiry** (bg-offwhite py-16):
       - Section header: "Send an Inquiry" with gold hairline
       - `<InquiryForm />` centered in a `max-w-2xl mx-auto` wrapper

       **Section 4 — Map / office strip** (bg-white py-10):
       - Full-width map placeholder (same 48-height rounded div from ContactSection)
       - Brief text: "Victoria Island, Lagos, Nigeria"

       Files: `src/app/contact/page.tsx` (new file), `src/app/contact/` directory
       Verify: `npx tsc --noEmit` passes. `npm run build` builds without error.

---

- [ ] 11. Replace `src/components/sections/ContactSection.tsx` with modal-based version.

       The homepage still imports `<ContactSection />` from `src/app/page.tsx`. The replacement must be a `'use client'` component that:
       - Renders a compact CTA strip (not the full form): `"Ready to Get Started? Book a complimentary consultation."` with two buttons — "Schedule a Consultation" and "Send an Inquiry".
       - Imports and renders `<ConsultationModal>` with `useConsultationModal` hook.
       - "Schedule" button calls `openModal('book')`; "Send Inquiry" button calls `openModal('inquiry')`.
       - Also renders a "Visit our Contact Page →" link pointing to `/contact`.
       - Preserves the existing contact info block (address, phone, email, WhatsApp links) below the CTA buttons, identical to the current ContactSection info panel, so the homepage still has contact details.

       The old inline form logic (the `useState<FormData>`, `handleSubmit`, form JSX) is removed and replaced by the modal trigger.

       Files: `src/components/sections/ContactSection.tsx` (overwrite)
       Verify: Homepage (`npm run dev`, navigate to `/`) renders the new CTA strip with both modal-trigger buttons and the contact info block. No TypeScript errors.

---

- [ ] 12. Update `src/components/layout/Header.tsx` — fix Contact nav link.

       Two changes:
       1. In `navLinks` array: change `href: '/#contact'` → `href: '/contact'`.
       2. Update `isActive` helper: change `if (href === '/#contact') return pathname === '/'` → `if (href === '/contact') return pathname === '/contact'`.
       3. Desktop CTA button: change `href="/#contact"` → `href="/contact"`.
       4. Mobile nav CTA button: change `href="/#contact"` → `href="/contact"`.

       Files: `src/components/layout/Header.tsx` (modify)
       Verify: `npx tsc --noEmit` passes. Contact link in nav now navigates to `/contact`.

---

## Build/lint fix checklist

Work through this list in order after all files are created. Each item is a known failure mode in this stack.

1. **Missing `NEXT_PUBLIC_TURNSTILE_SITE_KEY`** — if `.env.local` is not loaded at build time, `process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!` will be `undefined`. Guard with `?? ''` and add a console warning in dev mode.

2. **Zod `fieldErrors` type** — `InquirySchema.safeParse(...).error.flatten().fieldErrors` returns `Partial<Record<keyof InquiryInput, string[]>>`. Type `InquiryActionState.errors` as `Partial<Record<string, string[]>>` to avoid a strict index error.

3. **`useActionState` pending flag** — the third return value of `useActionState` is `boolean`; never destructure only two values and then reference `pending`.

4. **RHF + Server Action double-submit prevention** — the `handleSubmit` callback must check `pending` and return early if `true` to prevent double submission.

5. **Turnstile widget in SSR** — `@marsidev/react-turnstile` renders a `<script>` tag. If the component tree renders on the server, it will error. Ensure `InquiryForm.tsx` has `'use client'` at the top.

6. **Cal.com `ssr: false`** — confirm the dynamic import wraps the `Cal` component import, not just a re-export. The loading placeholder must be a valid React element (not `undefined`).

7. **Portal `document` reference** — `createPortal(jsx, document.body)` will throw during SSR if the `mounted` guard is missing. Confirm the guard pattern from item 9 is in place.

8. **`eslint` on new files** — run `npm run lint` and fix any `react-hooks/exhaustive-deps` warnings. The `useCallback` in `useConsultationModal` should list dependencies correctly (all empty deps are intentional — `setModal` is stable from `useState`).

9. **`@types/react` version** — `@types/react@^19` is already installed. `useActionState` types ship with React 19 typedefs, so no extra `@types/*` packages are needed.

10. **Server Action file boundary** — if `submitInquiry` is ever imported into a client bundle accidentally (e.g., via a barrel `index.ts`), Next.js will strip the implementation but the TypeScript path is still live. Do not create a barrel `src/app/actions/index.ts` that re-exports it.

11. **`next/dynamic` and `loading` prop** — the `loading` prop on `dynamic()` accepts `() => JSX.Element | null`, not a component with a display name. The skeleton div must be returned from an inline arrow function.

12. **Final build check** — run `npm run build` from the project root. The only acceptable output is a successful build. If Payload CMS migration errors appear (database not available), they are expected in CI and do not block the build — look only at TypeScript/Webpack/Turbopack errors.
