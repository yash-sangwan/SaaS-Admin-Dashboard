// pages/BlogPage.tsx

"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import BlogPostItem from "@/components/Dashboard/Blog/BlogPostItem";
import Filters from "@/components/Dashboard/Blog/Filters";
import { BlogPost } from "./types"; // Adjust the import path as needed

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "How to Optimize Your Website Performance",
      subtitle:
        "A comprehensive guide to improving your website speed and user experience",
      content: "Performance optimization is crucial for any modern website...",
      date: "2024-01-15",
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg",
        initials: "JD",
      },
      category: "Technical",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "The Future of Web Development",
      subtitle: "Exploring upcoming trends and technologies in web development",
      content: "As we move forward, new technologies are shaping the future...",
      date: "2024-01-10",
      author: {
        name: "Jane Smith",
        avatar: "/placeholder.svg",
        initials: "JS",
      },
      category: "Industry",
      image: "/placeholder.svg?height=400&width=600",
    },

  ]); 

  const [filters, setFilters] = useState({
    author: "all",
    category: "all",
    date: "all",
  });

  const [date, setDate] = useState<Date | undefined>();

  const handleDelete = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return (
        (filters.author === "all" || post.author.name === filters.author) &&
        (filters.category === "all" || post.category === filters.category) &&
        (filters.date === "all" || post.date === filters.date)
      );
    });
  }, [posts, filters]);

  const uniqueAuthors = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.author.name)));
  }, [posts]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(posts.map((post) => post.category)));
  }, [posts]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        {/* Header with New Post Button */}
        <div className="flex justify-between items-center p-6 flex-shrink-0">
          <h1 className="text-2xl font-bold text-white">Existing Blogs</h1>
          <Link href="/dashboard/web/blog/new-story">
            <Button className="bg-black hover:bg-white hover:text-black text-white">
              <NotebookPen className="h-4 w-4" />
              <span> New Post</span>
            </Button>
          </Link>
        </div>

        {/* Blog Posts List */}
        <div className="flex-1 overflow-auto px-6 pb-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredPosts.map((post) => (
              <BlogPostItem key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <div className="w-80 flex-shrink-0 overflow-y-auto ">
        <div className="sticky top-0">
          <Filters
            filters={filters}
            setFilters={setFilters}
            uniqueAuthors={uniqueAuthors}
            uniqueCategories={uniqueCategories}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>
    </div>
  );
}
