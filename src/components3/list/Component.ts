import { createComponent } from "@lit/react";
import { MdList } from "@material/web/list/list";
import { MdListItem } from "@material/web/list/list-item";
import React from "react";

export const MdListComponent = createComponent({
    tagName: 'md-list',
    elementClass: MdList,
    react: React,
});

export const MdListItemComponent = createComponent({
    tagName: 'md-list-item',
    elementClass: MdListItem,
    react: React,
});
