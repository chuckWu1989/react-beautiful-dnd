// @flow
import { type TItem } from './types';
import { type DropResult } from '../../../src';

export function getOnDragEnd(data: TItem[], setData: (value: TItem[]) => void) {
  return (result: DropResult) => {
    if (result.combine && result.combine) {
      const draggableId = result.combine.draggableId;
      const target: TItem | typeof undefined = data.find(
        item => item.id === draggableId,
      );
      if (target) {
        const item: TItem = data.splice(result.source.index, 1)[0];
        if (item.children.length > 0) {
          target.children = target.children.concat(item.children);
          item.children = [];
        }
        target.children.push(item);
        setData(data.slice());
      }
    }
  };
}
