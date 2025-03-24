/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import posts from "@/data/posts.json";

interface Post {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);
    document.documentElement.classList.toggle("dark", savedDarkMode);
  }, []);

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  // Open the modal with the selected post
  const openModal = (post: any) => {
    setSelectedPost(post);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedPost(null);
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
                  <Link href="#" className="hover:underline">
                    Home
                  </Link>
                  <Link href="/About" className="hover:underline">
                    About
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
                <Link href="#" className="hover:underline">
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

        {/* Blog Posts */}
        <main className="flex-grow">
          <section className="max-w-4xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-900"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <span className="text-sm border border-black dark:border-white px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mt-3 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <time>{post.date}</time>
                      <button
                        onClick={() => openModal(post)}
                        className="hover:underline"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
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

      {/* Popup Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg w-full max-w-2xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>

            {selectedPost.id === 1 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : "" // Hide normal image when enlarged
                    }`}
                    onClick={() => setIsImageEnlarged(true)} // Click to enlarge
                  >
                    <Image
                      src="/assets/images/thesispic1.jpg"
                      alt="Thesis Picture 1"
                      width={400} // Normal size
                      height={300} // Normal size
                      className="w-full h-auto rounded-lg transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-gray-600 dark:text-gray-300 text-justify">
                    {selectedPost.content}
                  </p>
                </div>
              </div>
            )}

            {selectedPost.id === 2 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : "" // Hide normal image when enlarged
                    }`}
                    onClick={() => setIsImageEnlarged(true)} // Click to enlarge
                  >
                    <Image
                      src="/assets/images/thesispic2.jpg"
                      alt="Thesis Picture 2"
                      width={400} // Normal size
                      height={300} // Normal size
                      className="w-full h-auto rounded-lg transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex-1 flex items-center">
                  <p className="text-gray-600 dark:text-gray-300 text-justify">
                    {selectedPost.content}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Enlarge Image Modal */}
          {isImageEnlarged && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
              onClick={() => setIsImageEnlarged(false)} // Close when clicking on the background
            >
              <div className="relative">
                <button
                  onClick={() => setIsImageEnlarged(false)} // Close the enlarged image
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Image
                  src="/assets/images/thesispic1.jpg"
                  alt="Enlarged Thesis Picture"
                  width={800} // Full-screen size
                  height={600} // Full-screen size
                  className="w-auto h-auto rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
