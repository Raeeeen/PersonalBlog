import { notFound } from "next/navigation";
import posts from "@/data/posts.json"; // Import JSON directly
import { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

// Optional: Set dynamic metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title };
}

export default function PostPage({ params }: PageProps) {
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose dark:prose-invert">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
}
