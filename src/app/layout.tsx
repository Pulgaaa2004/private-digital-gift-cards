import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Private Digital Gift Cards | Midnight Network ZK dApp (August Challenge)',
  description: 'Confidential zero-knowledge digital gift card platform with Lace Wallet integration, P2P transfer, and instant on-chain verification on Midnight Preview Network.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
