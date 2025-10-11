'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function Page() {
    const router = useRouter();
  return (
    <div>
        <Button onClick={()=>router.replace("/")}>click here to go back</Button>
    </div>
  )
}

export default Page