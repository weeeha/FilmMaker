import type { Meta, StoryObj } from '@storybook/react-vite'

import { DashboardPage } from '@/prototypes/dashboard-page'
import { LoginPage } from '@/prototypes/login-page'
import { SettingsPage } from '@/prototypes/settings-page'

const meta = {
  title: 'Prototypes',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Dashboard: Story = {
  render: () => <DashboardPage />,
}

export const Login: Story = {
  render: () => <LoginPage />,
}

export const Settings: Story = {
  render: () => <SettingsPage />,
}
