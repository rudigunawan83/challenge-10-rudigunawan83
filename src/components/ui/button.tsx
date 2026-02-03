import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-full bg-blue-500 py-2 text-sm
      font-semibold text-white transition hover:bg-blue-600 disabled:opacity-50"
    >
      {children}
    </button>
  )
}
