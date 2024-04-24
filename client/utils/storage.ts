import { DEFAULT_CONFIG } from "../constants/constants";

export const getConfig = () => {
  const config = localStorage.getItem("obs_chzzk");
  try {
    if (!config) {
      localStorage.setItem("obs_chzzk", JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    return JSON.parse(config);
  } catch (e) {
    console.error("error");
    localStorage.setItem("obs_chzzk", JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
};

export const setConfig = (data: any) => {
  localStorage.setItem("obs_chzzk", JSON.stringify(data));
};
