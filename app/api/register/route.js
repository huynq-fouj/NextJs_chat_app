import bcrypt from "bcrypt";

import prima from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const body = await request.json();
        const {email, name, password} = body;
        //Kiểm tra đầy đủ dữ liệu cần thiết
        if(!email || !name || !password){
            return new NextResponse("Missing info", { status: 400 });
        }

        //Mã hóa mật khẩu của người dùng
        const hashedPassword = await bcrypt.hash(password, 12);

        //Tạo người dùng mới
        const user = await prima.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });
        return NextResponse.json(user);
    } catch(error) {
        console.log(error, "REGISTRATION_ERROR");
        return new NextResponse("Internal Error", { status: 500 })
    }
}