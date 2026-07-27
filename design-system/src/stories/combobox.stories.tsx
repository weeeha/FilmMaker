import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <Combobox items={fruits}>
        <ComboboxInput placeholder="Search fruit..." />
        <ComboboxContent>
          <ComboboxEmpty>No fruit found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
}
