import { InputHTMLAttributes } from "react"
import clsx from "clsx"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
  helperText?: string
  rightIcon?: React.ReactNode
}

export default function Input({
  error,
  helperText,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <div>
      <div className="relative">
        <input
          {...props}
          className={clsx(
            "w-full rounded-md border px-4 py-2 text-sm focus:outline-none",
            error
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          )}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>

      {/* TEXT HELPER */}
      <p
        className={clsx(
          "mt-1 text-xs",
          error ? "text-red-500" : "text-transparent"
        )}
      >
        {helperText || "placeholder"}
      </p>
    </div>
  )
}
