import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>Home
          <Button>
            <Link href='/main'>Main</Link>
          </Button>
    </div>
  )
}

export default Home