'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../utils/constants';
import Link from 'next/link';
import styles from './user.module.scss'


function ForgotPassword() {

    const { register, handleSubmit } = useForm()
    const router = useRouter()

    const onSubmit = async (inputData) => {
        try {
            const res = await axios.post(`${BASE_API_URL}/api/users/login/forgotPassword`, inputData)
            if (res.status == 200) {
                toast.success("Password reset successfully !", {
                    position: toast.POSITION.TOP_RIGHT, autoClose: 2000
                });
                router.push('/auth/login')
                router.refresh();
            } else {
                throw new Error("User not found.")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center pt-5'>
            <div>
                <Link href=''  style={{fontSize: '30px', fontWeight:'500px',color:'black'}}>Reset Password</Link>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input required
                            type="email"
                            placeholder='Enter Email'
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            {...register('email')}
                        />
                    </div>
                    <div className="mb-3">
                        <input required
                            type="password"
                            placeholder='Enter New Password'
                            className="form-control"
                            id="exampleInputPassword1"
                            {...register('newPassword')}
                        />
                    </div>
                    <div className={styles.forgotPasswordDiv}>
                        <div>
                            <Link href='/auth/login'>
                                <button className='btn btn-secondary btn-lg w-100' type='button'>Back</button>
                            </Link>
                        </div>
                        <div>
                            <button className='btn btn-primary btn-lg w-100' type='submit'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword