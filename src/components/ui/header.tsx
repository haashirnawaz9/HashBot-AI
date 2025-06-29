import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { checkUser } from '@/lib/checkUser'
import HeaderClient from './HeaderClient'

const Header = async () => {
    const user = await checkUser();
    const newuser = await currentUser();
    console.log(user)
    
    return (
        <HeaderClient 
            user={Boolean(user)}
            firstName={newuser?.firstName || ''} 
        />
    )
}

export default Header