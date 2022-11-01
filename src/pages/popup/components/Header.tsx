import React from 'react'

type Props = {
  headerText: string
  subText: string
}

const Header: React.FC<Props> = ({ headerText, subText }) => {
  return (
    <header className="flex items-end justify-between gap-2 bg-custom-yellow-light p-4 ring-2 ring-inset ring-black">
      <h1 className="select-none bg-black font-whyte-inktrap text-3xl font-bold tracking-wide text-custom-yellow-light">
        {headerText}
      </h1>
      <p className="w-16 text-right font-poppins text-xs font-semibold leading-3 text-black">
        {subText}
      </p>
    </header>
  )
}

export default Header
