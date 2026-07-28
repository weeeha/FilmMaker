import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Design System</CardTitle>
          <CardDescription>
            All shadcn/ui components, documented in Storybook.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Run <code className="rounded bg-muted px-1">npm run storybook</code>{' '}
            to browse the component library.
          </p>
          <Button>Get started</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
