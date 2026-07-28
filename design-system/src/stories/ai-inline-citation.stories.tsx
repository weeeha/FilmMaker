import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationQuote,
  InlineCitationSource,
  InlineCitationText,
} from '@/components/ai-elements/inline-citation'

const meta = {
  title: 'AI/Inline Citation',
  component: InlineCitation,
  tags: ['autodocs'],
} satisfies Meta<typeof InlineCitation>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <p className="w-full max-w-xl text-sm leading-relaxed">
      Design systems reduce duplicated UI work and improve consistency across
      products.{' '}
      <InlineCitation>
        <InlineCitationText>
          Teams using a shared component library ship features up to 30%
          faster.
        </InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger
            sources={['https://ui.shadcn.com', 'https://storybook.js.org']}
          />
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselHeader>
                <InlineCitationCarouselPrev />
                <InlineCitationCarouselIndex />
                <InlineCitationCarouselNext />
              </InlineCitationCarouselHeader>
              <InlineCitationCarouselContent>
                <InlineCitationCarouselItem>
                  <InlineCitationSource
                    title="shadcn/ui"
                    url="https://ui.shadcn.com"
                    description="Beautifully designed components"
                  />
                  <InlineCitationQuote>
                    A set of beautifully designed, accessible components.
                  </InlineCitationQuote>
                </InlineCitationCarouselItem>
                <InlineCitationCarouselItem>
                  <InlineCitationSource
                    title="Storybook"
                    url="https://storybook.js.org"
                    description="Frontend workshop for UI development"
                  />
                </InlineCitationCarouselItem>
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
    </p>
  ),
}
