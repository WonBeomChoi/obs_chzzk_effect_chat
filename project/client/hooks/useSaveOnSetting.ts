import { Dispatch, SetStateAction, useEffect } from 'react';
import { updateConfig } from '../utils/storage';

export default function useSaveOnSetting(setOnSetting: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'k' || e.key === 'ㅏ')) {
        setOnSetting((prev) => {
          updateConfig({
            onSetting: !prev,
          });
          return !prev;
        });
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [setOnSetting]);
}
