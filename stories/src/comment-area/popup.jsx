// @flow
import React from 'react';
import styled from 'styled-components';
import { type TItem } from './types';
import { Draggable, type DraggableProvided } from '../../../src';

type TPopupProps = {|
  index: number,
  ...TItem,
|};

const PopupContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 28px;
  line-height: 28px;
  background: #ffffff;
  border-top: solid 1px rgb(247, 247, 246);
  position: relative;
`;
const AvatorContainer = styled.div`
  position: absolute;
  top: 2px;
  left: 12px;
`;
const Avator = styled.div`
  background-image: url('${({ avatarUrl }) => avatarUrl}');
  width: 24px;
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 12px;
`;
const Comment = styled.div`
  font-size: 12px;
  margin-left: 100px;
`;
const Name = styled.div`
  font-size: 12px;
  transform: scale(0.7);
  position: absolute;
  left: 40px;
  top: 0;
  width: 20px;
`;
const LastTime = styled.span`
  font-size: 12px;
  margin-left: 8px;
  color: rgb(199, 199, 199);
  transform: scale(0.7);
  display: inline-block;
`;
const ChildrenContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  display: flex;
`;
const AgreeSpan = styled.span`
  font-size: 12px;
  transform: scale(0.7);
`;

export default function Popup(props: TPopupProps) {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided: DraggableProvided) => (
        <PopupContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AvatorContainer>
            <Avator avatarUrl={props.avatarUrl} />
          </AvatorContainer>
          <Name>{props.name}</Name>
          <Comment>
            <span>{props.comment}</span>
            <LastTime>{props.lastTime}</LastTime>
          </Comment>
          {props.children.length > 0 ? (
            <ChildrenContainer>
              <AgreeSpan>Agree:</AgreeSpan>
              {props.children.map(item => (
                <Avator
                  avatarUrl={item.avatarUrl}
                  style={{ width: 16, height: 16, marginTop: 5 }}
                />
              ))}
            </ChildrenContainer>
          ) : null}
        </PopupContainer>
      )}
    </Draggable>
  );
}
