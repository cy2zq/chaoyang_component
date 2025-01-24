/*
 * @Description: 描述
 * @Author: cy
 * @Date: 2024/5/15
 */
import React from "react";
import styled from "@emotion/styled";
import Column from "./column";
import reorder, { reorderQuoteMap } from "./reorder";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  //background-color: white;
  //min-height: 100vh;
  //min-width: 100vw;
  display: inline-flex;
`;

const Work = (props) => {
  const {
    containerHeight,
    useClone,
    withScrollableColumns,
    setData,
    columnKey,
  } = props;
  let columns = props.initial;
  const onDragEnd = (result) => {
    const source = result.source;
    const destination = result.destination;
    // did not move anywhere - can bail early
    if (
      (source?.droppableId === destination?.droppableId &&
        source?.index === destination?.index) ||
      !destination?.droppableId
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const orData = reorder(props.initial, source.index, destination.index);
      setData(orData);
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
      columnKey,
    });
    setData(data);
  };
  const board = (
    <Droppable droppableId="board" type="COLUMN" direction="horizontal">
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {props.initial?.map((item, index) => (
            <Column
              {...item}
              key={item?.[columnKey]}
              index={index}
              title={item?.name}
              quotes={item?.list}
              isScrollable={withScrollableColumns}
              useClone={useClone}
            />
          ))}
          {provided.placeholder}
          <div style={{ width: 250, paddingTop: 16, marginRight: 16 }}>
            {props.addGroup()}
          </div>
        </Container>
      )}
    </Droppable>
  );
  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        {containerHeight ? (
          <ParentContainer height={containerHeight}>{board}</ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
    </React.Fragment>
  );
};

export default Work;
