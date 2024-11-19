// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'Lost in Time',
  description: 'A time-travel-themed scavenger hunt game.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}