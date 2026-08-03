import Link from "next/link";
import Navbar from "../Navbar";
import SiteFooter from "../SiteFooter";
import { BlogCard, BlogCover } from "./BlogVisuals";
import { blogPosts, featuredBlogPost } from "./posts";

export default function BlogPage() {
  const posts = blogPosts.filter((post) => post.slug !== featuredBlogPost.slug);

  return (
    <div style={{ background: "#FDF6F0", minHeight: "100vh", color: "#26231F", overflowX: "hidden" }}>
      <Navbar />

      <main>
        <section className="blog-hero-section">
          <div className="blog-shell">
            <div className="blog-hero-grid">
              <div>
                <div className="font-jetbrains" style={{ fontSize: "12px", color: "#E07B39", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "18px" }}>
                  Lisup Journal
                </div>
                <h1 className="font-bricolage" style={{ fontSize: "clamp(42px, 7vw, 82px)", lineHeight: 0.92, letterSpacing: "-.045em", margin: "0 0 24px", fontWeight: 800 }}>
                  Voice-first writing, workflows, and AI productivity.
                </h1>
                <p style={{ maxWidth: "610px", fontSize: "19px", lineHeight: 1.55, color: "#6B6560", margin: 0 }}>
                  Practical essays and guides for people who want to write faster with voice, clean up messy thoughts, and use AI directly inside their daily apps.
                </p>
              </div>
              <BlogCover post={featuredBlogPost} />
            </div>
          </div>
        </section>

        <section style={{ padding: "24px 0 90px" }}>
          <div className="blog-shell">
            <Link href={`/blog/${featuredBlogPost.slug}`} className="blog-featured-link" data-cursor>
              <div>
                <div className="font-jetbrains" style={{ fontSize: "11px", color: "#E07B39", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Featured / {featuredBlogPost.readTime}
                </div>
                <h2 className="font-bricolage" style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-.035em", margin: "0 0 14px", fontWeight: 800, color: "#26231F" }}>
                  {featuredBlogPost.title}
                </h2>
                <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
                  {featuredBlogPost.description}
                </p>
              </div>
              <span className="font-bricolage" style={{ color: "#E07B39", fontWeight: 800, whiteSpace: "nowrap" }}>
                Read guide
              </span>
            </Link>

            <div className="blog-section-heading">
              <div>
                <div className="font-jetbrains" style={{ fontSize: "11px", color: "#A29B91", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "10px" }}>
                  Latest posts
                </div>
                <h2 className="font-bricolage" style={{ fontSize: "34px", lineHeight: 1, margin: 0, letterSpacing: "-.03em" }}>
                  Guides for better voice workflows
                </h2>
              </div>
            </div>

            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}