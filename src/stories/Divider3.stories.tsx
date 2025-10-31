import { Meta, StoryFn } from '@storybook/react-vite';
import { Divider } from '../components3/divider/Divider';

export default {
  component: Divider,
  argTypes: {
    inset: {
      options: [true, false, "start", "end"],
      control: { type: 'radio' },
    }
  },
} as Meta<typeof Divider>;

const Template: StoryFn<typeof Divider> = (args) =>
  <section>
    <p>Lorem ipsum...</p>
    <Divider {...args}></Divider>
    <p>Lorem ipsum...</p>
  </section>;

export const Primary = Template.bind({});
Primary.args = {
  inset: true
};
