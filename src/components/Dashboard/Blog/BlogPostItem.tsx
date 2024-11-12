
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "./types"; 

interface BlogPostItemProps {
  post: BlogPost;
  onDelete: (id: string) => void;
}

const BlogPostItem: React.FC<BlogPostItemProps> = ({ post, onDelete }) => {
  return (
    <div className="p-6 bg-[#0a0a0a] rounded-lg">
      <div className="flex items-start gap-6">
        <div className="flex-1">
          {/* Author Info */}
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-400">{post.author.name}</span>
          </div>

          {/* Post Content */}
          <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
          <p className="text-gray-400 mb-4">{post.subtitle}</p>

          {/* Post Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{post.date}</span>
            <Badge variant="outline" className="text-xs bg-orange-400">
              {post.category}
            </Badge>
          </div>
        </div>

        {/* Post Image */}
        <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-4 border-t border-gray-800 pt-4">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-black">
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-500"
          onClick={() => onDelete(post.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default BlogPostItem;
