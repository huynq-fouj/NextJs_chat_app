'use client'
export default function MessageInput({ id, type, register, errors, required, placeholder }){
    return (
        <div className="relative w-full">
            <input type={type} autoComplete={id} {...register(id, { required })} placeholder={placeholder}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
            />
        </div>
    )
}