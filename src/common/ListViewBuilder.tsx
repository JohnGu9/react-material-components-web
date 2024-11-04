import { useRefComposer } from "react-ref-composer";
import { createComponent } from "./Component";
import React from "react";

export type ListViewBuilderProps = {
  childrenBuilder: (paddingStart: number, paddingEnd: number, childrenIndexes: number[]) => React.ReactNode
  itemExtent: number,
  itemCount: number,
  // cacheExtent?: number,
};

export const ListViewBuilder = createComponent<HTMLDivElement, ListViewBuilderProps>(
  function ListViewBuilder({ onScroll, childrenBuilder, itemExtent, itemCount, style, ...props }, ref) {
    const composeRefs = useRefComposer();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const [offset, setOffset] = React.useState({ left: 0, top: 0 });
    const [size, setSize] = React.useState<{ height: number, width: number } | undefined>();
    React.useEffect(() => {
      const current = innerRef.current!;
      const updateSize = () => {
        setSize({ height: current.clientHeight, width: current.clientWidth });
      };
      updateSize();

      const observer = new ResizeObserver(updateSize);
      observer.observe(current);
      return () => observer.disconnect();
    }, []);

    return (
      <div ref={composeRefs(innerRef, ref)}
        onScroll={e => {
          setOffset({ left: e.currentTarget.scrollLeft, top: e.currentTarget.scrollTop })
          onScroll?.(e);
        }}
        style={{ overflow: "scroll", ...style }}
        {...props} >
        {size === undefined
          ? <div style={{ width: window.innerWidth, height: window.innerHeight }} />
          : childrenBuilder(...getArguments(size, offset, itemExtent, itemCount))}
      </div>);
  }
);


function div(y: number, x: number) {
  return { quotient: Math.trunc(y / x), remainder: y % x };
}

function getArguments(size: { height: number, width: number }, offset: { left: number, top: number }, itemExtent: number, itemCount: number): [number, number, number[]] {
  //vertical
  const { quotient: quotientStart } = div(offset.top, itemExtent);
  const startIndex = quotientStart === 0 ? 0 : (quotientStart - 1);
  const paddingStart = startIndex * itemExtent; // also render start position
  const { quotient: quotientEnd, remainder: remainderEnd } = div(offset.top + size.height, itemExtent);
  const targetEndIndex = remainderEnd === 0 ? quotientEnd : (quotientEnd + 1);
  const endIndex = Math.min(targetEndIndex, itemCount - 1);
  const length = endIndex - startIndex + 1;
  const scrollHeight = itemExtent * itemCount;
  const paddingEnd = scrollHeight - paddingStart - length * itemExtent;

  return [paddingStart, paddingEnd, Array.from({ length }, (_, index) => index + startIndex)]
}
