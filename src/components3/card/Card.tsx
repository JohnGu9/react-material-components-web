import { createComponent } from "../../common/Component";
import { Card as MdCard } from '@material/web/labs/card/internal/card.js';
import { MdElevatedCardComponent, MdFilledCardComponent, MdOutlinedCardComponent } from "./Component";
import { ReactNode } from "react";
import "./styles.scss";

export type CardProps = {
  media?: ReactNode,
  content?: ReactNode,
  cardStyle?: "elevated" | "filled" | "outlined",
};

function composeProps({ media, content, children, ...props }: { [key: string]: any; }) {
  if (media || content) {
    children = <>
      {media}
      <div className="rmcw-card-content">{content}</div>
    </>;
  }
  return { children, ...props };
}

export const Card = createComponent<MdCard, CardProps>(
  function Card({ cardStyle, ...props }, ref) {
    switch (cardStyle) {
      case "filled":
        return <MdFilledCardComponent key={cardStyle} ref={ref} {...composeProps(props)} />;

      case "outlined":
        return <MdOutlinedCardComponent key={cardStyle} ref={ref} {...composeProps(props)} />;

      default:
        return <MdElevatedCardComponent key={cardStyle} ref={ref} {...composeProps(props)} />;
    }
  }
);
