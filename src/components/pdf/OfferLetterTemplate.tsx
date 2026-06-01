import { forwardRef } from 'react';
import type { OfferLetter } from '../../lib/certificates';

interface OfferLetterTemplateProps {
  offer: OfferLetter;
}

const OfferLetterTemplate = forwardRef<HTMLDivElement, OfferLetterTemplateProps>(
  ({ offer }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: '794px',
          height: '1123px',
          position: 'relative',
          background: '#FAFAF8',
          fontFamily: "'Inter', sans-serif",
          overflow: 'hidden',
          boxSizing: 'border-box',
          color: '#1a1a1a',
        }}
      >
        {/* Subtle background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4A853' fill-opacity='0.015'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            height: 6,
            background: 'linear-gradient(to right, #8B6914, #D4A853, #E8C87A, #D4A853, #8B6914)',
          }}
        />

        {/* Letterhead */}
        <div
          style={{
            padding: '50px 70px 30px',
            borderBottom: '1px solid rgba(212,168,83,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                border: '2px solid #D4A853',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 26,
                  color: '#D4A853',
                  fontWeight: 300,
                }}
              >
                A
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: '#1a1a1a',
                }}
              >
                AURELIA
              </div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  color: '#8B6914',
                  textTransform: 'uppercase',
                }}
              >
                The Growth Collective
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#6B6570', marginBottom: 2 }}>Offer Letter ID</div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#D4A853',
                letterSpacing: '0.1em',
              }}
            >
              {offer.id}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '40px 70px' }}>
          {/* Date */}
          <div style={{ fontSize: 12, color: '#6B6570', marginBottom: 30 }}>
            {offer.issueDate}
          </div>

          {/* To */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
              To,
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>
              {offer.name}
            </div>
            <div style={{ fontSize: 11, color: '#6B6570' }}>
              {offer.college}
            </div>
          </div>

          {/* Subject */}
          <div
            style={{
              background: 'rgba(212,168,83,0.06)',
              borderLeft: '3px solid #D4A853',
              padding: '14px 20px',
              marginBottom: 30,
            }}
          >
            <div style={{ fontSize: 10, color: '#8B6914', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
              Subject
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>
              Internship Offer — {offer.position}
            </div>
          </div>

          {/* Salutation */}
          <div style={{ fontSize: 12, color: '#1a1a1a', marginBottom: 16, lineHeight: 1.8 }}>
            Dear <strong>{offer.name}</strong>,
          </div>

          {/* Body text */}
          <div style={{ fontSize: 11.5, color: '#333', lineHeight: 1.9, marginBottom: 24 }}>
            We are delighted to offer you an internship position at <strong>Aurelia — The Growth Collective</strong>. 
            After careful review of your application and qualifications, we believe you possess the skills 
            and potential to make a meaningful contribution to our team.
          </div>

          <div style={{ fontSize: 11.5, color: '#333', lineHeight: 1.9, marginBottom: 24 }}>
            This letter serves as a formal confirmation of your internship appointment. Please review 
            the terms and conditions outlined below:
          </div>

          {/* Terms table */}
          <div
            style={{
              border: '1px solid rgba(212,168,83,0.2)',
              borderRadius: 8,
              overflow: 'hidden',
              marginBottom: 30,
            }}
          >
            <div
              style={{
                background: 'rgba(212,168,83,0.08)',
                padding: '12px 20px',
                fontSize: 11,
                fontWeight: 600,
                color: '#8B6914',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Internship Details
            </div>
            {[
              { label: 'Position', value: offer.position },
              { label: 'Department', value: offer.department },
              { label: 'Start Date', value: offer.startDate },
              { label: 'End Date', value: offer.endDate },
              { label: 'Stipend', value: offer.stipend },
              { label: 'Location', value: offer.location },
              { label: 'Status', value: offer.status === 'accepted' ? 'Accepted' : 'Pending Acceptance' },
            ].map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  padding: '10px 20px',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(212,168,83,0.08)',
                }}
              >
                <div
                  style={{
                    width: 160,
                    fontSize: 10.5,
                    color: '#6B6570',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 11.5, color: '#1a1a1a', fontWeight: 500 }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Responsibilities */}
          <div style={{ fontSize: 11.5, color: '#333', lineHeight: 1.9, marginBottom: 24 }}>
            During your tenure, you will be expected to adhere to all company policies, maintain 
            professional conduct, and actively participate in assigned projects. Upon successful 
            completion, you will receive a Certificate of Completion that can be verified by 
            recruiters and academic institutions through our verification portal.
          </div>

          {/* Acceptance */}
          <div
            style={{
              background: 'rgba(212,168,83,0.04)',
              border: '1px solid rgba(212,168,83,0.15)',
              borderRadius: 8,
              padding: '18px 22px',
              marginBottom: 30,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: '#8B6914', marginBottom: 8 }}>
              Acceptance
            </div>
            <div style={{ fontSize: 11, color: '#555', lineHeight: 1.7 }}>
              Please confirm your acceptance of this offer by replying to this letter within 
              <strong> 7 business days</strong>. If we do not hear from you by then, this offer 
              may be withdrawn. We look forward to welcoming you to the Aurelia family.
            </div>
          </div>

          {/* Closing */}
          <div style={{ fontSize: 11.5, color: '#333', lineHeight: 1.9, marginBottom: 40 }}>
            Congratulations on this achievement. We are excited to see what you will accomplish 
            with us.
          </div>

          {/* Signature block */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 11, color: '#1a1a1a', marginBottom: 30 }}>
                Warm regards,
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 22,
                  color: '#1a1a1a',
                  fontStyle: 'italic',
                  marginBottom: 4,
                }}
              >
                Aurelia Collective
              </div>
              <div style={{ fontSize: 10, color: '#6B6570' }}>
                The Growth Collective
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '2px dashed rgba(212,168,83,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 6px',
                }}
              >
                <span style={{ fontSize: 18, color: '#D4A853', fontFamily: "'Cormorant Garamond', serif" }}>A</span>
              </div>
              <div style={{ fontSize: 8, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Official Seal
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 70px',
            borderTop: '1px solid rgba(212,168,83,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 8, color: '#aaa', letterSpacing: '0.05em' }}>
            This is a computer-generated document and does not require a physical signature.
          </div>
          <div style={{ fontSize: 8, color: '#aaa', letterSpacing: '0.05em' }}>
            Verify authenticity at aurelia.co/corner
          </div>
        </div>
      </div>
    );
  }
);

OfferLetterTemplate.displayName = 'OfferLetterTemplate';
export default OfferLetterTemplate;
