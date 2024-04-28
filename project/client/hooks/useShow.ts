import { useEffect, useState } from 'react';

/** ctrl
 * q : 채팅  on off
 * w : 이펙트 on off
 * e : all on
 * r : all off
 */

export function useShow() {
  // 객체 하나로 통일?
  const [showChat, setShowChat] = useState(true);
  const [showEffect, setShowEffect] = useState(true);

  useEffect(() => {
    const handleShowState = (e: KeyboardEvent) => {
      const { ctrlKey, key } = e;
      if (ctrlKey) {
        switch (key) {
          case 'q':
          case 'ㅂ':
            setShowChat((prev) => !prev);
            break;
          case 'w':
          case 'ㅈ':
            setShowEffect((prev) => !prev);
            break;
          case 'e':
          case 'ㄷ':
            setShowChat(true);
            setShowEffect(true);
            break;
          case 'r':
          case 'ㄱ':
            setShowChat(false);
            setShowEffect(false);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleShowState);
    return () => {
      document.removeEventListener('keydown', handleShowState);
    };
  }, []);

  return { showChat, showEffect };
}
