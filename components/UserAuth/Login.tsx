'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { BASE_API_URL } from '../../utils/constants'
import axios from 'axios'



function Login() {

    const {register, handleSubmit}=useForm()
    const router = useRouter()

    const onSubmit=async (inputData)=>{
        try {
            const res = await axios.post(`${BASE_API_URL}/api/users/login`, inputData)
            if (res.status == 200) {
                toast.success("Login successfully !", {
                    position: toast.POSITION.TOP_RIGHT, autoClose:2000
                });
                router.push('/')
            } else {
                throw new Error("User not login.")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center pt-5'>
            <div>
                <h1 className='text-center'>LogIn</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input required
                            type="email"
                            placeholder='Email'
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            {...register('email')}
                        />
                    </div>
                    <div className="mb-3">
                        <input required
                            type="password"
                            placeholder='Password'
                            className="form-control"
                            id="exampleInputPassword1"
                            {...register('password')}

                         />
                    </div>
                    <div className="mb-3 form-check d-flex justify-content-center">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label ps-2" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                    <div>
                        <button className='btn btn-primary btn-lg w-100'  type='submit'>Login</button>
                    </div>
                    <div className='mt-3 d-flex justify-content-center align-item-center'>
                        <p>Do not have an Account?</p>
                        <Link href='/auth/signup'>SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login