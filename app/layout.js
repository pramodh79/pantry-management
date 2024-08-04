import './globals.css';

export const metadata = {
  title: 'Pantry Pro',
  description: 'Manage your pantry with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
