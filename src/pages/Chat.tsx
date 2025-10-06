import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, MoreVertical } from "lucide-react";

const mockChats = [
  { id: 1, name: "Sarah Johnson", lastMessage: "Thanks for connecting!", time: "2m ago", unread: 2, online: true },
  { id: 2, name: "Michael Chen", lastMessage: "Let's schedule a call", time: "1h ago", unread: 0, online: true },
  { id: 3, name: "Emily Rodriguez", lastMessage: "Check out this opportunity", time: "3h ago", unread: 1, online: false },
  { id: 4, name: "James Wilson", lastMessage: "Great meeting you at the event", time: "1d ago", unread: 0, online: false },
];

const mockMessages = [
  { id: 1, sender: "Sarah Johnson", text: "Hi! Thanks for accepting my connection request.", time: "10:30 AM", isMine: false },
  { id: 2, sender: "You", text: "Happy to connect! I saw your work at Tech Corp.", time: "10:32 AM", isMine: true },
  { id: 3, sender: "Sarah Johnson", text: "Thanks for connecting!", time: "10:35 AM", isMine: false },
  { id: 4, sender: "You", text: "Would love to learn more about your experience there.", time: "10:36 AM", isMine: true },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("");
  };

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">Chat with alumni and students</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat List */}
            <Card className="lg:col-span-1 animate-fade-in">
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  {filteredChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full p-4 border-b hover:bg-muted/50 transition-colors text-left ${
                        selectedChat.id === chat.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(chat.name)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-medium truncate">{chat.name}</p>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(selectedChat.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedChat.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedChat.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <ScrollArea className="h-[480px] p-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[70%] ${message.isMine ? "order-2" : "order-1"}`}>
                          <div
                            className={`rounded-lg p-3 ${
                              message.isMine
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 px-1">
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && newMessage.trim()) {
                          setNewMessage("");
                        }
                      }}
                    />
                    <Button size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
