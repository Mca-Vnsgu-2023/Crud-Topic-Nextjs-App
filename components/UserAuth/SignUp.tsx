'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import { BASE_API_URL } from '../../utils/constants';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


function SignUp() {

    const { register, handleSubmit } = useForm()
    const router = useRouter()

    const onSubmit = async (inputData) => {
        try {
            const res = await axios.post(`${BASE_API_URL}/api/users/signup`, inputData)
            if (res.status == 200) {
                toast.success("SignUp successfully !", {
                    position: toast.POSITION.TOP_RIGHT, autoClose:2000
                });
                router.push('/auth/login')
                router.refresh();
            } else {
                throw new Error("User not created.")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div>
                <h1 className='text-center'>SignUp</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Name'
                            className="form-control"
                            id="exampleInputName"
                            {...register('name')}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder='Email'
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            {...register('email')}
                        />
                    </div>
                    <div className="mb-3">
                        <input
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
                        <button className='btn btn-primary btn-lg w-100' type='submit'>SignUp</button>
                    </div>
                    <div className='mt-3 d-flex justify-content-center align-item-center'>
                        <p>Already have an Account?</p>
                        <p><Link href='/auth/login'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp