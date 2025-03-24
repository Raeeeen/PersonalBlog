/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import { Metadata } from "next";
import Image from "next/image";

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

// Use inline props typing to bypass the check
export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Your existing JSX */}
    </div>
  );
}
