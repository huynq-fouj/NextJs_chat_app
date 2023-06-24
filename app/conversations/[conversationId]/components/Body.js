'use client'
import useConversation from "@/app/hooks/useConversation"
import MessageBox from "./MessageBox"

import { useState, useRef, useEffect } from "react"
import axios from "axios"

export default function Body({ initialMessages }){
    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef()
    const bodyRef = useRef()
    const { conversationId } = useConversation()

    useEffect(() => {
        bodyRef.current.scrollTo(0, bodyRef.current.scrollHeight)
    }, [])

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`).catch((e) => { console.log(e) })
    },[conversationId])
    return (
        <div ref={bodyRef} className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
                <MessageBox 
                    isLast={index === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            {/* <div ref={bottomRef} className="pt-24"/> */}
        </div>
    )
}