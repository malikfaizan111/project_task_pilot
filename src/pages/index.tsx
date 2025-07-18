import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Users, Calendar } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-dashboard-header mb-6">
            Project & Task Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your workflow, track progress, and collaborate effectively with our comprehensive project management dashboard.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/projects">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <CardTitle>Task Management</CardTitle>
              <CardDescription>
                Create, assign, and track tasks with priority levels and due dates
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Assign tasks to team members and track individual progress
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Calendar className="h-12 w-12 text-warning mx-auto mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Visual progress bars and analytics to monitor project status
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Stats */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Active Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">10</div>
                <div className="text-sm text-muted-foreground">Total Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-warning mb-2">6</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-muted-foreground mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
