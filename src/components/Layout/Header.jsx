import React from 'react'
import { useLocation } from 'react-router'

export const Header = () => {

  const pathname = useLocation().pathname

  return (
    <div className='shadow-[0px_8px_5px_-5px_rgba(0,0,0,0.2)] w-full'>
      <span className="text-3xl font-semibold flex w-full p-4 text-grey-900 uppercase">
        {pathname.slice(1,)}
        </span>
    </div>
  )
}
