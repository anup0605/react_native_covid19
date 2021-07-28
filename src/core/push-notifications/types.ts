export interface IPushTokenRemoteClient {
  updatePushToken(pushToken: TPushToken): Promise<any>;
}

export type TPushToken = {
  token: string;
  lastUpdated: string;
  platform: string;
};
