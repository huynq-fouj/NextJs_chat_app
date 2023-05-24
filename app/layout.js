import './globals.css'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'

export const metadata = {
  title: 'Next Chat App',
  description: 'Messeger clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext/>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
