import React from 'react';

interface BookingConfirmationEmailProps {
  name: string;
  date: string;
  eventType: string;
  message?: string;
}

export const BookingConfirmationEmail: React.FC<BookingConfirmationEmailProps> = ({
  name,
  date,
  eventType,
  message,
}) => (
  <div style={{
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    backgroundColor: "#ffffff",
    color: "#2E131E",
    padding: "0",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #f0f0f0",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.05)"
  }}>
    {/* Hero Header */}
    <div style={{ 
      background: "linear-gradient(135deg, #2E131E 0%, #4A2035 100%)",
      padding: "60px 40px",
      textAlign: "center"
    }}>
      <h1 style={{ 
        color: "#D4AF37",
        fontSize: "28px", 
        fontWeight: "300", 
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        margin: "0 0 10px 0"
      }}>N.TOUCH MUA</h1>
      <div style={{ height: "1px", width: "40px", backgroundColor: "#D4AF37", margin: "15px auto" }}></div>
      <p style={{ 
        fontSize: "12px", 
        letterSpacing: "0.4em", 
        color: "#ffffff",
        opacity: "0.8",
        margin: "0",
        textTransform: "uppercase"
      }}>Signature Artistry by Nancy Mehta</p>
    </div>

    {/* Body Content */}
    <div style={{ padding: "50px 40px" }}>
      <h2 style={{ 
        fontSize: "26px", 
        fontWeight: "300", 
        color: "#2E131E",
        marginBottom: "20px" 
      }}>Hello {name},</h2>
      
      <p style={{ 
        fontSize: "16px", 
        lineHeight: "1.8", 
        color: "#5A2D42",
        marginBottom: "35px"
      }}>
        Thank you for choosing <strong>N.Touch MUA</strong>. We have received your booking request and we are delighted to help you achieve your perfect look.
      </p>

      {/* Details Box */}
      <div style={{ 
        backgroundColor: "#FDF3F3", 
        padding: "40px", 
        borderRadius: "32px",
        marginBottom: "40px",
        border: "1px solid #FFE8EE"
      }}>
        <h3 style={{ 
          fontSize: "12px", 
          textTransform: "uppercase", 
          letterSpacing: "0.2em", 
          color: "#D4456B", 
          marginTop: "0",
          marginBottom: "20px"
        }}>Booking Overview</h3>
        
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tr>
            <td style={{ padding: "10px 0", color: "#8B6552", fontSize: "14px", width: "100px" }}>Service</td>
            <td style={{ padding: "10px 0", color: "#2E131E", fontSize: "16px", fontWeight: "500" }}>{eventType}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px 0", color: "#8B6552", fontSize: "14px" }}>Date</td>
            <td style={{ padding: "10px 0", color: "#2E131E", fontSize: "16px", fontWeight: "500" }}>{date}</td>
          </tr>
          {message && (
            <tr>
              <td style={{ padding: "10px 0", color: "#8B6552", fontSize: "14px", verticalAlign: "top" }}>Message</td>
              <td style={{ padding: "10px 0", color: "#2E131E", fontSize: "15px", fontStyle: "italic" }}>"{message}"</td>
            </tr>
          )}
        </table>
      </div>

      <div style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "25px", margin: "40px 0" }}>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.7", 
          color: "#2E131E",
          margin: "0"
        }}>
          <strong>Finalizing Your Session</strong><br />
          <span style={{ fontSize: "15px", color: "#5A2D42" }}>
            Nancy will personally review your request and reach out via WhatsApp/Phone within 24 hours to confirm your slot and discuss any specific requirements.
          </span>
        </p>
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <a href="https://ntouchmua.com" style={{
          background: "linear-gradient(to right, #2E131E, #4A2035)",
          color: "#ffffff",
          padding: "18px 45px",
          borderRadius: "100px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "0.1em",
          display: "inline-block",
          boxShadow: "0 10px 20px rgba(46,19,30,0.2)"
        }}>EXPLORE THE PORTFOLIO</a>
      </div>
    </div>

    {/* Footer */}
    <div style={{ 
      backgroundColor: "#fafafa", 
      padding: "40px", 
      textAlign: "center",
      borderTop: "1px solid #f0f0f0"
    }}>
      <div style={{ marginBottom: "20px" }}>
        <p style={{ margin: "5px 0", color: "#2E131E", fontWeight: "500" }}>N.Touch MUA by Nancy Mehta</p>
        <p style={{ margin: "5px 0", color: "#8B6552", fontSize: "13px" }}>Patna, Bihar | India</p>
      </div>
      <p style={{ 
        color: "#999999",
        fontSize: "11px",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }}>© 2026 All Rights Reserved</p>
    </div>
  </div>
);
