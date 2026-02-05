import type { Metadata } from 'next';
import { Toaster } from 'sonner@2.0.3';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Participant Payment Portal - KUMC',
  description: 'Clinical research study management application for participant payments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
