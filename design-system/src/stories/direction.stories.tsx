import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import { DirectionProvider } from '@/components/ui/direction'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const meta = {
  title: 'Components/Direction',
  component: DirectionProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj

export const RightToLeft: Story = {
  render: () => (
    <DirectionProvider dir="rtl">
      <div dir="rtl" className="w-80 space-y-4 rounded-lg border p-4">
        <p className="text-sm">هذا مثال على واجهة من اليمين إلى اليسار.</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">افتح القائمة</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
            <DropdownMenuItem>الإعدادات</DropdownMenuItem>
            <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DirectionProvider>
  ),
}
