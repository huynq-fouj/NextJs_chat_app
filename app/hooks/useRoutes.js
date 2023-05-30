import { useMemo } from "react";
import { usePathname } from "next/navigation";
import{ HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

/**
 * Chức đang đường dẫn
 * Trả về danh sách đường dẫn
 */
const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()
    const routes = useMemo(() => [
        {
            //conversations site
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname == '/conversations' || !!conversationId
        },
        {
            //users site
            label: 'User',
            href: '/users',
            icon: HiUsers,
            active: pathname == '/users'
        },
        {
            label:'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ],[pathname, conversationId])

    return routes
}

export default useRoutes