/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import { Metadata } from "next";
import Image from "next/image";

// Define the exact Post type matching your JSON structure
interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

// Define params type separately
interface Params {
  slug: string;
}

// Use the params type in PageProps
interface PageProps {
  params: Params;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function PostPage({ params }: { params: Params }) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <span className="text-sm border border-black dark:border-white px-2 py-1 rounded-full">
            {post.category}
          </span>
          <time className="text-sm text-gray-500 dark:text-gray-400 block mt-2">
            {post.date}
          </time>
          <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
        </div>

        <div className="relative w-full h-64 md:h-96 mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">{post.excerpt}</p>
          <div className="whitespace-pre-line">{post.content}</div>
        </div>
      </div>
    </div>
  );
}
