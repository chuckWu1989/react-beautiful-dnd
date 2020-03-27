// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { type DroppableProps } from '../../../src';

type TMobileProps = {|
  children: null | Node,
  ...DroppableProps,
|};

const Container = styled.div`
  width: 800px;
  height: 600px;
  background: rgb(60, 60, 61);
  border-radius: 30px;
  border-color: rgb(60, 60, 61);
  margin: auto;
  margin-top: 20px;
  display: flex;
  position: relative;
`;
const InnerWrapper = styled.div`
  width: calc(100% - 32px);
  height: calc(100% - 40px);
  margin: 16px;
  background: #ffffff;
  border-radius: 20px;
`;
const ContentArea = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  margin: 20px 0;
  overflow-y: auto;
  overflow-x: hidden;
`;
const HeaderCamera = styled.div`
  width: 120px;
  height: 30px;
  background: rgb(60, 60, 61);
  position: absolute;
  top: 0;
  left: calc(50% - 60px);
  border-radius: 12px;
`;

function MobileContainer(props: TMobileProps, ref: any) {
  const { children, ...restProps } = props;
  return (
    <Container ref={ref} {...restProps}>
      <HeaderCamera />
      <InnerWrapper>
        <ContentArea>{children}</ContentArea>
      </InnerWrapper>
    </Container>
  );
}

export default React.forwardRef<TMobileProps, any>(MobileContainer);
