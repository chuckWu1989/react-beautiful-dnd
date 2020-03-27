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

function CommentArea(props: TCommentAreaProps) {
  const [data, setData] = React.useState(props.data);
  return (
    <>
      <Container>
        <DragDropContext onDragEnd={getOnDragEnd(data, setData)}>
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
                {data.map((item, index) => (
                  <Popup {...item} key={item.id} index={index} />
                ))}
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
