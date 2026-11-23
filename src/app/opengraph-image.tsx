import { ImageResponse } from 'next/og'

export const alt = 'Pulse Consultant Ltd'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #10243D, #1B3659)',
          color: '#F5F7FA',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#C5A15B',
              marginRight: '16px',
            }}
          />
          <div>Pulse Consultant Ltd</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '24px',
          }}
        >
          <div>Strategic Insights.</div>
          <div>Financial Solutions.</div>
          <div>Sustainable Growth.</div>
        </div>
        <div style={{ display: 'flex', marginTop: '24px' }}>
          <div
            style={{
              background: '#087F75',
              color: '#FFFFFF',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            Schedule a Consultation
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
