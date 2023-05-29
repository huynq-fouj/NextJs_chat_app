import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";
//Đăng nhập sử dụng NextAuth, còn tạo folder như này là do NextAuth bảo thế
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { lable: 'password', type: 'password' },
            },
            async authorize(credentials){
                //Login
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid Credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword){
                    throw new Error("Invalid credentials");
                }
                //So sánh mật khẩu người dùng nhập vào với mật khẩu đc mã hóa trên cơ sỏa dữ liệu
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if(!isCorrectPassword){
                    throw new Error("Invalid credentials");
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST};