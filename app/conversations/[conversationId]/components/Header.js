'use client'

import useOtherUser from "@/app/hooks/useOtherUser"

import { useMemo } from "react"
import Link from "next/link"
import { HiChevronLeft } from "react-icons/hi2"

export default function Header({ conversation }){
    const otherUser = useOtherUser(conversation)
    const statusText = useMemo(() => {
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }
        return 'Active'
    }, [conversation])
    return (
        <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-betweent items-center shadow-sm">
            <div className="flex gap-3 items-center">
                <Link className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer" href='/conversations'>
                    <HiChevronLeft size={32}/>
                </Link>
            </div>
        </div>
    )
}