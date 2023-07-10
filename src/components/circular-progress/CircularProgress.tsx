import "@material/circular-progress/mdc-circular-progress.scss";
import { classMap, createComponent } from "../common/Common";

type SizingProperties = {
  size: number,
  strokeDasharray: number,
  strokeWidth: number,
  gapPatchStrokeWidth: number,
  r: number,
  c: number,
};
type Sizing = 'Large' | 'Medium' | 'Small' | SizingProperties;

export type CircularProgressProps = {
  progress?: number, // 0 ~ 1
  closed?: boolean,
  sizing?: Sizing,
};

export const CircularProgress = createComponent<HTMLDivElement, CircularProgressProps>(
  function CircularProgress({
    sizing = 'Large',
    progress,
    closed,
    className,
    children,
    style,
    ...props }, ref) {
    const classes = {
      'mdc-circular-progress': true,
      'mdc-circular-progress--closed': closed,
      'mdc-circular-progress--indeterminate': progress === undefined,
    };

    const { size, strokeDasharray, strokeWidth, gapPatchStrokeWidth, r, c } = getSizingProperties(sizing);
    const halfStrokeDasharray = strokeDasharray / 2;
    const unfilledArcLength = progress ? (1 - progress) * (2 * Math.PI * r) : strokeDasharray;
    return <div className={classMap(classes, className)}
      style={{ width: size, height: size, ...style }} role="progressbar"
      aria-valuemin={0} aria-valuemax={1} aria-valuenow={progress}
      aria-hidden={closed} ref={ref} {...props}>
      <div className="mdc-circular-progress__determinate-container" aria-hidden>
        <svg className="mdc-circular-progress__determinate-circle-graphic" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
          <circle className="mdc-circular-progress__determinate-track" cx={c} cy={c} r={r} strokeWidth={strokeWidth} />
          <circle className="mdc-circular-progress__determinate-circle" cx={c} cy={c} r={r} strokeDasharray={strokeDasharray} strokeDashoffset={unfilledArcLength} strokeWidth={strokeWidth} />
        </svg>
      </div>
      <div className="mdc-circular-progress__indeterminate-container" aria-hidden>
        <div className="mdc-circular-progress__spinner-layer">
          <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
            <svg className="mdc-circular-progress__indeterminate-circle-graphic" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
              <circle cx={c} cy={c} r={r} strokeDasharray={strokeDasharray} strokeDashoffset={halfStrokeDasharray} strokeWidth={strokeWidth} />
            </svg>
          </div>
          <div className="mdc-circular-progress__gap-patch">
            <svg className="mdc-circular-progress__indeterminate-circle-graphic" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
              <circle cx={c} cy={c} r={r} strokeDasharray={strokeDasharray} strokeDashoffset={halfStrokeDasharray} strokeWidth={gapPatchStrokeWidth} />
            </svg>
          </div>
          <div className="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
            <svg className="mdc-circular-progress__indeterminate-circle-graphic" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
              <circle cx={c} cy={c} r={r} strokeDasharray={strokeDasharray} strokeDashoffset={halfStrokeDasharray} strokeWidth={strokeWidth} />
            </svg>
          </div>
        </div>
      </div>
      {children}
    </div>;
  });

function getSizingProperties(sizing: Sizing): SizingProperties {
  switch (sizing) {
    case 'Large':
      return {
        size: 48,
        strokeDasharray: 113.097,
        strokeWidth: 4,
        gapPatchStrokeWidth: 3.2,
        r: 18,
        c: 24,
      };
    case 'Medium':
      return {
        size: 32,
        strokeDasharray: 78.54,
        strokeWidth: 3,
        gapPatchStrokeWidth: 2.4,
        r: 12.5,
        c: 16,
      };
    case 'Small':
      return {
        size: 24,
        strokeDasharray: 54.978,
        strokeWidth: 2.5,
        gapPatchStrokeWidth: 2,
        r: 8.75,
        c: 12,
      };
  }
  return sizing;
}
