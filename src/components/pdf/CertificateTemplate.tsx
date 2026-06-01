import { forwardRef } from 'react';
import type { Certificate } from '../../lib/certificates';

interface CertificateTemplateProps {
  certificate: Certificate;
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ certificate }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: '1123px',
          height: '794px',
          position: 'relative',
          background: '#0a0a0e',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A853' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Outer border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '2px solid #D4A853',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            border: '1px solid rgba(212,168,83,0.3)',
          }}
        />

        {/* Corner ornaments */}
        {[
          { top: 16, left: 16, rot: 0 },
          { top: 16, right: 16, rot: 90 },
          { bottom: 16, right: 16, rot: 180 },
          { bottom: 16, left: 16, rot: 270 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 60,
              height: 60,
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              transform: `rotate(${pos.rot}deg)`,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60">
              <path
                d="M0 0 L30 0 L30 4 L4 4 L4 30 L0 30 Z"
                fill="#D4A853"
                opacity="0.6"
              />
              <path
                d="M8 8 L22 8 L22 10 L10 10 L10 22 L8 22 Z"
                fill="#D4A853"
                opacity="0.3"
              />
            </svg>
          </div>
        ))}

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '80px 100px',
          }}
        >
          {/* Logo area */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px solid #D4A853',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 36,
                  color: '#D4A853',
                  fontWeight: 300,
                }}
              >
                A
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                letterSpacing: '0.3em',
                color: '#D4A853',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
            >
              AURELIA
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                color: 'rgba(212,168,83,0.5)',
                marginTop: 4,
                textTransform: 'uppercase',
              }}
            >
              The Growth Collective
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.4em',
              color: 'rgba(212,168,83,0.6)',
              textTransform: 'uppercase',
              marginBottom: 16,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Certificate of Completion
          </div>

          <div
            style={{
              width: 120,
              height: 1,
              background: 'linear-gradient(to right, transparent, #D4A853, transparent)',
              marginBottom: 30,
            }}
          />

          {/* Recipient */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.25em',
              color: 'rgba(212,168,83,0.5)',
              textTransform: 'uppercase',
              marginBottom: 12,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            This certifies that
          </div>

          <div
            style={{
              fontSize: 52,
              color: '#F0EBE0',
              fontWeight: 300,
              fontStyle: 'italic',
              marginBottom: 24,
              letterSpacing: '0.02em',
            }}
          >
            {certificate.name}
          </div>

          {/* Has successfully completed */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: 'rgba(212,168,83,0.5)',
              textTransform: 'uppercase',
              marginBottom: 16,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            has successfully completed the program
          </div>

          <div
            style={{
              fontSize: 24,
              color: '#D4A853',
              fontWeight: 400,
              marginBottom: 8,
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {certificate.course}
          </div>

          {/* Details row */}
          <div
            style={{
              display: 'flex',
              gap: 60,
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            {[
              { label: 'Grade', value: certificate.grade },
              { label: 'Duration', value: certificate.duration },
              { label: 'Institution', value: certificate.college },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    color: 'rgba(212,168,83,0.4)',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#F0EBE0',
                    fontWeight: 400,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'rgba(212,168,83,0.4)',
                textTransform: 'uppercase',
                marginBottom: 10,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Skills Acquired
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {certificate.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 11,
                    color: '#D4A853',
                    border: '1px solid rgba(212,168,83,0.2)',
                    padding: '4px 14px',
                    borderRadius: 20,
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Date & ID */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
              paddingTop: 30,
              borderTop: '1px solid rgba(212,168,83,0.1)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  color: 'rgba(212,168,83,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Issue Date
              </div>
              <div style={{ fontSize: 13, color: '#F0EBE0' }}>{certificate.issueDate}</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  border: '2px dashed rgba(212,168,83,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                }}
              >
                <span style={{ fontSize: 20, color: '#D4A853' }}>A</span>
              </div>
              <div
                style={{
                  fontSize: 8,
                  letterSpacing: '0.15em',
                  color: 'rgba(212,168,83,0.4)',
                  textTransform: 'uppercase',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Official Seal
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  color: 'rgba(212,168,83,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Certificate ID
              </div>
              <div style={{ fontSize: 13, color: '#D4A853', fontFamily: "'Space Grotesk', sans-serif" }}>
                {certificate.id}
              </div>
            </div>
          </div>

          {/* Expiry */}
          <div
            style={{
              fontSize: 9,
              color: 'rgba(107,101,112,0.6)',
              marginTop: 12,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.1em',
            }}
          >
            Valid until {certificate.expiryDate}
          </div>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';
export default CertificateTemplate;
