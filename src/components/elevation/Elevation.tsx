import "@material/elevation/mdc-elevation.scss";
import { classMap, createComponent } from "../../common/Common";

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type ElevationProps = {
  depth?: Range<1, 25>,
  transition?: boolean,
};

export const Elevation = createComponent<HTMLDivElement, ElevationProps>(
  function Elevation({
    depth,
    transition,
    className,
    ...props }, ref) {
    const classes = {
      [`mdc-elevation--z${depth}`]: depth !== undefined,
      'mdc-elevation-transition': transition,
    };
    return <div ref={ref} className={classMap(classes, className)} {...props} />;
  }
);
