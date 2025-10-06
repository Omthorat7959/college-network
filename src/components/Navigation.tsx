import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Home, 
  Users, 
  MessageSquare, 
  Briefcase,
  Calendar,
  User,
  LogOut,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  { id: 1, text: "Sarah Johnson accepted your connection", time: "2 hours ago", unread: true },
  { id: 2, text: "New message from Michael Chen", time: "5 hours ago", unread: true },
  { id: 3, text: "TechConf 2025 registration opens tomorrow", time: "1 day ago", unread: false },
];

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const unreadCount = mockNotifications.filter(n => n.unread).length;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
    });
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/network", label: "Network", icon: Users },
    { path: "/feed", label: "Feed", icon: MessageSquare },
    { path: "/chat", label: "Chat", icon: MessageSquare },
    { path: "/opportunities", label: "Jobs", icon: Briefcase },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2 hover-scale">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block">Alumni Network</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={isActive ? "bg-primary" : ""}
                  >
                    <item.icon className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative ml-2">
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-wine-medium text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-background">
                <div className="p-2">
                  <h3 className="font-semibold mb-2 px-2">Notifications</h3>
                  {mockNotifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex flex-col items-start p-3 cursor-pointer ${
                        notification.unread ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <p className="text-sm flex-1">{notification.text}</p>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-wine-medium rounded-full mt-1 ml-2" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="ml-2"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
