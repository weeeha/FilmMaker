import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps extends React.ComponentProps<typeof Card> {
  label: string
  value: string
  trend?: number
  hint?: string
}

function StatCard({ label, value, trend, hint, className, ...props }: StatCardProps) {
  const isUp = trend !== undefined && trend >= 0
  return (
    <Card className={cn('gap-2', className)} {...props}>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        {trend !== undefined && (
          <CardAction>
            <Badge variant="outline">
              {isUp ? <TrendingUpIcon /> : <TrendingDownIcon />}
              {isUp ? '+' : ''}
              {trend}%
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      {hint && (
        <CardFooter className="text-sm text-muted-foreground">
          {hint}
        </CardFooter>
      )}
    </Card>
  )
}

export { StatCard }
