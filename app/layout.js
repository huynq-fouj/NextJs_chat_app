import './globals.css'
import ToasterContext from './context/ToasterContext'

export const metadata = {
  title: 'Next Chat App',
  description: 'Messeger clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToasterContext/>
        {children}
      </body>
    </html>
  )
}
