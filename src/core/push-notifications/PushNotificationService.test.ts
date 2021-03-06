/* eslint-env jest */

/* eslint-disable max-classes-per-file */

import { IStorageService } from '@covid/core/LocalStorageService';
import moment from 'moment';

import PushNotificationService, { IPushTokenEnvironment } from './PushNotificationService';
import { IPushTokenRemoteClient, TPushToken } from './types';

class MockApiClient implements IPushTokenRemoteClient {
  pushToken: TPushToken;

  updatePushToken(pushToken: TPushToken) {
    this.pushToken = pushToken;
    return Promise.resolve();
  }
}

class MockStorageClient implements IStorageService {
  storage: { [key: string]: any } = {};

  getObject(name: string) {
    return Promise.resolve(this.storage[name]);
  }

  setObject<T>(name: string, value: T) {
    this.storage[name] = value as T;
    return Promise.resolve();
  }
}

class MockPushTokenEnvironment implements IPushTokenEnvironment {
  async getPushToken(): Promise<string | null> {
    return 'MOCK';
  }

  isGranted(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe('PushNotificationService', () => {
  it('can get instance', () => {
    const service = new PushNotificationService(
      new MockApiClient(),
      new MockStorageClient(),
      new MockPushTokenEnvironment(),
    );
    expect(service).not.toBeNull();
  });

  it('can call tokenNeedsRefreshing', () => {
    const service = new PushNotificationService(
      new MockApiClient(),
      new MockStorageClient(),
      new MockPushTokenEnvironment(),
    );

    const tokenFromThirtyDaysAgo = {
      lastUpdated: moment().subtract(30, 'days').toISOString(),
      platform: 'iOS',
      token: 'MOCK',
    } as TPushToken;

    const tokenFromFiveDaysAgo = {
      lastUpdated: moment().subtract(5, 'days').toISOString(),
      platform: 'iOS',
      token: 'MOCK',
    } as TPushToken;

    const tokenFromTheFuture = {
      lastUpdated: moment().add(1, 'days').toISOString(),
      platform: 'iOS',
      token: 'MOCK',
    } as TPushToken;

    // @ts-ignore
    expect(service.tokenNeedsRefreshing(tokenFromThirtyDaysAgo)).toBeTruthy();

    // @ts-ignore
    expect(service.tokenNeedsRefreshing(tokenFromFiveDaysAgo)).toBeTruthy();

    // @ts-ignore
    expect(service.tokenNeedsRefreshing(tokenFromTheFuture)).toBeFalsy();
  });
});
