import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DoctorsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Doctors Management</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Doctors</CardTitle>
            <CardDescription>Registered medical professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">628</p>
            <p className="text-sm text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Doctors</CardTitle>
            <CardDescription>Currently practicing doctors</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">542</p>
            <p className="text-sm text-muted-foreground">+3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Specialties</CardTitle>
            <CardDescription>Different medical specialties</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-muted-foreground">
              Added 2 new specialties
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Doctor Directory</CardTitle>
          <CardDescription>
            List of registered medical professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-center py-10">
              Doctor data will be displayed here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
