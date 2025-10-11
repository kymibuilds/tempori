"use client";

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react'

function Heading() {
  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>Your Ideas, Unified. Welcome to <span className='underline'>Nuta</span></h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>foo-foo is the connected workspace where <br />better faster work happens</h3>
        <Button className='hover:cursor-pointer'>
            Enter Nuta
            <ArrowRightIcon className='h-4 w-4 ml-2'/>
        </Button>
    </div>
  )
}

export default Heading