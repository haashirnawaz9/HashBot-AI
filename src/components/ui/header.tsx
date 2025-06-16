
import React from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Button } from './button'
import { currentUser } from '@clerk/nextjs/server'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {
    const user = await checkUser();
    const newuser = await currentUser();
    console.log(user)
  return (
    <div className="flex shadow-sm shadow-slate-700 justify-between">
        <div className="flex">
            <h1 className="mt-9 font-bold text-xl ml-8">
                <Link href='/'>ImageGenAI</Link>
            </h1>
        </div>
        <div className="flex p-7 mr-3">
            {!user ? ( 
            <div className="mr-2">
                <Button className="mr-3 bg-blue-950">
                    <Link href='/sign-in'>Sign In</Link></Button>
                 <Button className="bg-white text-black" variant="secondary">
                     <Link href='/sign-up'>Sign Up</Link></Button>
            </div>)
            :
            (<div className="flex max-w-40">
                <UserButton />
                <h3 className="ml-4">Welcome Back <span className="font-bold">{newuser?.firstName}</span></h3>
            </div>)}
        </div>
    </div>
  )
}

export default Header