import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockEvents = [
  {
    id: 1,
    title: "Annual Alumni Reunion 2025",
    date: "June 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "University Campus, Main Hall",
    attendees: 150,
    description: "Join us for our biggest reunion yet! Reconnect with classmates, enjoy food and drinks, and celebrate our shared experiences.",
    category: "Reunion"
  },
  {
    id: 2,
    title: "Career Networking Mixer",
    date: "May 20, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Downtown Conference Center",
    attendees: 75,
    description: "Network with alumni from various industries. Perfect opportunity to explore new career paths and make meaningful connections.",
    category: "Networking"
  },
  {
    id: 3,
    title: "Tech Talk: AI in 2025",
    date: "May 5, 2025",
    time: "12:00 PM - 1:30 PM",
    location: "Virtual Event (Zoom)",
    attendees: 200,
    description: "Leading alumni experts discuss the latest trends in artificial intelligence and machine learning.",
    category: "Workshop"
  },
  {
    id: 4,
    title: "Spring Sports Day",
    date: "April 28, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "University Sports Complex",
    attendees: 120,
    description: "A fun-filled day of sports activities, competitions, and team building. All skill levels welcome!",
    category: "Social"
  },
];

const Events = () => {
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('registeredEvents');
    if (saved) {
      setRegisteredEvents(JSON.parse(saved));
    }
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Reunion": "bg-wine-medium",
      "Networking": "bg-wine-dark",
      "Workshop": "bg-secondary",
      "Social": "bg-accent"
    };
    return colors[category] || "bg-primary";
  };

  const handleRegister = (eventId: number, eventTitle: string) => {
    if (registeredEvents.includes(eventId)) {
      const updated = registeredEvents.filter(id => id !== eventId);
      setRegisteredEvents(updated);
      localStorage.setItem('registeredEvents', JSON.stringify(updated));
      toast({
        title: "Registration cancelled",
        description: `You've unregistered from ${eventTitle}`,
      });
    } else {
      const updated = [...registeredEvents, eventId];
      setRegisteredEvents(updated);
      localStorage.setItem('registeredEvents', JSON.stringify(updated));
      
      // Add notification
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.unshift({
        id: Date.now(),
        text: `Registered for ${eventTitle}`,
        time: 'Just now',
        read: false
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
      
      toast({
        title: "Registered successfully!",
        description: `You're registered for ${eventTitle}`,
      });
    }
  };

  const isRegistered = (eventId: number) => registeredEvents.includes(eventId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
            <p className="text-muted-foreground">Join alumni gatherings and college events</p>
          </div>

          <div className="space-y-4">
            {mockEvents.map((event, index) => (
              <Card key={event.id} className="hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-lg ${getCategoryColor(event.category)} flex items-center justify-center`}>
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                          <CardDescription className="text-base flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4" />
                            {event.date} • {event.time}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                    <Badge className={getCategoryColor(event.category) + " text-white"}>
                      {event.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{event.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {event.attendees} attending
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="flex-1"
                      onClick={() => handleRegister(event.id, event.title)}
                      variant={isRegistered(event.id) ? "outline" : "default"}
                    >
                      {isRegistered(event.id) ? "Registered ✓" : "Register Now"}
                    </Button>
                    <Button variant="outline">Learn More</Button>
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

export default Events;
