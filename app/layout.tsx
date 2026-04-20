import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Insight — Supply Chain Intelligence',
  description: 'AI-powered supply chain insights with confidence signals and explainability',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
