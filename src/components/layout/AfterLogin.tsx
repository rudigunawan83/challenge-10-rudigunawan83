import Link from "next/link"
import { PenLine } from "lucide-react"

export default function AfterLogin({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`flex ${mobile ? "flex-col gap-3" : "items-center gap-4"}`}>
      <Link
        href="/write"
        className="flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        <PenLine size={16} />
        Write Post
      </Link>

      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="h-9 w-9 rounded-full"
        />
        <span className="text-sm font-medium">John Doe</span>
      </div>
    </div>
  )
}
