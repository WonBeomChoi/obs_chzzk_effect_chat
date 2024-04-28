import { DEFAULT_CONFIG } from '../constants/constants';

// get localStorage
// useEffect 내부에서 사용
export const getConfig = () => {
  const config = localStorage.getItem('obs_chzzk');
  try {
    if (!config) {
      localStorage.setItem('obs_chzzk', JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return JSON.parse(config);
  } catch (e) {
    // parse error
    console.error('error');
    localStorage.setItem('obs_chzzk', JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
};

// set localStorage
// useEffect 내부에서 사용
export const setConfig = (data: any) => {
  localStorage.setItem('obs_chzzk', JSON.stringify(data));
};
