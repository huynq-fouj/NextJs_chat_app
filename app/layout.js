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
          {/* Thêm toaster ở đây để nó có thể hoạt động ở mọi trang */}
          <ToasterContext/>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
