import { useRef, useCallback } from "react";

export const useIntersectionScroll = (
  hasNextPage: boolean,
  fetchCheck: boolean,
  fetchNextPage: () => void,
  itemList: any[]
) => {
  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback(
    (node: HTMLElement) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && fetchCheck && hasNextPage) {
          fetchNextPage();
        }
      });

      if (hasNextPage && node) {
        observer.current.observe(node);
      }
    },
    [itemList, fetchCheck, hasNextPage]
  );

  return lastItemRef;
};
