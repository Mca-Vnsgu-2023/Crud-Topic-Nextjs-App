'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logoutAction=()=>{
    cookies().delete('userId')
    cookies().delete('token')
    cookies().delete('userName')
    redirect('/auth/login')
}