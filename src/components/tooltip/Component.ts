import { MDCTooltip } from '@material/tooltip';

export class TooltipComponent extends MDCTooltip {
  constructor(root: Element, anchor: Element) {
    super(root);
    this['anchorElem'] = anchor;
    super.initialSyncWithDOM();
  }

  initialize(): void { }
  initialSyncWithDOM(): void { }

};
