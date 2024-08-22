// @flow
import type { Quote, QuoteMap } from "./types";
import type { DraggableLocation } from "react-beautiful-dnd/types";

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

// type ReorderQuoteMapArgs = {|
//   quoteMap: QuoteMap,
//   source: DraggableLocation,
//   destination: DraggableLocation,
// |};
//
// export type ReorderQuoteMapResult = {|
//   quoteMap: QuoteMap,
// |};

export const reorderQuoteMap = ({
  quoteMap,
  source,
  destination,
  columnKey,
}: any): any => {
  const current: Quote[] = [
    ...quoteMap?.find((item: any) => item?.[columnKey] == source.droppableId)
      ?.list,
  ];
  const next: Quote[] = [
    ...quoteMap?.find(
      (item: any) => item?.[columnKey] == destination.droppableId
    )?.list,
  ];
  const target: Quote = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Quote[] = reorder(
      current,
      source.index,
      destination.index
    );
    const result = quoteMap?.map((item: any) => {
      if (item?.[columnKey] == source.droppableId) {
        return {
          ...item,
          list: reordered,
        };
      }
      return item;
    }) || {
      ...quoteMap,
      [source.droppableId]: reordered,
    };
    return result;
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = quoteMap?.map((item: any) => {
    if (item?.[columnKey] == source.droppableId) {
      return {
        ...item,
        list: current,
      };
    } else if (item?.[columnKey] == destination.droppableId) {
      return {
        ...item,
        list: next,
      };
    }
    return item;
  });
  return result;
};

//新增任务
export const addTask = ({ data, source, value }: any) => {
  return data;
};
