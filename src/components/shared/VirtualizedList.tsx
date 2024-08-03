import React, { useCallback, useEffect, useRef, useState } from "react";

const pageSize = 24;
const rootMargin = "500px";

function VirtualizedList<T>({
  items,
  renderItem,
  loadingIndicator,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactElement;
  loadingIndicator: (ref: React.Ref<HTMLDivElement>, visible: boolean) => React.ReactElement;
}) {
  const [visibleItemCount, setVisibleItemCount] = useState(pageSize);
  const loader = useRef<HTMLDivElement>(null);

  const visibleItems = items.slice(0, visibleItemCount);

  const handleObserver = useCallback<IntersectionObserverCallback>(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setVisibleItemCount(visibleItems.length + pageSize);
      }
    },
    [visibleItems.length],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: rootMargin,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <>
      {visibleItems.map((item) => renderItem(item))}
      {loadingIndicator(loader, visibleItems.length !== items.length)}
    </>
  );
}

export default VirtualizedList;
