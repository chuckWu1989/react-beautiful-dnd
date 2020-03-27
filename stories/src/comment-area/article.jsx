// @flow
import React from 'react';
import styled from 'styled-components';
import princessImg from '../../static/media/princess-min.png';

const TitleContainer = styled.div`
  width: 100%;
  height: 40px;
  margin: 16px;
  position: relative;
`;
const Avator = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  left: 0;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: contain;
`;
const Name = styled.div`
  width: auto;
  font-size: 14px;
  font-weight: 600;
  margin-left: 60px;
  color: rgb(63, 90, 146);
`;
const LastTime = styled.div`
  width: auto;
  font-size: 12px;
  margin-left: 60px;
  color: rgb(163, 163, 144);
`;
const Comment = styled.div`
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  margin: 6px 0 0 75px;
`;
const Image = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin: auto;
  margin: 16px 0;
`;

export default function Article() {
  return (
    <>
      <TitleContainer>
        <Avator url={princessImg} />
        <Name>Princess</Name>
        <LastTime>Last Updated: 19/1/20</LastTime>
      </TitleContainer>
      <Comment>
        Finn said this photo is so cute but I dont think so... How do you feel?
      </Comment>
      <Image url={princessImg} />
    </>
  );
}
