'use client'

import Link from "next/link"
import { Video } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header() {
    const pathName = usePathname()
    
    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Video className="h-6 w-6 text-blue-500" />
                    <span className="text-xl font-bold">VideoShare</span>
                </Link>
                <nav>
                    <Link href="/videos" className={`text-blue-500 hover:text-blue-700 ${pathName==='/videos' && 'hidden'}`}>
                        View Videos
                    </Link>
                </nav>
            </div>
        </header>
    )
}

