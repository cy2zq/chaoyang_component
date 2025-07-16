// @flow
import styled from '@emotion/styled';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { divWidth, grid, scrollContainerHeight } from './constants';
import QuoteItem from './quote-item';
import Title from './title';

export const getBackgroundColor = (isDraggingOver, isDraggingFrom) => {
  if (isDraggingOver) {
    return '#ddd';
  }
  if (isDraggingFrom) {
    return 'skyblue';
  }
  return '#e5e5e5';
  return '#f4f4f4';
};

const Wrapper = styled.div`
  background-color: ${(props) => getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: ${(props) => {
    return props.divWidth + 'px';
  }};
`;

const DropZone = styled.div`
  min-height: ${(props) => {
    return props.scrollContainerHeight;
  }};
  padding-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${(props) => {
    return props.scrollContainerHeight;
  }};

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #abaaaa;
    //background-color: red;
    //background-image: -webkit-linear-gradient(
    //  45deg,
    //  hsla(0, 0%, 100%, 0.4) 25%,
    //  transparent 0,
    //  transparent 50%,
    //  hsla(0, 0%, 100%, 0.4) 0,
    //  hsla(0, 0%, 100%, 0.4) 75%,
    //  transparent 0,
    //  transparent
    //);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border: 1px solid transparent;
  }
`;

const Container = styled.div``;
//不可拖拽
const InnerQuoteList = React.memo(function InnerQuoteList(props) {
  return props.quotes?.map((quote, index) => (
    <Draggable
      key={quote.id}
      draggableId={JSON.stringify(quote)}
      // index={JSON.stringify(quote)}
      index={index}
    >
      {(dragProvided, dragSnapshot) => (
        <QuoteItem
          key={quote.id}
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props) {
  const { quotes, dropProvided } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <Container>
      <DropZone ref={dropProvided.innerRef} scrollContainerHeight={scrollContainerHeight}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function QuoteList(props) {
  const {
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    quotes,
    title,
    useClone,
  } = props;
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <QuoteItem
                quote={quotes[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : null
      }
    >
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          divWidth={divWidth}
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer
              scrollContainerHeight={scrollContainerHeight}
              style={scrollContainerStyle}
            >
              <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
            </ScrollContainer>
          ) : (
            <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}
