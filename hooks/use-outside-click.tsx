import { useEffect } from "react";
import type { RefObject } from "react";

// eslint-disable-next-line no-unused-vars -- event type is part of the callback contract.
type OutsideClickCallback = (event: MouseEvent | TouchEvent) => void;

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  callback: OutsideClickCallback,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent): void => {
      const target = event.target;

      if (!ref.current) {
        return;
      }

      if (!target || !(target instanceof Node)) {
        return;
      }

      // DO NOTHING if the element being clicked is the target element or their children
      if (ref.current.contains(target)) {
        return;
      }

      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
