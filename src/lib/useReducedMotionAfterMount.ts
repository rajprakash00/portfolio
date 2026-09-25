import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Reduced motion is only trusted after mount so the server-rendered markup and
 * the first client render agree; reveals then render their static end-state.
 */
export function useReducedMotionAfterMount() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && prefersReducedMotion === true;
}
