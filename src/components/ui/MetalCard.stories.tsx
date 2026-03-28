import type { Meta, StoryObj } from '@storybook/react';
import { MetalCard } from './MetalCard';

const meta: Meta<typeof MetalCard> = {
  title: 'UI/MetalCard',
  component: MetalCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    texture: {
      control: 'select',
      options: ['copper', 'aluminium', 'zinc'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetalCard>;

export const Copper: Story = {
  args: {
    name: 'Copper',
    texture: 'copper',
    description:
      'The backbone of global electrification. We source and trade copper cathode and wire rod from established smelters across Europe and Asia, with consistent quality and reliable supply chains.',
  },
};

export const Aluminium: Story = {
  args: {
    name: 'Aluminium',
    texture: 'aluminium',
    description:
      'Essential for aerospace, automotive, and construction industries. Our aluminium trading encompasses primary ingots, billets, and rolled products from certified producers.',
  },
};

export const Zinc: Story = {
  args: {
    name: 'Zinc',
    texture: 'zinc',
    description:
      'Critical for galvanising and die-casting applications. We trade refined zinc ingots and special high-grade zinc with flexible delivery terms to meet your production schedules.',
  },
};

export const AllThreeCards: Story = {
  name: 'All Three — Grid Layout',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 p-8 bg-ivory">
      <MetalCard
        name="Copper"
        texture="copper"
        description="The backbone of global electrification. Consistent quality and reliable supply chains."
      />
      <MetalCard
        name="Aluminium"
        texture="aluminium"
        description="Essential for aerospace, automotive, and construction industries worldwide."
      />
      <MetalCard
        name="Zinc"
        texture="zinc"
        description="Critical for galvanising and die-casting applications across global markets."
      />
    </div>
  ),
};
