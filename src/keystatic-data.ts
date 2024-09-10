import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

const reader = typeof process !== 'undefined' 
  ? createReader(process.cwd(), keystaticConfig)
  : createReader('', keystaticConfig);

export const getSiteSettings = async () => {
  return await reader.singletons.siteSettings.read();
};