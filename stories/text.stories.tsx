import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../src/index';

const meta: Meta<typeof Text> = {
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {};
