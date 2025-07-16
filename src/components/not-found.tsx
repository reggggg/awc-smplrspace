// app/components/NotFound.tsx

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen items-center justify-center bg-muted px-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-destructive">404</CardTitle>
          <p className="text-muted-foreground text-sm">Page not found</p>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => navigate({ to: '/' })} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
