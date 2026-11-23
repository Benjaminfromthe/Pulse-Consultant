# Pulse Consultant Ltd — Admin Manual

This guide explains how non-technical staff use the Content Management System (CMS) to keep the Pulse Consultant Ltd website accurate and current. No coding knowledge is required.

---

## 1. Introduction

The public website is powered by a **Content Management System** — a private, password-protected back office where you add and edit everything on the site: services, industries, case studies, team profiles, articles, and images.

**Who this is for:** partners, administrators, and marketing staff responsible for website content. You only need to fill in forms.

**Where to find it:** open a browser and go to the admin address:

```
https://your-website-address/admin
```

(Replace `your-website-address` with the live domain, e.g. `https://pulseconsultant.com/admin`.)

The public website updates within a few minutes of you saving changes.

---

## 2. Getting Started

### First login

When you visit `/admin` for the first time and no admin accounts exist yet, the CMS automatically shows a **"Create first user"** screen. Use it to set up the primary administrator:

1. Enter your email.
2. Choose a strong password (12+ characters, mixing letters, numbers, symbols).
3. Save. You are now the first admin.

Add more team members later from **Users** in the sidebar, giving each a real email and a password they can change.

### Logging in afterwards

Go to `/admin`, enter your email and password, click **Login**. Use **Forgot password?** to reset a forgotten password.

### Browser requirements

Use a current Chrome, Edge, Firefox, or Safari. Avoid Internet Explorer. A desktop or large screen is easiest for editing.

---

## 3. Managing Services

Pulse Consultant offers **9 advisory services**. Each has its own page at `/services/[slug]`, managed in the **Services** collection.

1. Open **Services** → **Create new** (or click an existing one to edit).
2. Fill in the fields below.
3. Set **status** to **Published** when ready.
4. Click **Save** (draft) or **Publish**.

| Field | What to enter |
|---|---|
| **Service Title** | e.g. "Financial Advisory". |
| **slug** | URL-friendly, lowercase with hyphens (e.g. `financial-advisory`). Becomes `/services/financial-advisory`. |
| **Service Category** | The matching category. |
| **Short Description** | One or two sentences for lists and search results. |
| **Service Overview** | The main page body (rich text). |
| **Areas of Expertise** | A list of sub-topics (at least one). Each row has an **Area** and optional **Description**. |
| **Methodology Steps** | Numbered steps: **Step Number**, **Step Title**, **Step Description**. |
| **Key Benefits** | Short outcome bullets. |
| **Call to Action** | The heading and button text at the bottom of the page (defaults provided). |
| **SEO** | See section 10. |
| **status** *(sidebar)* | **Draft** = hidden; **Published** = live. New services start as Draft. |
| **Feature on Homepage** *(sidebar)* | Tick to show on the home page. |
| **Sort Order** *(sidebar)* | Lower numbers appear first. |

A **Draft** service is saved but never public. Only **Published** services appear on the website.

---

## 4. Managing Industries

Pulse Consultant focuses on **5 priority sectors**. Each has a page at `/industries/[slug]`, managed in the **Industries** collection.

| Field | What to enter |
|---|---|
| **Industry Name** | e.g. "Financial Services", "Real Estate", "Energy", "Manufacturing", "Healthcare". |
| **slug** | URL-friendly, e.g. `financial-services`. |
| **Industry Tagline** | A short slogan. |
| **Industry Overview** | The main description (rich text). |
| **Key Industry Challenges** | A list of common sector problems. |
| **Our Approach to This Industry** | How Pulse Consultant serves this sector (rich text). |
| **Key Services for This Industry** | Link the most relevant services. |
| **Industry Statistics / Track Record** | Highlight figures (e.g. "$500M+") with a label. |
| **SEO** | See section 10. |
| **status** *(sidebar)* | Draft or Published. |

Services link to industries (**Related Industries**) and industries link back to services (**Key Services**), so keep both connections consistent.

---

## 5. Managing Case Studies (most important)

Case studies are your strongest proof of expertise. They appear on the **Projects & Portfolio** page and at `/projects/[slug]`, in the **Case Studies** collection.

### Client confidentiality — read first

Every case study has a checkbox: **Approved for Public Display** (`isApprovedForPublic`). **Only entries with this box ticked AND status Published appear on the public website.** Unticked entries are hidden.

This protects clients. A case study may describe a real engagement, but you may only make it public when the client has **given written consent**. If unsure, leave the box unticked and use "Confidential Client" as the name.

### Engagement fields

| Field | What to enter |
|---|---|
| **Project Title** | A clear name for the engagement. |
| **slug** | URL-friendly version. |
| **Industry Sector** | The sector this project belongs to (links to Industries). |
| **Authorized Client Name** | The name you may show. Use "Confidential Client" if the client must stay anonymous. |
| **Client Logo / Featured Image** | Optional image at the top of the page. |
| **Business Challenge** | Rich text: the problem before you were engaged. |
| **Assignment Scope** | Rich text: what you were asked to do. |
| **Consulting Approach** | Rich text: how you tackled the work. |
| **Deliverables** | A list of what you produced (one per row). |
| **Results Summary** | Rich text describing the outcome. |
| **Key Result Metrics** | Headline numbers: **Metric** (e.g. "Cost reduction"), **Value** (e.g. "35%"), optional **Context**. |
| **Client Testimonial** | Optional quote; add **Testimonial Author Name & Title** if used. |
| **Related Services** | Link the services this project used. |
| **SEO** | Meta title and description. |

### Approval workflow (sidebar status)

1. **Draft** — still being written. Not public.
2. **Under Review** — finished, awaiting a partner or compliance check.
3. **Published** — live, **but only if "Approved for Public Display" is ticked**.
4. **Archived** — old or no longer relevant; hidden.

> ⚠️ **Only tick "Approved for Public Display" with written client consent.** When a client leaves or a contract ends, review whether the study should stay public.

---

## 6. Managing Team Members

Team profiles appear on the **Our Team** page, in the **Team Members** collection. Policy requires **3+ years of experience** before a consultant is featured.

| Field | What to enter |
|---|---|
| **Full Name** | e.g. "Ada Okafor". |
| **slug** | e.g. `ada-okafor`. |
| **Job Title / Role** | e.g. "Senior Financial Advisor". |
| **Profile Photo** | A professional headshot (square works best), from the Media Library. |
| **Biography** | Full bio (rich text). |
| **Short Bio (for cards)** | One or two sentences. |
| **Years of Experience** | A number — 3 or more. |
| **Academic Qualifications** | List: **Degree**, **Institution**, **Year Obtained**. |
| **Professional Certifications** | List: **Certification Name**, **Issuing Body**, **Year Issued**, optional **Expiry Year**. |
| **Areas of Specialization** | List of focus areas (one **Area** per row). |
| **Service Expertise** / **Industry Expertise** | Link services and industries this person leads. |
| **LinkedIn URL** / **Work Email** | Optional contact details. |
| **Show in Leadership Section** *(sidebar, `isLeadership`)* | Tick for partners/directors — they appear in the Leadership block. |
| **Active / Current Staff** *(sidebar, `isActive`)* | Tick for current staff. Untick (do not delete) when someone leaves — this hides them but keeps history. |
| **Sort Order** *(sidebar)* | Controls display order. |

---

## 7. Managing Insights

The **Insights** collection powers the **Insights hub** (`/insights`) and article pages (`/insights/[slug]`). Use it for articles, market analysis, publications, white papers, press releases, and newsletters.

| Field | What to enter |
|---|---|
| **title** | The headline. |
| **slug** | URL-friendly version. |
| **Content Type** | **Article, Market Analysis, Publication, White Paper, Press Release**, or **Newsletter**. |
| **Excerpt / Summary** | A short summary for cards and search results. |
| **Article Body** | The full article (rich text). |
| **Author** | Link the team member who wrote it (creates an "About the Author" box). |
| **Featured Image** | The main image, from the Media Library. |
| **Related Services** / **Related Industries** | Optional links. |
| **tags** | A list of topic tags (one **tag** per row). |
| **Published Date** | The date shown to readers; newest sorts first. |
| **Featured Article** *(sidebar, `isFeatured`)* | Tick to highlight in the "Featured" row. |
| **status** *(sidebar)* | **Draft** (private), **Published** (live), or **Archived**. |
| **SEO** | Meta title, description, keywords. |

Assign an **Author** and set a **Published Date** so articles sort correctly.

---

## 8. Media Library

All images live in the **Media** collection. When adding an image to any collection, upload a new file or pick an existing one.

- **Alt Text** *(required)* — a short description for screen readers and search engines, e.g. "Pulse Consultant team in a strategy workshop." Be descriptive, not just "image".
- **Caption** *(optional)* — a label shown under the image if the design uses it.

Use clear, high-resolution images (avoid files larger than a few megabytes), reuse images instead of uploading duplicates, and always write meaningful Alt Text — it improves accessibility and SEO.

---

## 9. Contact Form and Inquiries

The **Contact** page lets visitors send an inquiry. Each submission is delivered by email to **enquiries@pulseconsultant.com** through a service called **Resend**, including the visitor's name, email, phone, company, the service and sector selected, and their message.

- **Where emails come from:** Resend. Log in at **resend.com** with the company account to see delivery history.
- **Change the notification email:** the destination is set by `RESEND_TO_EMAIL` and the sender by `RESEND_FROM_EMAIL`. Ask your technical contact to update these in the server environment (the `.env` file). The same applies to `RESEND_API_KEY`.
- **Spam protection:** Cloudflare Turnstile blocks most automated spam before it reaches you.
- **Replying:** reply from your normal inbox — the message's "reply-to" is already the visitor's email.

There is no inbox inside the CMS; inquiries arrive in the email inbox you already use.

---

## 10. SEO Best Practices

Good SEO helps clients find Pulse Consultant on Google. Most collections have an **SEO** group:

- **Meta Title** — the title in search results (under 60 characters, include the topic). If blank, the page uses the main title.
- **Meta Description** — the summary under the title (under 160 characters, read like a sentence).
- **Keywords** *(where available)* — comma-separated phrases, e.g. "financial advisory, Nigeria, SME finance".

Other things that matter:

- **Slugs are permanent addresses.** Choose clear, lowercase, hyphen-separated slugs once and avoid changing them — changing a slug breaks links saved elsewhere.
- **Keep content fresh.** Search engines favour regularly updated sites. Refresh case studies and publish new Insights.
- **Write real Alt Text** on every image (section 8).

The website auto-generates `sitemap.xml`, `robots.txt`, and OpenGraph social cards — you need only keep the SEO fields filled.

---

## 11. Common Tasks — Quick Reference

| Task | Steps |
|---|---|
| **Publish a draft service** | **Services** → click it → set **status** to **Published** → **Save**. |
| **Approve a case study for public display** | **Case Studies** → confirm written client consent → tick **Approved for Public Display** → set **status** to **Published** → **Save**. |
| **Add a new team member** | **Team Members** → **Create new** → name, title, photo, bio, qualifications, certifications, specializations → **Years of Experience** 3+ → tick **Show in Leadership Section** if a leader → confirm **Active / Current Staff** → **Save**. |
| **Publish an article** | **Insights** → **Create new** → title, slug, content type, excerpt, body, author, featured image, published date → tick **Featured Article** to highlight → set **status** to **Published** → **Save**. |

---

## 12. Troubleshooting

**I can't log in.** Check the email and password. Use **Forgot password?** to reset. If no email arrives, it may be blocked — ask your technical contact to check email settings or create a new admin user for you from **Users**.

**My image won't upload.** Use a common type (JPG, PNG, GIF, WebP) under a few megabytes. Resize very large images first. **Alt Text is required** — the upload will not save without it.

**My changes aren't showing.** Most updates appear within minutes. If not: (1) confirm **status** is **Published** (and, for case studies, **Approved for Public Display** is ticked); (2) hard-refresh the browser (Ctrl+F5); (3) wait a few minutes for the cache to clear.

**A case study disappeared from Projects.** Its **status** left Published, or **Approved for Public Display** was unticked. Re-check both.

**A team member disappeared from the Team page.** **Active / Current Staff** was unticked. Tick it again to restore them.

---

## 13. Support

For access problems, broken uploads, or manual questions, contact the internal technical lead for the website. For content questions — what to publish, client approval, or brand wording — contact the partner overseeing marketing.

When reporting an issue, include the collection name, the entry title, what you expected, and what happened. A screenshot helps.

---

*Pulse Consultant Ltd — Strategic Insights. Financial Solutions. Sustainable Growth.*
