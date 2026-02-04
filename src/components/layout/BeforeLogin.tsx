import Link from "next/link"

export default function BeforeLogin({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`flex ${mobile ? "flex-col gap-3" : "items-center gap-4"}`}>
      <Link
        href="/login"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
      >
        Register
      </Link>
    </div>
  )
}
