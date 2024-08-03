import React from 'react'
import { Button, ButtonProps } from './button'

interface ButtonProps{
    isLoading: boolean,
    className: string,
    children: React.ReactNode,
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
   <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
    {isLoading ? (
        <div className='flex items-center gap-4'>
           
            
        </div>
    )}
     </Button>
  )
}

export default SubmitButton