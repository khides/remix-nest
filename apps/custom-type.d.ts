// slate
import { Descendant, BaseEditor, BaseRange, Range, Element } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
export interface Alignable {
  uid?: string;
  align?: string;
  indent?: number;
}

export type BlockQuoteElement = Alignable & {
  type: "block-quote";
  align?: string;
  children: Descendant[];
};

export type BulletedListElement = Alignable & {
  type: "bulleted-list";
  align?: string;
  children: Descendant[];
};

export type CheckListItemElement = Alignable & {
  type: "check-list-item";
  checked?: boolean;
  children: Descendant[];
};

export type EditableVoidElement = Alignable & {
  type: "editable-void";
  children: EmptyText[];
};

export type HeadingElement = Alignable & {
  type: "heading1";
  align?: string;
  children: Descendant[];
};

export type HeadingTwoElement = Alignable & {
  type: "heading2";
  align?: string;
  children: Descendant[];
};
export type HeadingThreeElement = Alignable & {
  type: "heading3";
  align?: string;
  children: Descendant[];
};
export type ImageElement = Alignable & {
  type: "image";
  url: string;
  children: EmptyText[];
};

export type LinkElement = Alignable & {
  type: "link";
  url: string;
  children: Descendant[];
};

export type ButtonElement = Alignable & {
  type: "button";
  children: Descendant[];
};

export type BadgeElement = Alignable & {
  type: "badge";
  children: Descendant[];
};

export type ListItemElement = Alignable & {
  type: "list-item";
  children: Descendant[];
};

export type NumberedListElement = Alignable & {
  type: "numbered-list";
  start?: number;
  children: Descendant[];
};

export type MentionElement = Alignable & {
  type: "mention";
  character: string;
  children: CustomText[];
};

export type ParagraphElement = Alignable & {
  type: "paragraph";
  align?: string;
  children: Descendant[];
};

export type TableElement = Alignable & {
  type: "table";
  children: TableRow[];
};

export type TableCellElement = Alignable & {
  type: "table-cell";
  children: CustomText[];
};

export type TableRowElement = Alignable & {
  type: "table-row";
  children: TableCell[];
};

export type TitleElement = Alignable & {
  type: "title";
  children: Descendant[];
};

export type VideoElement = Alignable & {
  type: "video";
  url: string;
  children: EmptyText[];
};

export type CodeBlockElement = Alignable & {
  type: "code-block";
  language: string;
  children: Descendant[];
};

export type CodeLineElement = Alignable & {
  type: "code-line";
  children: Descendant[];
};

type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | ListItemElement
  | NumberedListElement
  | MentionElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | CodeBlockElement
  | CodeLineElement;

export type ElementType = CustomElement["type"];

export type CustomText = {
  uid?: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
  underline?: boolean;
  strikethrough?: boolean;
  link?: boolean;
  url?: string;
  highlight?: boolean;
  color?: string;
  type?: string;
};

export type EmptyText = {
  uid?: string;
  text: string;
  bold?: booleam;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  link?: boolean;
  url?: string;
  highlight?: boolean;
  color?: string;
  type?: string;
};
export type TextType = keyof CustomText | keyof EmptyText;

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
  };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}
