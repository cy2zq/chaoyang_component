// @cy
import styled from '@emotion/styled';
import { Progress } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import QuoteList from './quote-list';

const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: ${({ isDragging }) => (isDragging ? '#F4F4F4' : '#F4F4F4')};
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 3px 6px 0px rgba(0,0,0,0.2)` : 'none')};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${({ isDragging }) => (isDragging ? '#e5e5e5' : '#e5e5e5')};
  transition: background-color 0.2s ease;
`;

const Title = styled.h4`
  padding: 16px 16px 0 16px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  margin-bottom: 0;
`;

function Index(props) {
  const title = props.taskGroupTitle;
  const quotes = props.quotes;
  const index = props.index;

  return (
    <div>
      {/*不可拖拽*/}
      <Draggable draggableId={props?.id + '-cy'} index={index}>
        {(provided, snapshot) => (
          <Container
            isDragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Header isDragging={snapshot.isDragging}>
              <Title isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: 30,
                    lineHeight: '30px',
                    fontWeight: 600,
                    color: 'black',
                    fontSize: 16,
                  }}
                >
                  {title}
                </div>
                <div>
                  <Progress
                    percent={props?.boardProgress}
                    size="small"
                    status="active"
                    strokeColor={'#12CE3B'}
                  />
                </div>
              </Title>
            </Header>

            <QuoteList
              listId={props.id}
              listType="QUOTE"
              quotes={quotes}
              internalScroll={props.isScrollable}
              isCombineEnabled={Boolean(props.isCombineEnabled)}
              useClone={Boolean(props.useClone)}
            />
          </Container>
        )}
      </Draggable>
    </div>
  );
}

export default Index;
