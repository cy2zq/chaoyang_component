// @flow
import type { DraggableId, DraggableLocation } from "react-beautiful-dnd/types";

export type Id = string;

export type Quote = {|
  id: Id,
  content: string,
  author: Author,
|};

export type QuoteMap = {
  [key: string]: Quote[],
};

