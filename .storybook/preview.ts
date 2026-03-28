import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'ivory',
      values: [
        { name: 'ivory', value: '#F5F0E8' },
        { name: 'navy', value: '#0A1628' },
        { name: 'warm-white', value: '#FAF8F4' },
        { name: 'charcoal', value: '#1C1C1C' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
