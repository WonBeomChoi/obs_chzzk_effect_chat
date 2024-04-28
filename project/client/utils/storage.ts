import { DEFAULT_CONFIG } from '../constants/constants';
import { AppConfigs } from '../context/config';

type GetConfigs = () => AppConfigs;

// get localStorage
// useEffect 내부에서 사용
export const getConfig: GetConfigs = () => {
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
  const prevConfig = localStorage.getItem('obs_chzzk');
  const parsedPrevConfig = JSON.parse(prevConfig!);

  localStorage.setItem('obs_chzzk', JSON.stringify({ ...parsedPrevConfig, ...data }));
};
