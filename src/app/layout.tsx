import React from 'react'

// Root layout — minimal passthrough.
// Each route group provides its own <html> shell:
//   (app)      → public site with Header/Footer/fonts/NextIntl
//   (payload)  → Payload CMS admin with Payload's RootLayout

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
