import { useEffect, useState } from "react";

export function useShow() {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showEffect, setShowEffect] = useState<boolean>(false);

  useEffect(() => {
    const handleShowState: (e: KeyboardEvent) => any = (e) => {
      if (e.ctrlKey && e.key === "q") {
        setShowChat((prev) => !prev);
      }
      if (e.ctrlKey && e.key === "e") {
        setShowEffect((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleShowState);
    return () => {
      document.removeEventListener("keydown", handleShowState);
    };
  }, []);

  return { showChat, showEffect };
}
