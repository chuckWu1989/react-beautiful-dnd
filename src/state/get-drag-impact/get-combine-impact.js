// @flow
import type { Rect, Position } from 'css-box-model';
import type {
  DraggableId,
  Axis,
  DraggableDimension,
  DroppableDimension,
  DragImpact,
  LiftEffect,
  DisplacedBy,
} from '../../types';
import { find } from '../../native-with-fallback';
import getDidStartAfterCritical from '../did-start-after-critical';
import getDisplacedBy from '../get-displaced-by';
import getIsDisplaced from '../get-is-displaced';
import removeDraggableFromList from '../remove-draggable-from-list';

type Args = {|
  draggable: DraggableDimension,
  pageSelection: Position,
  pageSelection: Position,
  previousImpact: DragImpact,
  destination: DroppableDimension,
  insideDestination: DraggableDimension[],
  afterCritical: LiftEffect,
  combineThresholdDivisor?: number,
|};

export default ({
  draggable,
  pageSelection,
  previousImpact,
  destination,
  insideDestination,
  afterCritical,
  combineThresholdDivisor = 4,
}: Args): ?DragImpact => {
  if (!destination.isCombineEnabled) {
    return null;
  }
  const axis: Axis = destination.axis;
  const displacedBy: DisplacedBy = getDisplacedBy(
    destination.axis,
    draggable.displaceBy,
  );
  const displacement: number = displacedBy.value;

  const targetLine: number = pageSelection[axis.line];

  const withoutDragging: DraggableDimension[] = removeDraggableFromList(
    draggable,
    insideDestination,
  );

  const combineWith: ?DraggableDimension = find(
    withoutDragging,
    (child: DraggableDimension): boolean => {
      const id: DraggableId = child.descriptor.id;
      const childRect: Rect = child.page.borderBox;
      const childSize: number = childRect[axis.size];
      const threshold: number = childSize / combineThresholdDivisor;

      const didStartAfterCritical: boolean = getDidStartAfterCritical(
        id,
        afterCritical,
      );

      const isDisplaced: boolean = getIsDisplaced({
        displaced: previousImpact.displaced,
        id,
      });

      /*
        Only combining when in the combine region
        As soon as a boundary is hit then no longer combining
      */

      if (didStartAfterCritical) {
        // In original position
        // Will combine with item when inside a band
        if (isDisplaced) {
          return (
            targetLine > childRect[axis.start] + threshold &&
            targetLine < childRect[axis.end] - threshold
          );
        }

        // child is now 'displaced' backwards from where it started
        // want to combine when we move backwards onto it
        return (
          targetLine > childRect[axis.start] - displacement + threshold &&
          targetLine < childRect[axis.end] - displacement - threshold
        );
      }

      // item has moved forwards
      if (isDisplaced) {
        return (
          targetLine > childRect[axis.start] + displacement + threshold &&
          targetLine < childRect[axis.end] + displacement - threshold
        );
      }

      // is in resting position - being moved backwards on to
      return (
        targetLine > childRect[axis.start] + threshold &&
        targetLine < childRect[axis.end] - threshold
      );
    },
  );

  if (!combineWith) {
    return null;
  }

  const impact: DragImpact = {
    // no change to displacement when combining
    displacedBy,
    displaced: previousImpact.displaced,
    at: {
      type: 'COMBINE',
      combine: {
        draggableId: combineWith.descriptor.id,
        droppableId: destination.descriptor.id,
      },
    },
  };
  return impact;
};
