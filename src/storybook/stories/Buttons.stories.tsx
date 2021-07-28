import { BrandedButton } from '@covid/components';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';

const Handler = (): HandlerFunction => action('on-pressed');

const Story = 'buttons';

storiesOf(Story, module).add('Branded', () => <BrandedButton onPress={Handler()}>Hello</BrandedButton>);
