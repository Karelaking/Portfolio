import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t mt-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-16 shadow-lg border-0 border-transparent">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Mradul Kumar. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer