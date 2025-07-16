// Gagandeep Singh and Amal John
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Button } from './button'
import Sidebar from './sidebar'

const HeaderClient = ({ user, firstName }: { user: boolean, firstName?: string }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="flex shadow-sm shadow-slate-700 justify-between cursor-pointer">
                <div className="flex">
                    <h1 className="mt-9 font-bold text-xl ml-9">
                        <Link href='/'>ImageGenAI</Link>
                    </h1>
                </div>
                <div className="flex p-7 mr-3 items-center">
                    {!user ? (
                        <div className="flex">
                            <Button className="mr-3 bg-blue-950">
                                <Link href='/sign-in'>Sign In</Link>
                            </Button>
                            {/* Hide Sign Up on small screens (mobile) */}
                            <div className="hidden sm:block">
                                <Button className="bg-white text-black">
                                    <Link href='/sign-up'>Sign Up</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex max-w-40 items-center">
                            <UserButton />
                            {/* Hide welcome message on small screens (mobile) */}
                            <h3 className="ml-4 hidden sm:block">
                                Welcome Back <span className="font-bold">{firstName}</span>
                            </h3>
                        </div>
                    )}
                    
                    <button
                        className="ml-6 flex flex-col justify-center cursor-pointer"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="block h-0.5 w-6 bg-white mb-1.5"></span>
                        <span className="block h-0.5 w-6 bg-white mb-1.5"></span>
                        <span className="block h-0.5 w-6 bg-white"></span>
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                toggle={() => setSidebarOpen(!sidebarOpen)}
                user={user}
                firstName={firstName}
            />
        </>
    )
}

export default HeaderClient
