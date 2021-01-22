import React, { useEffect, useRef, useState } from "react";

const pageSize = 24;
const rootMargin = "500px";

function VirtualizedList<T>({
  items,
  renderItem,
  loadingIndicator,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactElement;
  loadingIndicator: (
    ref: React.Ref<HTMLDivElement>,
    visible: boolean
  ) => React.ReactElement;
}) {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, pageSize));
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleItems(items.slice(0, pageSize));

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: rootMargin,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [items]);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setVisibleItems((visibleItems) =>
        items.slice(0, visibleItems.length + pageSize)
      );
    }
  };

  return (
    <>
      {visibleItems.map((item) => renderItem(item))}
      {loadingIndicator(loader, visibleItems.length !== items.length)}
    </>
  );
}

export default VirtualizedList;
