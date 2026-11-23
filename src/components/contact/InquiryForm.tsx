'use client'

import { useActionState, useEffect, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  inquirySchema,
  type InquiryFormData,
  CONSULTING_SERVICES,
  SECTORS,
} from '@/lib/schemas/inquirySchema'
import { submitInquiry } from '@/app/actions/submitInquiry'

const initialState: import('@/app/actions/submitInquiry').SubmitInquiryState = {
  success: false,
  message: '',
}

function TurnstileWidget({
  siteKey,
  onToken,
}: {
  siteKey: string
  onToken: (token: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rendered = useRef(false)

  useEffect(() => {
    if (rendered.current || !ref.current) return
    rendered.current = true

    if (!document.getElementById('cf-turnstile-script')) {
      const script = document.createElement('script')
      script.id = 'cf-turnstile-script'
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }

    const render = () => {
      const w = window as unknown as Record<string, unknown>
      if (w.turnstile && ref.current) {
        ;(
          w.turnstile as {
            render: (el: HTMLElement, opts: Record<string, unknown>) => void
          }
        ).render(ref.current, {
          sitekey: siteKey,
          callback: onToken,
          theme: 'light',
          size: 'normal',
        })
      } else {
        setTimeout(render, 300)
      }
    }
    render()
  }, [siteKey, onToken])

  return <div ref={ref} />
}

interface InquiryFormProps {
  prefilledService?: string
}

export default function InquiryForm({ prefilledService }: InquiryFormProps) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      service: (prefilledService as InquiryFormData['service']) || undefined,
    },
  })

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'

  const inputClass =
    'border border-[#E2E8F0] rounded px-4 py-3 text-sm font-jakarta text-slate-800 w-full focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-colors'
  const labelClass = 'block text-sm font-semibold text-navy mb-1.5 font-jakarta'
  const errorClass = 'text-red-500 text-xs mt-1'

  const onSubmit = useCallback(async () => {
    if (formRef.current) {
      const fd = new FormData(formRef.current)
      await formAction(fd)
    }
  }, [formAction])

  if (state.success) {
    return (
      <div className="bg-teal/5 border border-teal/30 rounded-lg p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#087F75"
            strokeWidth={2}
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-playfair text-navy font-semibold text-2xl mb-3">Inquiry Sent</h3>
        <p className="font-jakarta text-slate-600 text-sm leading-relaxed">{state.message}</p>
      </div>
    )
  }

  return (
    // eslint-disable-next-line react-hooks/refs
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
      {state.message && !state.success && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name *
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Dr. Emmanuel Okafor"
            className={inputClass}
            {...register('fullName')}
          />
          {(errors.fullName || state.errors?.fullName) && (
            <p className={errorClass}>
              {errors.fullName?.message || state.errors?.fullName?.[0]}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@company.com"
            className={inputClass}
            {...register('email')}
          />
          {(errors.email || state.errors?.email) && (
            <p className={errorClass}>{errors.email?.message || state.errors?.email?.[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+234 800 000 0000"
            className={inputClass}
            {...register('phone')}
          />
          {(errors.phone || state.errors?.phone) && (
            <p className={errorClass}>{errors.phone?.message || state.errors?.phone?.[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company Name *
          </label>
          <input
            id="company"
            type="text"
            placeholder="Your Organisation"
            className={inputClass}
            {...register('company')}
          />
          {(errors.company || state.errors?.company) && (
            <p className={errorClass}>
              {errors.company?.message || state.errors?.company?.[0]}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="service" className={labelClass}>
            Consulting Service *
          </label>
          <select id="service" className={inputClass} {...register('service')}>
            <option value="">Select a service…</option>
            {CONSULTING_SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {(errors.service || state.errors?.service) && (
            <p className={errorClass}>
              {errors.service?.message || state.errors?.service?.[0]}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="sector" className={labelClass}>
            Industry Sector *
          </label>
          <select id="sector" className={inputClass} {...register('sector')}>
            <option value="">Select your sector…</option>
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {(errors.sector || state.errors?.sector) && (
            <p className={errorClass}>{errors.sector?.message || state.errors?.sector?.[0]}</p>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="message" className={labelClass}>
          Business Challenge *
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Describe your business challenge or the services you're interested in…"
          className={`${inputClass} resize-y`}
          {...register('message')}
        />
        {(errors.message || state.errors?.message) && (
          <p className={errorClass}>{errors.message?.message || state.errors?.message?.[0]}</p>
        )}
      </div>

      <div className="mb-6">
        <TurnstileWidget siteKey={siteKey} onToken={(token) => setValue('turnstileToken', token)} />
        <input type="hidden" {...register('turnstileToken')} />
        {(errors.turnstileToken || state.errors?.turnstileToken) && (
          <p className={errorClass}>
            {errors.turnstileToken?.message || state.errors?.turnstileToken?.[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-teal hover:bg-teal/90 disabled:opacity-60 text-white font-semibold font-jakarta py-3.5 px-6 rounded transition-colors flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          'Send Inquiry'
        )}
      </button>
    </form>
  )
}
