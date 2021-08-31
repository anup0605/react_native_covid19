type TMessageTypes = 'BANNER' | 'DIALOG' | 'SNACKBAR';

export interface IUIAction {
  action: () => void;
  label: string;
}

interface IUIMessageContent {
  title?: string;
  body: string;
}

export interface IUIMessage {
  actions?: IUIAction[];
  messageType: TMessageTypes;
  message: IUIMessageContent;
}
