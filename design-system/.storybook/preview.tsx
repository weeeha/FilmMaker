import type { Preview } from '@storybook/react-vite'

import { TooltipProvider } from '../src/components/ui/tooltip'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    // center every story on the canvas; stories may still override
    // (Prototypes/Sidebar use 'fullscreen', Basics galleries use 'padded')
    layout: 'centered',

    options: {
      storySort: {
        order: ['Prototypes', 'Basics', 'Components', 'AI', 'AI New'],
      },
    },

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
