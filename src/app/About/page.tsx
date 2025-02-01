"use client";

import { useState } from "react";
import Image from "next/image";
import Profile from "@/assets/images/profile.png";
import Link from "next/link";

export default function page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-black text-black dark:text-white">
        {/* Header */}
        <header className="border-b border-black dark:border-white">
          <nav className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Rodriguez Blog</h1>

              <div className="flex items-center space-x-6">
                {/* Dark Mode Toggle */}
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

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <Link href="#" className="hover:underline">
                    About
                  </Link>
                  <Link href="/Archive" className="hover:underline">
                    Archive
                  </Link>
                  <Link href="/Contact" className="hover:underline">
                    Contact
                  </Link>
                </div>

                {/* Mobile Menu Button */}
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

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 space-y-2">
                <Link href="/" className="hover:underline">
                  Home
                </Link>
                <Link href="#" className="hover:underline">
                  About
                </Link>
                <Link href="/Archive" className="hover:underline">
                  Archive
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
              <h2 className="text-4xl font-bold mb-8">About Me</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Image */}
                <div className="relative h-64 md:h-96">
                  <Image
                    src={Profile}
                    alt="Profile Picture"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>

                {/* About Content */}
                <div className="space-y-6">
                  <p className="text-lg">
                    "I am a Computer Science student passionate about learning
                    and exploring new technologies. I enjoy solving problems,
                    improving my skills, and diving into web development, mobile
                    development, AI, and gaming development.
                  </p>
                  <p className="text-lg">
                    I’m always eager to explore emerging areas of technology and
                    work collaboratively on exciting challenges. My goal is to
                    continue growing and expanding my expertise in the tech
                    field.
                  </p>
                  <p className="text-lg">
                    I thrive in fast-paced environments and am constantly
                    seeking opportunities to push the boundaries of innovation.
                    Through hands-on projects and teamwork, I aim to contribute
                    to the future of technology."
                  </p>
                </div>
              </div>

              {/* Skills Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border border-black dark:border-white rounded-lg">
                    <h4 className="font-semibold">Web Development</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      React, Next.js, Node.js
                    </p>
                  </div>
                  <div className="p-4 border border-black dark:border-white rounded-lg">
                    <h4 className="font-semibold">Mobile Development</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      React Native, Android Studio
                    </p>
                  </div>
                  <div className="p-4 border border-black dark:border-white rounded-lg">
                    <h4 className="font-semibold">Game Development</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Unity
                    </p>
                  </div>
                  <div className="p-4 border border-black dark:border-white rounded-lg">
                    <h4 className="font-semibold">DB Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      PostgreSQL, MySQL, Firebase
                    </p>
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
