import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Section } from "../../components/UI/Section";

interface Tag {
  id: number;
  name: string;
}

interface PostTag {
  postId?: number;
  tagId?: number;
  tag: Tag;
}

interface Post {
  title: string;
  content: string;
  excerpt?: string;
  createdAt: string;
  tags?: PostTag[];
}

export function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `https://aw-portfolio-api.onrender.com/api/posts/${slug}`
        );
        if (!res.ok) {
          throw new Error("Post not found");
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Unable to load post. It may have been removed or moved.");
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl px-4 md:px-8 py-16 font-jost flex justify-center items-center">
        <div className="text-rose-400/70 animate-pulse text-xl font-medium">
          Loading article...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="w-full max-w-4xl px-4 md:px-8 py-12 font-jost animate-fade-in-up">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold mb-6 transition-colors group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Blog
        </Link>
        <Section>
          <div className="text-center py-12 text-blue-50/70">
            <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
            <p className="mb-6">{error || "The post you are looking for does not exist."}</p>
            <Link
              to="/blog"
              className="inline-block bg-white text-gray-900 font-bold px-6 py-2 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-md"
            >
              Explore Blog Posts
            </Link>
          </div>
        </Section>
      </div>
    );
  }

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="w-full max-w-4xl px-4 md:px-8 py-8 font-jost animate-fade-in-up">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold mb-6 transition-colors group text-sm md:text-base"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Blog
      </Link>

      <Section className="bg-gray-900/90 border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
        <header className="mb-8 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {formattedDate && (
              <span className="text-rose-400 text-sm font-semibold tracking-wide uppercase">
                {formattedDate}
              </span>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t.tag.id || t.tag.name}
                    className="bg-white/5 text-white/80 border border-white/10 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {t.tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide font-jost leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="article-body">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2 font-jost">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2 font-jost">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-rose-300 mt-6 mb-3 font-jost">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-white/80 leading-relaxed mb-6 text-base md:text-lg font-jost">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 mb-6 text-white/80 pl-2 font-jost">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 mb-6 text-white/80 pl-2 font-jost">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-rose-500 bg-white/5 pl-4 pr-4 py-3 my-6 italic text-white/90 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <pre className="bg-gray-950 border border-white/10 rounded-xl p-4 my-6 overflow-x-auto text-sm font-mono text-rose-200 shadow-inner">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code
                    className="bg-white/10 text-rose-300 px-1.5 py-0.5 rounded text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-400 hover:text-rose-300 underline underline-offset-4 transition-colors font-medium"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="rounded-xl border border-white/10 shadow-lg max-w-full h-auto my-6 mx-auto"
                />
              ),
              hr: () => <hr className="border-white/10 my-8" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-semibold transition-colors group text-sm md:text-base"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Back to all posts
          </Link>
        </div>
      </Section>
    </div>
  );
}

