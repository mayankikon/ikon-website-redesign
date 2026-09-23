import { digestPosts, getDigestPost } from "@/content/digest";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return digestPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getDigestPost(slug);
  return { title: post?.title ?? "Dealer Digest" };
}

export default async function DigestPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getDigestPost(slug);
  if (!post) notFound();
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="lede">
            {post.author} · {post.date}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container article-body">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
