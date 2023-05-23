import './globals.css'


export const metadata = {
  title: 'Next Chat App',
  description: 'Messeger clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
