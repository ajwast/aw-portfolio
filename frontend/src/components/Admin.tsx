import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Section } from "./UI/Section";
import { SectionHeading } from "./UI/SectionHeading";

interface AdminProps {
  token: string;
  onLogout: () => void;
}

interface Project {
  projectId: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

interface Tag {
  id: number;
  name: string;
  _count?: {
    posts: number;
    projectTags: number;
  };
}

interface PostTag {
  tag: Tag;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
  createdAt: string;
  tags?: PostTag[];
}

export function Admin({ token, onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "posts" | "tags">("projects");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form states for Post creation
  const [postTitle, setPostTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [postExcerpt, setPostExcerpt] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postPublished, setPostPublished] = useState(true);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  // Form state for Tag creation
  const [newTagName, setNewTagName] = useState("");

  const showNotify = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper for slug generation
  const handleTitleChange = (val: string) => {
    setPostTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setPostSlug(generatedSlug);
  };

  // Fetch functions
  const fetchProjects = async () => {
    try {
      const res = await fetch("https://aw-portfolio-api.onrender.com/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://aw-portfolio-api.onrender.com/api/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch("https://aw-portfolio-api.onrender.com/api/tags");
      if (res.ok) {
        const data = await res.json();
        setTags(Array.isArray(data) ? data : []);
      } else {
        // Fallback endpoint if /api/tags not yet deployed
        const fallbackRes = await fetch("https://aw-portfolio-api.onrender.com/api/posts/tags");
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          setTags(Array.isArray(fallbackData) ? fallbackData : []);
        }
      }
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchProjects(), fetchPosts(), fetchTags()]).finally(() => setIsLoading(false));
  }, []);

  // Handlers for Projects
  const handleProjectSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const image = formData.get("image") as string;

    try {
      const res = await fetch("https://aw-portfolio-api.onrender.com/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, link, image }),
      });

      if (!res.ok) throw new Error("Failed to add project");

      showNotify("Project added successfully!");
      e.currentTarget.reset();
      fetchProjects();
    } catch (err) {
      console.error(err);
      showNotify("Error adding project. Check server auth/network.", "error");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`https://aw-portfolio-api.onrender.com/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete project");
      showNotify("Project deleted successfully");
      fetchProjects();
    } catch (err) {
      console.error(err);
      showNotify("Error deleting project", "error");
    }
  };

  // Handlers for Posts
  const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postTitle || !postSlug || !postContent) {
      showNotify("Please fill in title, slug, and content.", "error");
      return;
    }

    try {
      const res = await fetch("https://aw-portfolio-api.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: postTitle,
          slug: postSlug,
          excerpt: postExcerpt,
          content: postContent,
          published: postPublished,
          tagIds: selectedTagIds,
        }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      showNotify("Blog post published successfully!");
      setPostTitle("");
      setPostSlug("");
      setPostExcerpt("");
      setPostContent("");
      setSelectedTagIds([]);
      fetchPosts();
    } catch (err) {
      console.error(err);
      showNotify("Error creating post. Verify API endpoint/auth.", "error");
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`https://aw-portfolio-api.onrender.com/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete post");
      showNotify("Blog post deleted successfully");
      fetchPosts();
    } catch (err) {
      console.error(err);
      showNotify("Error deleting post", "error");
    }
  };

  // State for Tag Inline Editing
  const [editingTagId, setEditingTagId] = useState<number | null>(null);
  const [editingTagName, setEditingTagName] = useState("");

  // Handlers for Tags
  const handleTagSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      let res = await fetch("https://aw-portfolio-api.onrender.com/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newTagName.trim() }),
      });

      if (!res.ok) {
        // Fallback endpoint
        res = await fetch("https://aw-portfolio-api.onrender.com/api/posts/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newTagName.trim() }),
        });
      }

      if (!res.ok) throw new Error("Failed to create tag");

      showNotify("Tag created successfully!");
      setNewTagName("");
      fetchTags();
    } catch (err) {
      console.error(err);
      showNotify("Error creating tag", "error");
    }
  };

  const handleUpdateTag = async (id: number, name: string) => {
    if (!name.trim()) return;
    try {
      const res = await fetch(`https://aw-portfolio-api.onrender.com/api/tags/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!res.ok) throw new Error("Failed to update tag");

      showNotify("Tag updated successfully!");
      setEditingTagId(null);
      fetchTags();
    } catch (err) {
      console.error(err);
      showNotify("Error updating tag", "error");
    }
  };

  const handleDeleteTag = async (id: number) => {
    if (!confirm("Delete this tag? It will be removed from all associated posts and projects.")) return;
    try {
      let res = await fetch(`https://aw-portfolio-api.onrender.com/api/tags/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // Fallback endpoint
        res = await fetch(`https://aw-portfolio-api.onrender.com/api/posts/tags/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (!res.ok) throw new Error("Failed to delete tag");
      showNotify("Tag deleted successfully");
      fetchTags();
    } catch (err) {
      console.error(err);
      showNotify("Error deleting tag", "error");
    }
  };

  const toggleTagSelection = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <Section className="w-full max-w-7xl mx-auto font-jost">
      {/* Admin Header */}
      <div className="flex flex-wrap justify-between items-center mb-8 border-b border-white/10 pb-4">
        <SectionHeading className="mb-0 border-b-0 pb-0">ADMIN PANEL</SectionHeading>
        <button
          onClick={onLogout}
          className="bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500 hover:text-white px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-md"
        >
          Logout
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`mb-6 p-4 rounded-xl border font-medium text-sm transition-all duration-300 ${
            notification.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 mb-8 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
            activeTab === "projects"
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
            activeTab === "posts"
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          Blog Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("tags")}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
            activeTab === "tags"
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          Tags ({tags.length})
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-8 text-rose-400/70 animate-pulse text-lg">
          Syncing with portfolio server...
        </div>
      )}

      {/* TAB 1: PROJECTS */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Project Form */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3">
              Add New Project
            </h3>
            <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Project Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Deep Steps"
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Short overview of the project..."
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Project Link / URL</label>
                <input
                  type="url"
                  name="link"
                  required
                  placeholder="https://github.com/..."
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Image Asset Name / URL</label>
                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Deep Steps or https://..."
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-white text-gray-900 font-bold py-2.5 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-md uppercase tracking-wider text-xs"
              >
                Add Project
              </button>
            </form>
          </div>

          {/* Project List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Existing Projects</h3>
            {projects.length === 0 ? (
              <div className="text-white/50 italic py-8 text-center bg-white/5 border border-white/10 rounded-2xl">
                No projects added yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.projectId}
                    className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col justify-between hover:bg-white/10 transition-all duration-200"
                  >
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{proj.name}</h4>
                      <p className="text-white/70 text-xs mb-3 line-clamp-2">{proj.description}</p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-2">
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-rose-400 hover:text-rose-300 text-xs font-semibold"
                      >
                        View Link ↗
                      </a>
                      <button
                        onClick={() => handleDeleteProject(proj.projectId)}
                        className="text-rose-400 hover:text-rose-300 text-xs font-medium px-2 py-1 bg-rose-500/10 rounded border border-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BLOG POSTS */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Blog Post Form */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3">
              Create Blog Post
            </h3>
            <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Title</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  placeholder="Title of article..."
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">URL Slug</label>
                <input
                  type="text"
                  value={postSlug}
                  onChange={(e) => setPostSlug(e.target.value)}
                  required
                  placeholder="title-of-article"
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Excerpt (Summary)</label>
                <textarea
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  rows={2}
                  placeholder="Brief 1-2 sentence preview..."
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Content (Markdown)</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  required
                  rows={6}
                  placeholder="# Article Heading&#10;&#10;Write your post using Markdown..."
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm font-mono"
                />
              </div>

              {/* Tag Selector */}
              {tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Select Tags</label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-gray-950/50 rounded-xl border border-white/10 max-h-32 overflow-y-auto">
                    {tags.map((tag) => {
                      const isSelected = selectedTagIds.includes(tag.id);
                      return (
                        <button
                          type="button"
                          key={tag.id}
                          onClick={() => toggleTagSelection(tag.id)}
                          className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 ${
                            isSelected
                              ? "bg-rose-500 text-white border-rose-400"
                              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          {tag.name} {isSelected ? "✓" : "+"}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={postPublished}
                  onChange={(e) => setPostPublished(e.target.checked)}
                  className="rounded border-white/20 text-rose-500 focus:ring-rose-400 h-4 w-4 bg-gray-950"
                />
                <label htmlFor="publishedToggle" className="text-sm font-medium text-white/90 cursor-pointer">
                  Publish Post Immediately
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-white text-gray-900 font-bold py-2.5 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-md uppercase tracking-wider text-xs"
              >
                Create & Save Post
              </button>
            </form>
          </div>

          {/* Posts List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Existing Blog Posts</h3>
            {posts.length === 0 ? (
              <div className="text-white/50 italic py-8 text-center bg-white/5 border border-white/10 rounded-2xl">
                No blog posts created yet.
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/10 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-white text-lg">{p.title}</h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border ${
                            p.published
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          }`}
                        >
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <p className="text-white/50 text-xs font-mono mb-2">/{p.slug}</p>

                      {p.tags && p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.tags.map((t) => (
                            <span
                              key={t.tag.id || t.tag.name}
                              className="bg-white/5 text-white/70 border border-white/10 px-2 py-0.5 rounded-full text-[10px]"
                            >
                              {t.tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                      <a
                        href={`/blog/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-rose-400 hover:text-rose-300 text-xs font-semibold"
                      >
                        Preview ↗
                      </a>
                      <button
                        onClick={() => handleDeletePost(p.id)}
                        className="text-rose-400 hover:text-rose-300 text-xs font-medium px-3 py-1.5 bg-rose-500/10 rounded-lg border border-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TAGS */}
      {activeTab === "tags" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Tag Form */}
          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3">
              Add New Tag
            </h3>
            <form onSubmit={handleTagSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Tag Name</label>
                <input
                  type="text"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  required
                  placeholder="e.g. Audio Programming"
                  className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-white text-gray-900 font-bold py-2.5 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-md uppercase tracking-wider text-xs"
              >
                Add Tag
              </button>
            </form>
          </div>

          {/* Tags Grid */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">System Tags</h3>
            {tags.length === 0 ? (
              <div className="text-white/50 italic py-8 text-center bg-white/5 border border-white/10 rounded-2xl">
                No tags created yet.
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 bg-gray-950/80 border border-white/15 px-3 py-1.5 rounded-full text-sm text-white/90 shadow-sm"
                  >
                    {editingTagId === tag.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={editingTagName}
                          onChange={(e) => setEditingTagName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleUpdateTag(tag.id, editingTagName);
                            if (e.key === "Escape") setEditingTagId(null);
                          }}
                          autoFocus
                          className="bg-gray-900 border border-white/30 text-white text-xs px-2 py-0.5 rounded-full focus:outline-none focus:border-rose-400"
                        />
                        <button
                          onClick={() => handleUpdateTag(tag.id, editingTagName)}
                          title="Save tag name"
                          className="text-emerald-400 hover:text-emerald-300 font-bold text-xs"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => setEditingTagId(null)}
                          title="Cancel editing"
                          className="text-white/50 hover:text-white text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <span>{tag.name}</span>
                        {tag._count?.posts !== undefined && (
                          <span className="text-[10px] bg-white/10 text-white/60 px-1.5 py-0.5 rounded-full">
                            {tag._count.posts} {tag._count.posts === 1 ? "post" : "posts"}
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setEditingTagId(tag.id);
                            setEditingTagName(tag.name);
                          }}
                          title="Edit tag name"
                          className="ml-1 text-white/40 hover:text-white text-xs"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDeleteTag(tag.id)}
                          title="Delete Tag"
                          className="text-rose-400 hover:text-rose-300 font-bold text-xs hover:scale-125 transition-transform"
                        >
                          ×
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
