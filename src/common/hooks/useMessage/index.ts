import { MessageContext } from '@covid/common/providers/message-provider';
import * as React from 'react';

function useMessage() {
  const { message, addMessage, removeMessage } = React.useContext(MessageContext);
  return { addMessage, message, removeMessage };
}

export default useMessage;
