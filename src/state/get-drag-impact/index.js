// @flow
import { type Position, type Rect } from 'css-box-model';
import type {
  DroppableId,
  DraggableDimension,
  DroppableDimension,
  DraggableDimensionMap,
  DroppableDimensionMap,
  DragImpact,
  Viewport,
  LiftEffect,
} from '../../types';
import getDroppableOver from '../get-droppable-over';
import getDraggablesInsideDroppable from '../get-draggables-inside-droppable';
import getReorderImpact from './get-reorder-impact';
import getCombineImpact from './get-combine-impact';
import noImpact from '../no-impact';
import { offsetRectByPosition } from '../rect';

type Args = {|
  pageOffset: Position,
  pageSelection: Position,
  draggable: DraggableDimension,
  // all dimensions in system
  draggables: DraggableDimensionMap,
  droppables: DroppableDimensionMap,
  previousImpact: DragImpact,
  viewport: Viewport,
  afterCritical: LiftEffect,
  combineThresholdDivisor?: number,
|};

export default ({
  pageOffset,
  pageSelection,
  draggable,
  draggables,
  droppables,
  previousImpact,
  viewport,
  afterCritical,
  combineThresholdDivisor,
}: Args): DragImpact => {
  const pageBorderBox: Rect = offsetRectByPosition(
    draggable.page.borderBox,
    pageOffset,
  );

  const destinationId: ?DroppableId = getDroppableOver({
    pageBorderBox,
    draggable,
    droppables,
  });

  // not dragging over anything

  if (!destinationId) {
    // A big design decision was made here to collapse the home list
    // when not over any list. This yielded the most consistently beautiful experience.
    return noImpact;
  }

  const destination: DroppableDimension = droppables[destinationId];
  const insideDestination: DraggableDimension[] = getDraggablesInsideDroppable(
    destination.descriptor.id,
    draggables,
  );

  // checking combine first so we combine before any reordering
  return (
    getCombineImpact({
      pageSelection,
      draggable,
      previousImpact,
      destination,
      insideDestination,
      afterCritical,
      combineThresholdDivisor,
    }) ||
    getReorderImpact({
      pageSelection,
      draggable,
      destination,
      insideDestination,
      last: previousImpact.displaced,
      viewport,
      afterCritical,
    })
  );
};
