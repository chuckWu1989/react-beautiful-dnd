// @flow
import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';
import MobileContainer from './mobile';
import Popup from './popup';
import Article from './article';
import initial from './data';
import { getOnDragEnd } from './controller';
import { type TItem } from './types';
import {
  type DroppableProvided,
  DragDropContext,
  Droppable,
} from '../../../src';

type TCommentAreaProps = {|
  data: TItem[],
|};

const Container = styled.div`
  background-color: ${colors.white};
  min-height: 100vh;
  min-width: 100vw;
  display: inline-flex;
`;
const ListContainer = styled.div`
  width: 100%;
  height: 190px;
  overflow-y: auto;
`;

function CommentArea(props: TCommentAreaProps) {
  const [data, setData] = React.useState(props.data);
  return (
    <>
      <Container>
        <DragDropContext
          onDragEnd={getOnDragEnd(data, setData)}
          combineThresholdDivisor={4}
        >
          <Droppable
            droppableId="chatboard"
            type="COLUMN"
            direction="vertical"
            isCombineEnabled
          >
            {(provided: DroppableProvided) => (
              <MobileContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Article />
                <ListContainer>
                  {data.map((item, index) => (
                    <Popup {...item} key={item.id} index={index} />
                  ))}
                </ListContainer>
              </MobileContainer>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
}
CommentArea.defaultProps = {
  data: initial,
};

export default CommentArea;
