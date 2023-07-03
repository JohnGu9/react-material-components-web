import { AnimatedSizeBuilder } from "animated-size";
import React from "react";
import { useRefComposer } from "react-ref-composer";
import { createComponent, isDefined, useClassInjector } from "../common/Common";
import { RippleComponent } from "../ripple/RippleComponent";
import { Icon } from "../icon/Icon";
import styles from "./style.module.scss";
import "./style.scss";

export type ListItemProps = {
  graphic?: React.ReactNode,
  graphicSize?: 'small' | 'medium' | 'large',
  primaryText?: React.ReactNode,
  secondaryText?: React.ReactNode,
  meta?: React.ReactNode,
  disabled?: boolean,
  selected?: boolean,
  activated?: boolean,
  nonInteractive?: boolean,
  expanded?: boolean,
};

export const ListItem = createComponent<HTMLLIElement, ListItemProps>(
  function ListItem(props, ref) {
    if (isDefined(props.children))
      return <NestedListItem props={props} forwardRef={ref} />;
    else
      return <SimpleListItem props={props} forwardRef={ref} />;
  }
);

function SimpleListItem({ props: {
  graphic,
  graphicSize = 'small',
  primaryText,
  secondaryText,
  meta,
  selected = false,
  activated = false,
  nonInteractive = false,
  expanded,
  className,
  style,
  children,
  ...props
}, forwardRef }: { props: React.ComponentPropsWithoutRef<typeof ListItem>, forwardRef: React.ForwardedRef<HTMLLIElement> }) {
  const innerRef = React.useRef<HTMLLIElement>(null);
  const injector = useClassInjector(innerRef);
  const composeRefs = useRefComposer();

  injector.with('mdc-deprecated-list-item', true);
  injector.with('mdc-deprecated-list-item--disabled', props.disabled ?? false);
  injector.with('mdc-deprecated-list-item--selected', selected);
  injector.with('mdc-deprecated-list-item--activated', activated);
  injector.with('mdc-deprecated-list-item--non-interactive', nonInteractive);
  injector.withClassName('0', className);

  React.useEffect(() => {
    if (!nonInteractive) {
      const component = new RippleComponent(innerRef.current!, injector);
      component.init();
      return () => component.destroy();
    }
  }, [injector, nonInteractive]);

  return (
    <li ref={composeRefs(innerRef, forwardRef)}
      className={injector.toClassName()}
      tabIndex={props.disabled ? -1 : 0}
      data-graphic-size={graphicSize}
      data-lines={isDefined(secondaryText) ? '2' : '1'}
      {...props}>
      {!nonInteractive ? <span className="mdc-deprecated-list-item__ripple"></span> : undefined}
      {isDefined(graphic)
        ? <span className="mdc-deprecated-list-item__graphic">
          {graphic}
        </span>
        : undefined}
      <span className="mdc-deprecated-list-item__text">
        {isDefined(secondaryText)
          ? <>
            <span className="mdc-deprecated-list-item__primary-text">{primaryText}</span>
            <span className="mdc-deprecated-list-item__secondary-text">{secondaryText}</span>
          </>
          : primaryText}
      </span>
      {isDefined(meta)
        ? <span className="mdc-deprecated-list-item__meta">
          {meta}
        </span>
        : undefined}
    </li>
  );
}

function NestedListItem({ props: {
  graphic,
  graphicSize = 'small',
  primaryText,
  secondaryText,
  meta,
  selected = false,
  activated = false,
  expanded,
  nonInteractive = false,
  className,
  style,
  children,
  ...props
}, forwardRef }: { props: React.ComponentPropsWithoutRef<typeof ListItem>, forwardRef: React.ForwardedRef<HTMLLIElement> }) {
  const innerRef = React.useRef<HTMLLIElement>(null);
  const injector = useClassInjector(innerRef);
  const [opened, setOpened] = React.useState(true);
  const composeRefs = useRefComposer();

  injector.with('mdc-deprecated-list-item', true);
  injector.with('mdc-deprecated-list-item--disabled', props.disabled ?? false);
  injector.with('mdc-deprecated-list-item--selected', selected);
  injector.with('mdc-deprecated-list-item--activated', activated);
  injector.with('mdc-deprecated-list-item--non-interactive', nonInteractive);
  injector.withClassName('0', className);

  React.useEffect(() => {
    const component = new RippleComponent(innerRef.current!, injector);
    component.init();
    return () => component.destroy();
  }, [injector]);

  expanded ??= opened;
  meta ??= <Icon className={expanded ? styles['nested-open-icon'] : styles['nested-close-icon']}>chevron_right</Icon>;

  return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <div className="mdc-deprecated-list-item__wrapper"
      role="presentation"
      aria-expanded={expanded}>
      <li ref={composeRefs(innerRef, forwardRef)}
        onClick={e => { setOpened(!expanded) }}
        className={injector.toClassName()}
        tabIndex={props.disabled ? -1 : 0}
        data-graphic-size={graphicSize}
        data-lines={isDefined(secondaryText) ? '2' : '1'}
        {...props}>
        {!nonInteractive ? <span className="mdc-deprecated-list-item__ripple"></span> : undefined}
        {isDefined(graphic)
          ? <span className="mdc-deprecated-list-item__graphic">
            {graphic}
          </span>
          : undefined}
        <span className="mdc-deprecated-list-item__text">
          {isDefined(secondaryText)
            ? <>
              <span className="mdc-deprecated-list-item__primary-text">{primaryText}</span>
              <span className="mdc-deprecated-list-item__secondary-text">{secondaryText}</span>
            </>
            : primaryText}
        </span>
        <span className="mdc-deprecated-list-item__meta">
          {meta}
        </span>
      </li>
      <AnimatedSizeBuilder
        heightFactor={expanded ? {} : { size: 0 }}
        axisDirection="column"
        mainAxisPosition="end"
        crossAxisPosition="stretch"
        style={{ display: 'flex' }}
        builder={ref =>
          <span ref={ref}
            className={expanded ? styles['nested-open'] : styles['nested-close']}>
            {children}
          </span>} />
    </div>
  );
}
