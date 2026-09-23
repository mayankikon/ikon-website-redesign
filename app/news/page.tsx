import { newsPosts } from "@/content/digest";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "News" };

export default function NewsIndexPage() {
  return (
    <main id="main" className="page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Company</span>
          <h1>Latest news</h1>
          <p className="lede">
            Product updates, partner announcements, and company news from Ikon Technologies.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container card-list">
          {newsPosts.map((post) => (
            <Link href={`/news/${post.slug}`} key={post.slug}>
              <div className="card-meta">{post.date}</div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
