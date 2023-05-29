'use client'

import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn, useSession } from 'next-auth/react'

import Input from "../../components/inputs/Input"
import Button from "../../components/Button"
import AuthSocialButton from "./AuthSocialButton"
import { useRouter } from "next/navigation"

export default function AuthForm(){
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/users')
        }
    }, [session?.status])

    const toggeVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }else{
            setVariant('LOGIN')
        }
    }, [variant])

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    //Trinh xu ly form
    const onSubmit = (data) => {
        setIsLoading(true)
        if(variant === 'REGISTER'){
            //Axios Register
            axios.post('/api/register', data)
            .then(() => {
                //Sau khi gửi dữ liệu đi thì thực hiện đăng nhập
                //redirect : false có thể tránh tải lại trang
                signIn('credentials', { ...data, redirect: false})
                .then(() => toast.success(`Hi ${data.name}!`))
                .catch(() => toast.error('Error!'))
            })
            .catch(() => toast.error("Something went wrong!"))
            .finally(() => setIsLoading(false))
        }
        if(variant === 'LOGIN'){
            //NextAuth SignIn
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if(callback?.error){
                    toast.error("Invalid credentials")
                }
                if(callback?.ok &&!callback?.error){
                    toast.success("Loged in!")
                }
            }).finally(() => setIsLoading(false))
        }
    }
    //Hanh dong
    const socialAction = (action) => {
        setIsLoading(true)

        //NextAuth Social Sign In
        signIn(action, { redirect: false})
        .then((callback) => {
            if(callback?.error){
                toast.error("Invalid credentials")
            }
            if(callback?.ok && !callback?.error){
                toast.success("Loged in!")
            }
        })
        .finally(() => setIsLoading(false))
        //
    }
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form 
                    className="space-y-6" 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input 
                            id="name" 
                            label="Name" 
                            type="text"
                            errors={errors}
                            register={register}
                        />
                    )}
                    <Input 
                        id="email" 
                        label="Email address" 
                        type="email"
                        errors={errors}
                        register={register}
                    />
                    <Input 
                        id="password" 
                        label="Password" 
                        type="password"
                        errors={errors}
                        register={register}
                    />
                    <div>
                        <Button 
                            type='submit' 
                            fullWidth
                            disabled={isLoading}
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton 
                            icon={<BsGithub/>} 
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton 
                            icon={<BsGoogle/>} 
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messeger?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggeVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}