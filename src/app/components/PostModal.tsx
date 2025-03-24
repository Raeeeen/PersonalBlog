"use client";

import { useState } from "react";
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
}

interface PostModalProps {
  selectedPost: Post | null;
  closeModal: () => void;
}

export default function PostModal({ selectedPost, closeModal }: PostModalProps) {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  if (!selectedPost) return null;

  // Define modal images based on post ID
  const imageMap: { [key: number]: string } = {
    1: "/assets/images/thesispic1.jpg",
    2: "/assets/images/thesispic2.jpg",
    3: "/assets/images/lookingforojt.png",
    4: "/assets/images/ojtinterview.jpg",
    5: "/assets/images/first_task_1.jpg",
    6: "/assets/images/second_task_2.png",
    7: "/assets/images/third_task_3.png",
    8: "/assets/images/fourth_task_4.png",
    9: "/assets/images/fifth_task_5.png",
    10: "/assets/images/six_task_6.png",
    11: "/assets/images/seventh_task_7.png",
    12: "/assets/images/eight_task_8.png",
  };

  const modalImage = imageMap[selectedPost.id] || "/assets/images/default.jpg";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
          <div className="flex-1 mb-4 sm:mb-0 sm:max-w-[400px] sm:mr-4 flex justify-center">
            <div
              className={`w-full h-auto rounded-lg cursor-pointer transition-all duration-300 ${
                isImageEnlarged ? "opacity-0" : "" // Hide normal image when enlarged
              }`}
              onClick={() => setIsImageEnlarged(true)}
            >
              <Image
                src={modalImage}
                alt="Post Image"
                width={400}
                height={300}
                className="w-full h-auto rounded-lg transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <p className="text-gray-600 dark:text-gray-300 text-justify">{selectedPost.content}</p>
          </div>
        </div>
      </div>

      {/* Enlarged Image (Overlay) */}
      {isImageEnlarged && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 cursor-pointer"
          onClick={() => setIsImageEnlarged(false)}
        >
          <Image
            src={modalImage}
            alt="Enlarged Image"
            width={800} // Enlarged size
            height={600} // Enlarged size
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
