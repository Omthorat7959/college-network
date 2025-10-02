import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPosts = [
  {
    id: 1,
    author: "Sarah Johnson",
    role: "Software Engineer at Tech Corp",
    content: "Excited to share that I'll be speaking at TechConf 2025! Would love to see fellow alumni there. #TechConf #AlumniNetwork",
    likes: 24,
    comments: 5,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    author: "Michael Chen",
    role: "Product Manager at StartUp Inc",
    content: "Just launched our new product! Thanks to all the alumni who provided feedback during beta testing. Your insights were invaluable! 🚀",
    likes: 45,
    comments: 12,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    role: "Data Scientist at AI Labs",
    content: "Looking for talented graduates interested in machine learning. We have multiple openings at AI Labs. DM me for details!",
    likes: 38,
    comments: 8,
    timestamp: "1 day ago"
  },
];

const Feed = () => {
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  const handlePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Error",
        description: "Post cannot be empty",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your post has been shared!",
    });
    setNewPost("");
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Feed</h1>
            <p className="text-muted-foreground">Share updates and engage with your network</p>
          </div>

          {/* Create Post */}
          <Card className="mb-6 animate-fade-in">
            <CardHeader>
              <CardTitle>Share an update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handlePost}>
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {mockPosts.map((post, index) => (
              <Card key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 bg-gradient-accent">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(post.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{post.author}</CardTitle>
                      <CardDescription className="text-sm">{post.role}</CardDescription>
                      <CardDescription className="text-xs mt-1">{post.timestamp}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{post.content}</p>
                  
                  <div className="flex items-center gap-6 pt-2 border-t">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;
