const SERVICES = [
  {
    head: 'Free Shipping',
    explain:
      'Receive your product within 2–3 working days. Free cash on delivery all over Pakistan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path d="M3 7h11v9H3z" strokeLinejoin="round" />
        <path d="M14 10h4l3 3v3h-7z" strokeLinejoin="round" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </svg>
    ),
  },
  {
    head: 'Return or Refunded',
    explain:
      'Return your product within 7 days of receiving it to request a refund.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
        <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    head: 'Customer Support',
    explain:
      'Respectful, helpful support around the clock. Your satisfaction is our priority.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" strokeLinecap="round" />
        <path d="M20 15.5a2.5 2.5 0 0 1-2.5 2.5H16" strokeLinecap="round" />
        <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
        <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
      </svg>
    ),
  },
]

const BENEFITS = [
  'Wide selection of high-quality tech products',
  'Free cash on delivery in Pakistan',
  '100% satisfaction guarantee',
  '100% money-back guarantee',
  '24/7 customer support',
]

const About = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <div className="pt-20 text-center sm:pt-24">
        <h1 className="font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold text-ink">About Us</h1>
      </div>

      <div className="mx-auto mt-8 max-w-2xl text-center text-ink-soft">
        <p>
          HM Store is a trusted ecommerce platform in Pakistan for watches and leather straps. We
          offer high-quality products with free cash on delivery and a 100% satisfaction guarantee.
        </p>

        <div className="mt-8 text-left">
          <p className="mb-3 font-medium text-ink">Why shop at HM Store</p>
          <ul className="space-y-2">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-bronze" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services */}
      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {SERVICES.map((service, index) => (
          <div
            key={service.head}
            style={{ '--stagger': index }}
            className="card-enter rounded-xl border border-line bg-white p-6 text-center transition-shadow duration-300 hover:shadow-[0_10px_30px_-18px_rgba(36,31,26,0.35)]"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper-dim text-bronze-dark">
              {service.icon}
            </div>
            <p className="mt-4 text-lg font-semibold text-ink">{service.head}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{service.explain}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
