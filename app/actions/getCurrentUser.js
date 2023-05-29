import prisma from "@/app/libs/prismadb"

import getSession from "./getSession"

const getCurrentUser = async () => {

    try {
        const session = await getSession()
        //Trả về null nếu không tìm thấy email người dùng
        if(!session?.user?.email){
            return null
        }
        //Người dùng hiện tại
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if(!currentUser){
            return null
        }
        return currentUser
    } catch (error) {
        return null
    }
}

export default getCurrentUser