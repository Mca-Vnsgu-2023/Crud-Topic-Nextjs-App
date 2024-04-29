'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { BASE_API_URL } from '../../utils/constants'
import styles from './user.module.scss'


function Login() {

    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (inputData) => {
        try {
            const res = await axios.post(`${BASE_API_URL}/api/users/login`, inputData);
            if (res.status === 200) {
                toast.success("Login successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
                router.push('/');
            } else {
                toast.error("Invalid Credentials or Server Error!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000
                });
                throw new Error("Invalid Credentials or Server Error");
            }
        } catch (err) {
            console.log("Error:", err);
            toast.error("An error occurred. Please try again later.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000
            });
        }
    };


    return (
        <div className='d-flex justify-content-center align-items-center pt-5'>
            <div className='pt-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className='mb-3' htmlFor="LogIn" style={{ fontSize: '30px', fontWeight: '500px' }}>LogIn</label>
                        <input required
                            type="email"
                            placeholder='Email'
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            {...register('email')}
                        />
                    </div>
                    <div className={`mb-3 input-group`}>
                        <div className={`${styles.passwordInputwithImage}`}>
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                className="form-control"
                                id="exampleInputPassword1"
                                {...register('password')}
                            />
                            <button onClick={togglePasswordVisibility} type="button" >
                                {showPassword ?
                                    <HiEye size={20} color="black" /> :
                                    <HiEyeOff size={20} color="black" />
                                }
                            </button>
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <Link href='/auth/forgotPassword' style={{ color: 'blue' }}>Forgot Password?</Link>
                    </div>
                    <div>
                        <button className='btn btn-primary btn-lg w-100' type='submit'>Login</button>
                    </div>
                    <div className='mt-3 d-flex justify-content-center align-item-center'>
                        <label>Do not have an Account?</label>
                        <Link href='/auth/signup' style={{ color: 'blue' }}>SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login