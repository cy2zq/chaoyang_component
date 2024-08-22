import styled from '@emotion/styled';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Title from './component/title';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ isDragging }) => (isDragging ? 'red' : 'yellow')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: red;
  }
`;

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 3,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? '#ffba37' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

function QuoteApp() {
  const [state, setState] = useState([getItems(3), getItems(5, 10)]);

  function onDragEnd(result) {
    console.log(state, 57, result);

    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {(provided) => {
              return (
                <div
                  style={{ display: 'inline-flex' }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {state.map((el, ind) => {
                    return (
                      <div
                        key={ind}
                        style={{
                          marginRight: 30,
                          border: '2px solid red',
                          padding: 10,
                          background: 'yellow',
                        }}
                      >
                        <Draggable draggableId={JSON.stringify(el)} index={ind}>
                          {(provided, snapshot) => (
                            <Container ref={provided.innerRef} {...provided.draggableProps}>
                              <Header isDragging={snapshot.isDragging}>
                                <Title
                                  isDragging={snapshot.isDragging}
                                  {...provided.dragHandleProps}
                                >
                                  aa
                                </Title>
                              </Header>
                              <div
                                style={{
                                  width: 100,
                                  height: 200,
                                  background: '#ddd',
                                }}
                              ></div>
                              dfdsfsd
                            </Container>
                          )}
                        </Draggable>
                        {/*<Droppable key={ind} droppableId={`${ind}`}>*/}
                        {/*  {(provided1, snapshot1) => (*/}
                        {/*    <div*/}
                        {/*      ref={provided1.innerRef}*/}
                        {/*      style={getListStyle(snapshot1.isDraggingOver)}*/}
                        {/*      {...provided1.droppableProps}*/}
                        {/*    >*/}
                        {/*      <div isDragging={snapshot1.isDragging}>*/}
                        {/*        <Title*/}
                        {/*          isDragging={snapshot1.isDragging}*/}
                        {/*          {...provided1.dragHandleProps}*/}
                        {/*        >*/}
                        {/*          fdfadsfadfasdfasdf*/}
                        {/*        </Title>*/}
                        {/*      </div>*/}
                        {/*      {el.map((item, index) => (*/}
                        {/*        <Draggable*/}
                        {/*          key={item.id}*/}
                        {/*          draggableId={item.id}*/}
                        {/*          index={index}*/}
                        {/*          isScrollable*/}
                        {/*        >*/}
                        {/*          {(provided, snapshot) => (*/}
                        {/*            <div*/}
                        {/*              ref={provided.innerRef}*/}
                        {/*              {...provided.draggableProps}*/}
                        {/*              {...provided.dragHandleProps}*/}
                        {/*              style={getItemStyle(*/}
                        {/*                snapshot.isDragging,*/}
                        {/*                provided.draggableProps.style*/}
                        {/*              )}*/}
                        {/*            >*/}
                        {/*              <div*/}
                        {/*                style={{*/}
                        {/*                  display: "flex",*/}
                        {/*                  justifyContent: "space-around",*/}
                        {/*                }}*/}
                        {/*              >*/}
                        {/*                {item.content}*/}
                        {/*                <button*/}
                        {/*                  type="button"*/}
                        {/*                  onClick={() => {*/}
                        {/*                    const newState = [...state];*/}
                        {/*                    newState[ind].splice(index, 1);*/}
                        {/*                    setState(*/}
                        {/*                      newState.filter(*/}
                        {/*                        (group) => group.length*/}
                        {/*                      )*/}
                        {/*                    );*/}
                        {/*                  }}*/}
                        {/*                >*/}
                        {/*                  delete*/}
                        {/*                </button>*/}
                        {/*              </div>*/}
                        {/*            </div>*/}
                        {/*          )}*/}
                        {/*        </Draggable>*/}
                        {/*      ))}*/}
                        {/*      {provided1.placeholder}*/}
                        {/*    </div>*/}
                        {/*  )}*/}
                        {/*</Droppable>*/}
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default QuoteApp;
