import Link from "next/link"

export default function BeforeLogin() {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Register
      </Link>
    </div>
  )
}
