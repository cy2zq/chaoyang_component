// @cy
import React, { Component } from "react";
import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "./quote-list";

import Content from "./Footer";
const Title=styled.h4`
  padding: 8px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  margin-bottom: 0;

  &:focus {
    outline: 2px solid red;
    outline-offset: 2px;
  }
`;
const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${({ isDragging }) =>
    isDragging ? "rgb(227, 252, 239)" : "skyblue"};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: darkcyan;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //border-bottom-left-radius: 10px;
  //border-bottom-right-radius: 10px;
  background-color: ${({ isDragging }) =>
    isDragging ? "rgb(227, 252, 239)" : "rgb(227, 252, 239)"};
  transition: background-color 0.2s ease;
  padding: 8px 0;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
  width: 250px;

  //&:hover {
  //  background-color: darkcyan;
  //}
`;

export default class Column extends Component {
  render() {
    const title = this.props.title;
    const quotes = this.props.quotes;
    const index = this.props.index;
    return (
      <Draggable draggableId={title} index={index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}>
            <Header isDragging={snapshot.isDragging}>
              <Title
                isDragging={snapshot.isDragging}
                {...provided.dragHandleProps}
                aria-label={`${title} quote list`}
              >
                {title}
              </Title>
            </Header>

            <QuoteList
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? "#ffba37" : null,
              }}
              quotes={quotes}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
              useClone={Boolean(this.props.useClone)}
            />
            <Footer>
              <Content {...this.props} />
            </Footer>
          </Container>
        )}
      </Draggable>
    );
  }
}
