import React from 'react'

type Props = {
  icon?: React.ReactNode
  text?: string
  variant: 'success' | 'danger'
  onClick?: () => void
}

const Button: React.FC<Props> = ({ icon, text, variant, onClick }) => {
  if (icon) {
    return (
      <button
        type="button"
        className={
          'relative z-0 block bg-transparent px-6 py-3 font-whyte-inktrap text-lg font-bold tracking-wider text-black after:absolute after:left-0 after:top-0 after:z-[1] after:h-full after:w-full after:translate-y-[4px] after:translate-x-[4px] after:rounded after:bg-white after:ring-2 after:ring-inset after:ring-black' +
          (variant === 'success' ? ' after:bg-custom-green-dark' : ' after:bg-custom-pink-dark')
        }
        onClick={onClick}
      >
        <div
          className={
            'absolute left-0 top-0 z-[2] grid h-full w-full place-items-center rounded bg-white ring-2 ring-inset ring-black transition-all duration-150 ease-in-out hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[4px] active:translate-y-[4px]' +
            (variant === 'success' ? ' bg-custom-green-light' : ' bg-custom-pink-light')
          }
        >
          {icon}
        </div>
        {icon}
      </button>
    )
  }

  return (
    <button
      type="button"
      className={
        'relative z-0 block bg-transparent px-12 py-3 font-whyte-inktrap text-lg font-bold tracking-wider text-black before:absolute before:left-0 before:top-0 before:z-[2] before:grid before:h-full before:w-full before:place-items-center before:rounded before:bg-white before:ring-2 before:ring-inset before:ring-black before:transition-all before:duration-150 before:ease-in-out before:content-[attr(data-text)] after:absolute after:left-0 after:top-0 after:z-[1] after:h-full after:w-full after:translate-y-[4px] after:translate-x-[4px] after:rounded after:bg-white after:ring-2 after:ring-inset after:ring-black hover:before:translate-x-[1px] hover:before:translate-y-[1px] active:before:translate-x-[4px] active:before:translate-y-[4px] ' +
        (variant === 'success'
          ? 'before:bg-custom-green-light after:bg-custom-green-dark'
          : 'before:bg-custom-pink-light after:bg-custom-pink-dark')
      }
      data-text={text}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
