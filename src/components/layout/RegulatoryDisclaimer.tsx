interface RegulatoryDisclaimerProps {
  variant?: 'compact' | 'full'
}

const FULL_TEXT =
  'Pulse Consultant Ltd provides strategic consulting and financial advisory services. Investment management and fund advisory services are subject to regulatory oversight by the relevant financial authorities. Information on this page is for general informational purposes only and does not constitute regulated investment advice, an offer to sell, or a solicitation to buy any security or financial instrument. Past performance is not indicative of future results. Clients seeking regulated investment advisory services must complete the firm’s formal onboarding and suitability assessment process.'

const COMPACT_TEXT =
  'Information provided does not constitute regulated investment advice. Clients must complete formal onboarding for regulated services.'

export default function RegulatoryDisclaimer({ variant = 'full' }: RegulatoryDisclaimerProps) {
  const text = variant === 'compact' ? COMPACT_TEXT : FULL_TEXT

  return (
    <div className="bg-navy/5 border-t border-gold/30">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10">
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none mt-1" aria-hidden="true">
            ⚖️
          </span>
          <div>
            <h2 className="font-playfair text-lg font-semibold text-navy mb-2">
              Regulatory Notice
            </h2>
            <p className="font-jakarta text-sm text-slate-600 leading-relaxed">{text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
