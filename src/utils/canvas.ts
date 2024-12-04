import { nanoid } from 'nanoid';
import type { ComponentSchema } from '../types/editor';

export const calculateComponentPosition = (
  event: DragEvent,
  canvasElement: HTMLElement
): { left: string; top: string } => {
  const rect = canvasElement.getBoundingClientRect();
  const scrollLeft = canvasElement.scrollLeft;
  const scrollTop = canvasElement.scrollTop;
  return {
    left: `${event.clientX - rect.left + scrollLeft}px`,
    top: `${event.clientY - rect.top + scrollTop}px`,
  };
};

export const createComponent = (
  componentData: string,
  position: { left: string; top: string }
): ComponentSchema => {
  const baseComponent = JSON.parse(componentData);
  const defaultStyle = {
    width: 'auto',
    height: baseComponent.type.includes('input') ? '32px' : 'auto',
  };

  return {
    ...baseComponent,
    id: nanoid(),
    style: {
      ...defaultStyle,
      ...baseComponent.style,
      position: 'absolute',
      ...position,
    },
  };
};