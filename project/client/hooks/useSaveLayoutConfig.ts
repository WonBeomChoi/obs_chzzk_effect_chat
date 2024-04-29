import { useEffect } from 'react';
import { useConfigValues } from '../context/config';
import { updateConfig } from '../utils/storage';

function useSaveLayoutConfig(type: 'chat' | 'effect') {
  const { states } = useConfigValues();

  const config = states[type];

  useEffect(() => {
    const handler = () => {
      const newConfig = {
        [type]: config,
      };

      updateConfig(newConfig);
    };

    window.addEventListener('mouseup', handler);
    return () => {
      window.removeEventListener('mouseup', handler);
    };
  }, [config, type]);
}

export default useSaveLayoutConfig;
