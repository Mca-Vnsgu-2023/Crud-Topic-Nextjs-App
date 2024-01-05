'use client'
import Link from "next/link";
import styles from '../main.module.scss'
import { HiOutlineLogout, HiOutlineUserCircle, HiPlus } from 'react-icons/hi'
import { logoutAction } from "./Utils/logoutAction";
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";


export default function Navbar() {

    const cookie = getCookie('userName')
    const [userName,setUserName]=useState()

    useEffect(()=>{
        if(cookie){
            setUserName(cookie)
        }
    },[cookie])

    const router = useRouter()
    const onLogOut = () => {
        logoutAction()
    }

    return (
        <nav className="navbar bg-dark border-bottom border-body ps-3 pe-4 mb-3" data-bs-theme="dark" >
            <div className="d-flex justify-content-between col-md-10">
                <Link href={"/"} className={styles.navBarLink}>
                    <p>My Todo</p>
                </Link>
                <div className="ps-4">
                <button className='btn btn-primary' onClick={() => router.push('/topic/add')}>
                    <HiPlus size={24} color="white"/>
                </button>
                </div>
            </div>
            <div className="d-flex justify-content-between ps-5 col-md-2">
                <button>
                    <HiOutlineUserCircle size={24} color="white" /> {userName}
                </button>
                <button onClick={onLogOut} className="ps-3 ms-2">
                    <HiOutlineLogout size={24} color="red" />
                </button>
            </div>
        </nav>
    );
}