import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Calendar, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <p className="text-muted-foreground">
        Welcome to the Rush Health admin dashboard.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Patients</CardTitle>
            <CardDescription>All registered patients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">5,248</p>
            <Link to="/dashboard/patients">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                <span>View Patients</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
            <CardDescription>Current subscription plans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">3,742</p>
            <Link to="/dashboard/subscriptions">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Manage Subscriptions</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Professionals</CardTitle>
            <CardDescription>Registered doctors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">628</p>
            <Link to="/dashboard/doctors">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                <span>View Doctors</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions from the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-center py-10">
              Activity data will be displayed here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
