"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import posts from "@/data/posts.json";
import { useDarkMode } from "@/hooks/useDarkMode";

interface Post {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

// Icon components
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode, isMounted } = useDarkMode();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const openModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  // Scroll to center the selected card
  const scrollToCenter = (index: number) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const cardLeft = card.offsetLeft;
    const scrollTo = cardLeft - containerWidth / 2 + cardWidth / 2;

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  const handleArrowClick = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? Math.max(0, currentCenterIndex - 1)
        : Math.min(posts.length - 1, currentCenterIndex + 1);

    setCurrentCenterIndex(newIndex);
    scrollToCenter(newIndex);
  };

  useEffect(() => {
    scrollToCenter(0);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-black text-black dark:text-white">
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
                  <Link href="/Archive" className="hover:underline">
                    Archive
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

        <main className="flex-grow">
          <section className="max-w-full mx-auto px-4 py-8 overflow-hidden relative">
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              onClick={() => handleArrowClick("left")}
              disabled={currentCenterIndex === 0}
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
              onClick={() => handleArrowClick("right")}
              disabled={currentCenterIndex === posts.length - 1}
            >
              <ChevronRightIcon className="h-8 w-8" />
            </button>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
              >
                <div className="flex items-center space-x-8 pl-[calc(50%-24rem)] pr-[calc(50%-24rem)]">
                  {posts.map((post, index) => {
                    const isCenter = index === currentCenterIndex
                    return (
                      <article
                        key={post.id}
                        ref={(el) => {
                          if (el) cardRefs.current[index] = el
                        }}
                        className={`flex-shrink-0 w-80 transform transition-all duration-300 snap-center ${
                          isCenter
                            ? "scale-95 z-10" // Selected card enlarged (110%)
                            : "scale-90 opacity-80 grayscale-[20%] hover:scale-95" // Non-selected reduced (90%)
                        }`}
                        onClick={() => {
                          setCurrentCenterIndex(index)
                          scrollToCenter(index)
                          openModal(post)
                        }}
                      >
                        <div
                          className={`relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-xl h-[28rem] ${
                            isCenter
                              ? "ring-4 ring-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.6)]"
                              : ""
                          }`}
                        >
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className={`object-cover transition-opacity duration-300 ${
                              isCenter ? "opacity-90" : "opacity-70"
                            }`}
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                              {post.category}
                            </span>
                            <h3
                              className={`text-xl font-bold text-white mt-1 mb-2 ${
                                isCenter ? "text-2xl" : ""
                              }`}
                            >
                              {post.title}
                            </h3>
                            <p className="text-gray-300 text-sm line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                              <time>{post.date}</time>
                              <span className="flex items-center text-yellow-400">
                                Read More{" "}
                                <ArrowRightIcon className="ml-1 h-4 w-4" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
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
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/thesispic1.jpg"
                      alt="Thesis Picture 1"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/thesispic1.jpg")
                        setIsImageEnlarged(true)
                      }}
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
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/thesispic2.jpg"
                      alt="Thesis Picture 2"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/thesispic2.jpg")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 3 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/lookingforojt.png"
                      alt="Thesis Picture 3"
                      width={400} // Normal size
                      height={300} // Normal size
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/lookingforojt.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 4 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/ojtinterview.jpg"
                      alt="Thesis Picture 4"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/ojtinterview.jpg")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 5 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/first_task_1.jpg"
                      alt="Thesis Picture 5"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/first_task_1.jpg")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 6 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/second_task_2.png"
                      alt="Thesis Picture 6"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/second_task_2.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 7 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/third_task_3.png"
                      alt="Thesis Picture 6"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/third_task_3.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 8 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/fourth_task_4.png"
                      alt="Thesis Picture 6"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/fourth_task_4.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 9 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/fifth_task_5.png"
                      alt="Thesis Picture 6"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/fifth_task_5.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 10 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/six_task_6.png"
                      alt="Thesis Picture 6"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/six_task_6.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 11 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/seventh_task_7.png"
                      alt="Thesis Picture 6"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/seventh_task_7.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 12 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/eight_task_8.png"
                      alt="Thesis Picture 7"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/eight_task_8.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 13 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/nine_task_9.png"
                      alt="Thesis Picture 8"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/nine_task_9.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 14 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/tenth_task_10.png"
                      alt="Thesis Picture 9"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/tenth_task_10.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 15 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/eleventh_task_11.png"
                      alt="Thesis Picture 10"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/eleventh_task_11.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 16 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/twelveth_task_12.png"
                      alt="Thesis Picture 11"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/twelveth_task_12.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 17 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/thirteenth_task_13.png"
                      alt="Thesis Picture 11"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage(
                          "/assets/images/thirteenth_task_13.png"
                        )
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 18 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/twelveth_task_12.png"
                      alt="Thesis Picture 11"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage("/assets/images/twelveth_task_12.png")
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 19 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/thirteenth_task_13.png"
                      alt="Thesis Picture 11"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage(
                          "/assets/images/thirteenth_task_13.png"
                        )
                        setIsImageEnlarged(true)
                      }}
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

            {selectedPost.id === 20 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
                  <div
                    className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                      isImageEnlarged ? "opacity-0" : ""
                    }`}
                  >
                    <Image
                      src="/assets/images/checking_clearance.jpg"
                      alt="Thesis Picture 12"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-lg transition-all duration-300"
                      onClick={() => {
                        setEnlargedImage(
                          "/assets/images/checking_clearance.jpg"
                        )
                        setIsImageEnlarged(true)
                      }}
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
          {isImageEnlarged && enlargedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
              onClick={() => {
                setEnlargedImage(null)
                setIsImageEnlarged(false)
              }}
            >
              <div className="relative">
                <button
                  onClick={() => {
                    setEnlargedImage(null)
                    setIsImageEnlarged(false)
                  }}
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
                  src={enlargedImage}
                  alt="Enlarged Image"
                  width={800}
                  height={600}
                  className="w-auto h-auto rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
