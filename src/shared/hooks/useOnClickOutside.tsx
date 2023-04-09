import { RefObject, useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  dependencies: any[] = [],
  condition: boolean = false
): void {
  useEffect(() => {
    if (condition) return;

    const onDocumentClick = (event: MouseEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
export default useOnClickOutside;
