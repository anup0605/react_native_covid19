import appConfig from '@covid/appConfig';
import axios from 'axios';
import moment from 'moment';

const ONLINE_URL = 'https://joinzoe.com/icons/icon-48x48.png';
const API_URL = `${appConfig.apiBase}users/covid_count/`;

const NETWORK_ERROR = 'Network Error';
const TIMEOUT_IN_SECONDS = 5 * 1000;
const REQUEST_OPTS = {
  timeout: TIMEOUT_IN_SECONDS,
  validateStatus: (status: number) => status < 400,
};

const checkOnlineStatus = () => axios.get(ONLINE_URL, REQUEST_OPTS);
const checkApiStatus = () => axios.get(API_URL, REQUEST_OPTS);

const RETRY_DELAY = 5000; // in microseconds

interface IOfflineService {
  isOnline: boolean;
  isApiOnline: boolean;
  lastUpdated: string;
  lastChecked: string;
  checkStatus(): void;
  getRetryDelay(): number;
}

export default class OfflineService implements IOfflineService {
  isOnline: boolean = false;

  isApiOnline: boolean = false;

  lastUpdated: string;

  lastChecked: string;

  updateOnlineStatus = (newStatus: boolean, updateTime: string | null = null) => {
    if (this.isOnline !== newStatus) {
      this.isOnline = newStatus;
      if (updateTime) {
        this.lastUpdated = updateTime;
      }
    }
  };

  updateApiOnlineStatus = (newStatus: boolean, updateTime: string | null = null) => {
    if (this.isApiOnline !== newStatus) {
      this.isApiOnline = newStatus;
      if (updateTime) {
        this.lastUpdated = updateTime;
      }
    }
  };

  async checkStatus() {
    const checkTime = moment().format();
    try {
      await checkOnlineStatus();
      this.updateOnlineStatus(true, checkTime);
    } catch (error) {
      if (error.message === NETWORK_ERROR) {
        this.updateOnlineStatus(false, checkTime);
      }
    }

    try {
      await checkApiStatus();
      this.updateOnlineStatus(true, checkTime);
      this.updateApiOnlineStatus(true, checkTime);
    } catch (error) {
      if (error.message === NETWORK_ERROR) {
        this.updateOnlineStatus(false, checkTime);
      }
      this.updateApiOnlineStatus(false, checkTime);
    }

    this.lastChecked = checkTime;
  }

  getRetryDelay() {
    return RETRY_DELAY;
  }
}
