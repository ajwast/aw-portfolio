import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Section } from "../../components/UI/Section";
import { SectionHeading } from "../../components/UI/SectionHeading";

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
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  createdAt: string;
  tags?: PostTag[];
}

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://aw-portfolio-api.onrender.com/api/posts");
        if (!res.ok) {
          throw new Error(`Failed to fetch posts (${res.status})`);
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Could not load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-7xl px-4 md:px-8 py-8 font-jost animate-fade-in-up">
      <Section className="bg-transparent shadow-none p-0 md:p-0 mb-0">
        <SectionHeading>BLOG</SectionHeading>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-rose-400/70 animate-pulse text-xl font-medium">
              Loading blog posts...
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-rose-400/80 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <p className="text-lg">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-blue-50/50 italic bg-gray-900 border border-gray-800 rounded-2xl shadow-lg">
            No blog posts found yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, index) => {
              const formattedDate = post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null;

              return (
                <article
                  key={post.id}
                  className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl hover:border-gray-700 transition-all duration-300 group shadow-lg flex flex-col justify-between animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      {formattedDate && (
                        <span className="text-rose-400 text-sm font-semibold tracking-wide">
                          {formattedDate}
                        </span>
                      )}

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((t) => (
                            <span
                              key={t.tag.id || t.tag.name}
                              className="bg-gray-800 text-blue-50/90 border border-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
                            >
                              {t.tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link to={`/blog/${post.slug}`} className="block group">
                      <h2 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300 mb-3 leading-snug">
                        {post.title}
                      </h2>
                    </Link>

                    {post.excerpt && (
                      <p className="text-blue-50/80 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-800 mt-4">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-rose-400 group-hover:text-rose-300 font-semibold text-sm transition-all duration-300 group-hover:translate-x-1"
                    >
                      Read Post <span className="text-lg">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}

