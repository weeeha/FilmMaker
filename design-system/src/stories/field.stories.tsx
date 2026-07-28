import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="field-name">Name</FieldLabel>
            <Input id="field-name" placeholder="Evil Rabbit" />
            <FieldDescription>This appears on invoices.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-about">About</FieldLabel>
            <Textarea id="field-about" placeholder="Tell us about yourself" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-96">
      <Field data-invalid>
        <FieldLabel htmlFor="field-email">Email</FieldLabel>
        <Input id="field-email" aria-invalid defaultValue="not-an-email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  ),
}
