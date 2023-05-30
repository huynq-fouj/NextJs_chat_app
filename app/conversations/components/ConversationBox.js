'use client'

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import clsx from "clsx"

import useOtherUser from "@/app/hooks/useOtherUser"

export default function ConversationBox({data, selected}){

    const otherUser = useOtherUser(data)
    const session = useSession()
    
    
    return (
        <div>

        </div>
    )
}