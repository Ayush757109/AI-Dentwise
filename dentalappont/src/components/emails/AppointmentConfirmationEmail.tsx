import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AppointmentConfirmationEmailProps {
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  price: string;
}

export default function AppointmentConfirmationEmail({
  doctorName,
  appointmentDate,
  appointmentTime,
  appointmentType,
  duration,
  price,
}: AppointmentConfirmationEmailProps) {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://yourdomain.com";

  return (
    <Html>
      <Head />
      <Preview>
        Your appointment with {doctorName} is confirmed for {appointmentDate}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://i.ibb.co.com/tRy6cC2/logo.png"
              width="40"
              height="40"
              alt="DentWise Logo"
              style={{ margin: "0 auto" }}
            />
            <Text style={brand}>DentWise</Text>
          </Section>

          {/* Title */}
          <Heading style={title}>
            🎉 Appointment Confirmed
          </Heading>

          <Text style={paragraph}>
            Hi there,
          </Text>

          <Text style={paragraph}>
            Your appointment has been successfully scheduled. Below are your booking details:
          </Text>

          {/* Card */}
          <Section style={card}>
            {detail("Doctor", doctorName)}
            {detail("Service", appointmentType)}
            {detail("Date", appointmentDate)}
            {detail("Time", appointmentTime)}
            {detail("Duration", duration)}
            {detail("Total Paid", price)}
            {detail("Location", "DentWise Dental Center")}
          </Section>

          <Text style={note}>
            Please arrive 15 minutes early. If you need to reschedule,
            kindly notify us at least 24 hours in advance.
          </Text>

          {/* CTA */}
          <Section style={ctaContainer}>
            <Link style={ctaButton} href={`${appUrl}/appointments`}>
              Manage My Appointment
            </Link>
          </Section>

          {/* Divider */}
          <Section style={divider} />

          {/* Footer */}
          <Text style={footer}>
            Need help? Contact us at{" "}
            <Link href="mailto:support@dentwise.com" style={footerLink}>
              support@dentwise.com
            </Link>
          </Text>

          <Text style={copyright}>
            © {new Date().getFullYear()} DentWise. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/* Reusable Detail Row */
const detail = (label: string, value: string) => (
  <Section>
    <Text style={labelStyle}>{label}</Text>
    <Text style={valueStyle}>{value}</Text>
  </Section>
);

/* Styles */

const main = {
  backgroundColor: "#f4f6f8",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 0",
};

const container = {
  margin: "0 auto",
  padding: "40px",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const brand = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#2563eb",
  marginTop: "8px",
};

const title = {
  fontSize: "22px",
  fontWeight: "700",
  textAlign: "center" as const,
  color: "#111827",
  marginBottom: "24px",
};

const paragraph = {
  fontSize: "15px",
  color: "#374151",
  lineHeight: "24px",
};

const card = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "10px",
  margin: "24px 0",
  border: "1px solid #e5e7eb",
};

const labelStyle = {
  fontSize: "13px",
  color: "#6b7280",
  marginBottom: "4px",
};

const valueStyle = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#111827",
  marginBottom: "14px",
};

const note = {
  fontSize: "14px",
  color: "#6b7280",
  lineHeight: "22px",
};

const ctaContainer = {
  textAlign: "center" as const,
  marginTop: "30px",
};

const ctaButton = {
  backgroundColor: "#2563eb",
  padding: "12px 24px",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  display: "inline-block",
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "32px 0",
};

const footer = {
  fontSize: "13px",
  color: "#6b7280",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#2563eb",
  textDecoration: "none",
};

const copyright = {
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
  marginTop: "8px",
};
