'use client';

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AccountContent = () => {
    const [Loading, setLoading] = useState(false);
    const router = useRouter();
    const {user, isLoading} = useUser();

    useEffect(()=>{
        if(!isLoading && !user){
            router.replace('/')
        }
    },[isLoading, user, router])
  return (
    <div className='mb-7 px-6'>
        <p className='text-white text-lg'>Welcome to Spotify Clone</p>
        <p className='text-white text-lg absolute bottom-10'>This clone is built by <a className='text-[#225cce]' href='https://github.com/olivemonk' target='_blank'> olivemonk</a></p>
    </div>
  )
}

export default AccountContent