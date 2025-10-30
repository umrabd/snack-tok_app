import React from 'react'

const Button = (props) => {
  return (
    <button type="button" className="w-full py-2 cursor-pointer rounded-[var(--radius)] bg-primary text-white font-medium hover:opacity-95 transition">
                {props.btnText}
              </button>
  )
}

export default Button