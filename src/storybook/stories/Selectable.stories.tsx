import { Selectable } from '@covid/components/inputs/Selectable';
import { PaddingView } from '@covid/storybook/decorator';
import { action, HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import * as React from 'react';
import { Button, View } from 'react-native';

const items: any[] = [];

const ValueChangeHandler = (): HandlerFunction => action('selectable-item-selected');

const Toggleable: React.FC = () => {
  const [show, setShow] = React.useState<boolean>(true);
  return (
    <View>
      <Button
        onPress={() => {
          setShow(!show);
        }}
        title="Toggle"
      />
      <Selectable items={items} onSelected={ValueChangeHandler} />
    </View>
  );
};

storiesOf('Selectable', module)
  .addDecorator(PaddingView)
  .add('default view', () => <Toggleable />);
