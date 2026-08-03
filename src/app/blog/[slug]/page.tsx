import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import { SITE_NAME, SITE_URL, pageMetadata } from "../../seo";
import { BlogCover } from "../BlogVisuals";
import { blogPosts, getBlogPost } from "../posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return pageMetadata({
    title: `${post.title} - Lisup Blog`,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/opengraph-image`,
  };

  return (
    <div style={{ background: "#FDF6F0", minHeight: "100vh", color: "#26231F", overflowX: "hidden" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main>
        <article className="blog-post-shell">
          <Link href="/blog" className="blog-back-link" data-cursor>
            Back to blog
          </Link>

          <header className="blog-post-header">
            <div>
              <div className="font-jetbrains" style={{ fontSize: "11px", color: "#E07B39", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "16px" }}>
                {post.category} / {post.readTime}
              </div>
              <h1 className="font-bricolage" style={{ fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 0.94, letterSpacing: "-.045em", margin: "0 0 22px", fontWeight: 800 }}>
                {post.title}
              </h1>
              <p style={{ maxWidth: "720px", fontSize: "19px", lineHeight: 1.58, color: "#6B6560", margin: 0 }}>
                {post.description}
              </p>
            </div>
            <BlogCover post={post} />
          </header>

          <div className="blog-post-meta font-jetbrains">
            <span>{post.date}</span>
            <span>{post.category}</span>
            <span>{post.readTime}</span>
          </div>

          <div className="blog-post-content">
            <p className="blog-post-intro">{post.intro}</p>
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}