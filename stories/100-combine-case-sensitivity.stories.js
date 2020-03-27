// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import CommentArea from './src/comment-area';

storiesOf('Combine case sensitivity', module).add('small scale', () => (
  <CommentArea />
));
