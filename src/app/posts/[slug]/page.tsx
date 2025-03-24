import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function PostPage({ params }: PageProps) {
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