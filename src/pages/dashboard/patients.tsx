import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PatientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Patients Management</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Patients</CardTitle>
            <CardDescription>Overview of registered patients</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5,248</p>
            <p className="text-sm text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Patients</CardTitle>
            <CardDescription>Patients registered this week</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">124</p>
            <p className="text-sm text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Consultations</CardTitle>
            <CardDescription>Ongoing patient consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">328</p>
            <p className="text-sm text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Patients</CardTitle>
          <CardDescription>
            List of recently registered patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-center py-10">
              Patient data will be displayed here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
