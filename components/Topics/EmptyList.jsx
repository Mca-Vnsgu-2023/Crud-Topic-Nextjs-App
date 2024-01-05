'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function EmptyList() {
    const router = useRouter()
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div>
                <h2 className='text-center'>Your list is empty</h2>
                <div className='text-center mt-4'>
                    <button className='btn btn-primary btn-lg w-auto' onClick={() => router.push('/topic/add')}>Add Topic</button>
                </div>
            </div>
        </div>
    )
}

export default EmptyList