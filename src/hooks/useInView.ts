import {useEffect, useRef, useState} from 'react';

/**
 * Fires once when the element enters the viewport.
 * Falls back to "visible" when IntersectionObserver is unavailable.
 */
export default function useInView<T extends Element>(
  options: IntersectionObserverInit = {threshold: 0.2},
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {ref, inView};
}
