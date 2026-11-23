'use client'

import { useEffect } from 'react'

interface CalWidgetProps {
  calLink?: string
}

export default function CalWidget({ calLink }: CalWidgetProps) {
  const link =
    calLink || process.env.NEXT_PUBLIC_CAL_LINK || 'pulse-consultant/strategy-call'

  useEffect(() => {
    if (document.getElementById('cal-embed-script')) return
    const script = document.createElement('script')
    script.id = 'cal-embed-script'
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  return (
    <div className="w-full">
      <div
        style={{ width: '100%', height: '600px', overflow: 'scroll' }}
        id="my-cal-inline"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function (C, A, L) {
              let p = function (a, ar) { a.q.push(ar); };
              let d = C.document;
              C.Cal = C.Cal || function () {
                let cal = C.Cal;
                let ar = arguments;
                if (!cal.loaded) {
                  cal.ns = {};
                  cal.q = cal.q || [];
                  d.head.appendChild(d.createElement("script")).src = A;
                  cal.loaded = true;
                }
                if (ar[0] === L) {
                  const api = function () { p(api, arguments); };
                  const namespace = ar[1];
                  api.q = api.q || [];
                  if (typeof namespace === "string") {
                    cal.ns[namespace] = cal.ns[namespace] || api;
                    p(cal.ns[namespace], ar);
                    p(cal, ["-", namespace, ar]);
                  } else {
                    p(cal, ar);
                  }
                  return;
                }
                p(cal, ar);
              };
            })(window, "https://app.cal.com/embed/embed.js", "init");
            Cal("init", { origin: "https://app.cal.com" });
            Cal("inline", {
              elementOrSelector: "#my-cal-inline",
              calLink: "${link}",
              layout: "month_view"
            });
            Cal("ui", {
              theme: "light",
              styles: { branding: { brandColor: "#087F75" } },
              hideEventTypeDetails: false,
              layout: "month_view"
            });
          `,
        }}
      />
    </div>
  )
}
