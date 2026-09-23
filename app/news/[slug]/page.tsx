import { getNewsPost, newsPosts } from "@/content/digest";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: getNewsPost(slug)?.title ?? "News" };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">News</span>
          <h1>{post.title}</h1>
          <p className="lede">{post.date}</p>
        </div>
      </section>
      <section className="section">
        <div className="container article-body">
          <p>{post.excerpt}</p>
        </div>
      </section>
    </main>
  );
}
