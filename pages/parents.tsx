import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import image from '../public/assets/parent-bg.png'

const parents = () => {
    return (
        <div className='bg-gradient-to-br from-[#7eabfaff] via-[#98bbf9ff] to-[#bbd1f7ff] h-[100dvh]'>
            <div className='flex justify-between p-10'>
                <p className='text-white text-2xl font-semibold'>
                    <Link href='/'>
                        CodeAlgo
                    </Link>
                </p>
                <p className=''>Already have an account? <span className='text-blue-500 font-medium cursor-pointer'>Log in</span></p>
            </div>
            <div className='grid place-content-center'>
                <div className='flex px-10 md:px-20 items-center'>
                    <div className='w-full md:w-[500px] space-y-3 p-8 grid bg-white rounded-3xl bg-clip-padding backdrop-blur-xl bg-opacity-30'>
                        <p className='text-2xl font-medium'>Thanks for joining CodeAlgo!</p>
                        <p className='font-light'>Your parent hub is ready for you</p>
                        <button className='bg-blue-500 p-3 rounded-md text-white hover:bg-opacity-50'>Continue</button>
                        <p className='underline underline-offset-2 text-sm capitalize text-center cursor-pointer'>continue as student</p>
                    </div>
                    <Image
                        src={image}
                        alt=''
                        draggable={false}
                        className='relative z-10 max-w-full'
                    />
                </div>
            </div>
        </div>
    )
}

export default parents