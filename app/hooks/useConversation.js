import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams()

    const conversationId = useMemo(() => {
        if(!params?.conversationId){
            return ''
        }

        return params.conversationId
    }, [params.conversationId])
    // !! biến chuỗi thành boolean
    const isOpen = useMemo(() => !!conversationId, [conversationId])

    return useMemo(() => ({
        isOpen,
        conversationId
    }), [isOpen, conversationId])

}

export default useConversation