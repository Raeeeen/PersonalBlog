/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import posts from "@/data/posts.json";
import { useDarkMode } from "@/hooks/useDarkMode";
import PostModal from "@/app/components/PostModal";

// Function to group posts by month and sort them
const groupPostsByMonth = (posts: any[]) => {
  const grouped: { [key: string]: any[] } = {};

  posts.forEach((post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });

    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(post);
  });

  return Object.entries(grouped).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateA.getTime() - dateB.getTime(); // Reverse order to make January appear first
  });
};

export default function Archive() {
  const [selectedPost, setSelectedPost] = useState(null);
  const { isDarkMode, toggleDarkMode, isMounted } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isMounted) return null;

  const sortedPosts = groupPostsByMonth(posts);

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
                  <Link href="#" className="hover:underline">
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
                <Link href="#" className="hover:underline">
                  About
                </Link>
                <Link href="/Contact" className="hover:underline">
                  Contact
                </Link>
              </div>
            )}
          </nav>
        </header>

        <main className="flex-grow">
          <section className="max-w-4xl mx-auto px-4 py-16">
            {sortedPosts.map(([month, posts]) => (
              <div key={month} className="mb-12">
                <h2 className="text-2xl font-bold mb-4">{month}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <article key={post.id} className="hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-900">
                      <div className="relative">
                        <Image src={post.image} alt={post.title} width={400} height={250} className="w-full h-48 object-cover" />
                      </div>
                      <div className="p-4">
                        <span className="text-sm border border-black dark:border-white px-2 py-1 rounded-full">{post.category}</span>
                        <h3 className="text-xl font-bold mt-3 mb-2">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{post.excerpt}</p>
                        <div className="flex justify-between items-center text-sm">
                          <time>{post.date}</time>
                          <button className="hover:underline" onClick={() => setSelectedPost(post)}>Read More →</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </main>

        <footer className="border-t border-black dark:border-white">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <p>© 2025 Rodriguez Blog. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="hover:underline">Back to Top</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Post Modal */}
      {selectedPost && <PostModal selectedPost={selectedPost} closeModal={() => setSelectedPost(null)} />}
    </div>
  );
}
