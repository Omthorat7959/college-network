import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    postedBy: "Sarah Johnson",
    posted: "2 days ago",
    description: "Looking for experienced engineers to join our core platform team.",
  },
  {
    id: 2,
    title: "Product Design Intern",
    company: "Creative Studio",
    location: "Remote",
    type: "Internship",
    salary: "$25/hour",
    postedBy: "James Wilson",
    posted: "1 week ago",
    description: "Summer internship opportunity for aspiring product designers.",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "AI Labs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80k - $110k",
    postedBy: "Emily Rodriguez",
    posted: "3 days ago",
    description: "Join our data team to help shape the future of AI.",
  },
  {
    id: 4,
    title: "Marketing Manager",
    company: "Brand Co",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$90k - $130k",
    postedBy: "Lisa Anderson",
    posted: "5 days ago",
    description: "Lead marketing initiatives for our growing brand.",
  },
];

const Opportunities = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
            <p className="text-muted-foreground">Explore jobs and internships posted by alumni</p>
          </div>

          <div className="space-y-4">
            {mockJobs.map((job, index) => (
              <Card key={job.id} className="hover:shadow-lg transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="text-base">{job.company}</CardDescription>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{job.description}</p>
                  
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {job.posted}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Posted by {job.postedBy}</p>
                    <Button>
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
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

export default Opportunities;
