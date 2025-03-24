/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useDarkMode } from "@/hooks/useDarkMode";
import { 
  EnvelopeIcon,
  PhoneIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  CameraIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Contact() {
  const { isDarkMode, toggleDarkMode, isMounted } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-black text-black dark:text-white">
        {/* Header */}
        <header className="border-b border-black dark:border-white">
          <nav className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Rodriguez Blog</h1>

              <div className="flex items-center space-x-6">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>

                <div className="hidden md:flex space-x-6">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <Link href="/About" className="hover:underline">
                    About
                  </Link>
                  <Link href="/Contact" className="hover:underline">
                    Contact
                  </Link>
                  <Link href="/Archive" className="hover:underline">
                    Archive
                  </Link>
                </div>

                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 space-y-2">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="/About" className="hover:underline">
                  About
                </Link>
                <Link href="/Contact" className="hover:underline">
                  Contact
                </Link>
              </div>
            )}
          </nav>
        </header>

        {/* Main Content */}
<main className="flex-grow">
  <section className="border-b border-black dark:border-white">
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold mb-8">Contact Me</h2>

      <div className="grid md:grid-cols-2 gap-8">
       <div className="relative aspect-square w-full h-auto min-h-[16rem] md:min-h-[24rem] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <Image
            src="/assets/images/contact.jpg"
            alt="Profile Picture"
            fill={true}
            className="object-cover"
            priority={true}
          />
        </div>

        <div className="space-y-8">
          <p className="text-lg">
            Feel free to reach out through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Social Media</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="https://github.com/Raeeeen" 
                target="_blank"
                className="p-4 border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <CodeBracketIcon className="h-6 w-6" />
                  <span>GitHub</span>
                </div>
              </Link>
              <Link 
                href="https://linkedin.com/in/rafael-enrique-rodriguez-747422192" 
                target="_blank"
                className="p-4 border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <BriefcaseIcon className="h-6 w-6" />
                  <span>LinkedIn</span>
                </div>
              </Link>
              <Link 
                href="https://twitter.com/Raeeeen" 
                target="_blank"
                className="p-4 border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span>Twitter</span>
                </div>
              </Link>
              <Link 
                href="https://instagram.com/rae_eeen" 
                target="_blank"
                className="p-4 border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <CameraIcon className="h-6 w-6" />
                  <span>Instagram</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Direct Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5" />
                <span>rodriguezrafaelenrique00@gmail.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5" />
                <span>+639089430328</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

        {/* Footer */}
        <footer className="border-t border-black dark:border-white">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <p>© 2025 Rodriguez Blog. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:underline">
                Back to Top
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}