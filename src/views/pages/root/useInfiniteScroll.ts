import { useEffect, useRef, useCallback } from 'react';
import { throttle } from 'lodash';
interface UseInfiniteScrollProps {
  fetchMore: () => void;
  hasMore: boolean;
  threshold?: number;
  rootMargin?: string;
  throttleMs?: number;
}

const throttledCallback = throttle((hasMore: boolean, fetchMore: () => void) => {
  if (hasMore) {
    console.log('throttledCallback');
    fetchMore();
  }
}, 500);

export const useInfiniteScroll = ({ fetchMore, hasMore, threshold = 1, rootMargin = '0px', throttleMs = 500 }: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const throttledFetchMore = useCallback(throttledCallback, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore) {
        throttledFetchMore(hasMore, fetchMore);
      }
    },
    [throttledFetchMore, hasMore, fetchMore]
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: threshold, rootMargin: rootMargin };

    const observer = new IntersectionObserver(handleObserver, option);

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  return observerRef;
};
