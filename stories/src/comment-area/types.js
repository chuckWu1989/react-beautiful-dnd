// @flow

export type TItem = {|
  id: string,
  name: string,
  avatarUrl: string,
  comment: string,
  lastTime: string,
  children: TItem[],
|};
