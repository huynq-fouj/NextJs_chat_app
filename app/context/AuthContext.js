'use client'

import { SessionProvider } from "next-auth/react"

/**
 *  - useSession() là cách dễ nhất để kiểm tra ai đó đã đăng nhập hay chưa và phải đảm bảo SessionProvider được thêm vào để các trang khác có thể sử dụng được useSession()
 *  - Đây là context sử dụng SessionProvider
 */
export default function AuthContext({children}){
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}