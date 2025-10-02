import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Calendar, TrendingUp, MessageSquare, Bell } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserName(session.user.user_metadata.full_name || session.user.email?.split('@')[0] || "User");
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const stats = [
    { label: "Connections", value: "24", icon: Users, color: "bg-wine-medium" },
    { label: "Job Opportunities", value: "8", icon: Briefcase, color: "bg-wine-dark" },
    { label: "Upcoming Events", value: "4", icon: Calendar, color: "bg-secondary" },
  ];

  const recentActivity = [
    { icon: Users, text: "Sarah Johnson accepted your connection", time: "2 hours ago" },
    { icon: MessageSquare, text: "New message from Michael Chen", time: "5 hours ago" },
    { icon: Bell, text: "TechConf 2025 registration opens tomorrow", time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-muted-foreground text-lg">
              Here's what's happening in your network
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="hover-scale cursor-pointer transition-all hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Active this month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Stay updated with your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with these features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => navigate("/network")}
                  className="w-full p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">Find Connections</p>
                      <p className="text-sm text-muted-foreground">Search and connect with alumni</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/opportunities")}
                  className="w-full p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">Browse Jobs</p>
                      <p className="text-sm text-muted-foreground">Explore career opportunities</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/events")}
                  className="w-full p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">View Events</p>
                      <p className="text-sm text-muted-foreground">Join upcoming gatherings</p>
                    </div>
                  </div>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
