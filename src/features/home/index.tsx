import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Base React Project</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A scalable React application with feature-based architecture
        </p>
      </div>

      <div className="grid max-w-2xl gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shared Components</CardTitle>
            <CardDescription>Reusable UI components and utilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>View Components</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Modules</CardTitle>
            <CardDescription>Independent feature-based architecture</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Explore Features</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}