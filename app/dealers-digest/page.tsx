import { digestPosts } from "@/content/digest";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dealer Digest" };

export default function DigestIndexPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Resources</span>
          <h1>Dealer Digest</h1>
          <p className="lede">
            Tips for sales, F&amp;I, service, and GM/owners. A starter collection — not the full 112-post
            archive from the live site.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container card-list">
          {digestPosts.map((post) => (
            <Link href={`/dealers-digest/${post.slug}`} key={post.slug}>
              <div className="card-meta">
                {post.category} · {post.date} · {post.author}
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
