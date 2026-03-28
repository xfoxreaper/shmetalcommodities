import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0A1628',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Gold top rule */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: '#B89A5A',
          }}
        />

        {/* Company name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 600,
            color: '#B89A5A',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          SH Metal Commodities
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#F5F0E8',
            letterSpacing: '0.15em',
            textAlign: 'center',
            opacity: 0.85,
          }}
        >
          Metal. Markets. Trust.
        </div>

        {/* Gold bottom rule */}
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: '#B89A5A',
          }}
        />

        {/* Footer label */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            fontSize: '16px',
            color: '#F5F0E8',
            letterSpacing: '0.1em',
            opacity: 0.6,
          }}
        >
          Hamburg, Germany · Est. 1873
        </div>
      </div>
    ),
    { ...size }
  );
}
