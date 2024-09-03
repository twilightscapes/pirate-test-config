import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export const getSiteSettings = async () => {
  return await reader.singletons.siteSettings.read();
};
