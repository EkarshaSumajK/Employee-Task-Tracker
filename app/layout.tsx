import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export const metadata: Metadata = {
  title: "Employee Task Tracker",
  description: "Track employee tasks efficiently",
};

const theme = createTheme({
  primaryColor: 'indigo',
  colors: {
    indigo: [
      '#EEF2FF', '#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', 
      '#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81'
    ],
    slate: [
      '#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8', 
      '#64748B', '#475569', '#334155', '#1E293B', '#0F172A'
    ],
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.5rem', lineHeight: '1.35' },
    },
  },
  shadows: {
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        fw: 600,
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        withBorder: true,
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-right" zIndex={1000} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
