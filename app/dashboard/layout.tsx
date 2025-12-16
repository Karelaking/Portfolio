import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FolderGit2, 
  Wrench, 
  Briefcase, 
  UserCircle,
  Link2
} from 'lucide-react'
import { SignOutButton } from '@/components/dashboard/sign-out-button'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Start with https is required by Supabase client often
  if (!url || !key || !url.startsWith('https://')) {
     return (
        <div className="flex h-screen items-center justify-center p-4">
           <div className="text-center">
             <p className="text-lg font-semibold text-red-600 mb-2">Supabase Configuration Error</p>
             <p className="text-gray-600">
               {!url || !key ? "Missing environment variables." : "Invalid Supabase URL format."}
             </p>
             <p className="text-sm text-gray-500 mt-2">URL must start with https://</p>
           </div>
        </div>
     )
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderGit2 },
    { name: 'Skills', href: '/dashboard/skills', icon: Wrench },
    { name: 'Experience', href: '/dashboard/experience', icon: Briefcase },
    { name: 'Socials', href: '/dashboard/socials', icon: Link2 },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:flex">
        <div className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</span>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-5 flex-1 space-y-1 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              >
                <item.icon
                  className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="mb-4 flex items-center px-3">
             <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.email}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
