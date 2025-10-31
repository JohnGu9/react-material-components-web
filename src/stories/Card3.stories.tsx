import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../components3/button/Button';
import { Card } from '../components3/card/Card';

export default {
  component: Card,
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) =>
  <Card {...args}
    media={<img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt='github logo'></img>}
    content={<>
      A card with actions
      <Button buttonStyle="filled">Card action</Button>
    </>} />;

export const Primary = Template.bind({});
Primary.args = {
};

