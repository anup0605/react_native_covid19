import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, parse } from 'path';

const JSON_EXT = '.json';
const EMPTY_STRING = '';

const listTranslationFiles = (dir: string): string[] => {
  return readdirSync(dir) || [];
};

const listLocales = (dir: string) => {
  return listTranslationFiles(dir).map((file) => parse(file).name);
};

const flattenKeys = (obj: object, prefix: string = EMPTY_STRING): any => {
  const keys = Object.entries(obj).map((pair: [string, string | object]) => {
    const [key, value] = pair;
    if (typeof value === 'string') {
      return prefix + key;
    }
    if (value instanceof Object) {
      return flattenKeys(value, `${key}.`);
    }
    return prefix + key;
  });
  return keys.flat();
};

export default class Locales {
  localeDir: string;

  locales: object;

  constructor(localeDir: string) {
    if (existsSync(localeDir)) {
      this.localeDir = localeDir;
      this.locales = listLocales(this.localeDir);
    } else {
      throw new Error(`Can't find locale directory: ${localeDir}`);
    }
  }

  private getLocaleFile(locale: string): object {
    const filePath = join(this.localeDir, locale + JSON_EXT);
    return existsSync(filePath) ? JSON.parse(readFileSync(filePath).toString()) : {};
  }

  public getI18nKeys(locale: string) {
    const localeFile = this.getLocaleFile(locale);
    const keys = flattenKeys(localeFile);
    return keys;
  }
}
