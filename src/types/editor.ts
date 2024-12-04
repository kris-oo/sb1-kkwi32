export interface ComponentSchema {
  id: string;
  type: string;
  props: Record<string, any>;
  style: Record<string, any>;
  children?: ComponentSchema[];
  events?: Record<string, string>;
  animations?: Animation[];
}

export interface Animation {
  type: string;
  duration: number;
  delay: number;
  properties: Record<string, any>;
}

export interface ComponentMeta {
  type: string;
  label: string;
  icon?: string;
  category?: string;
  props?: PropMeta[];
  events?: EventMeta[];
  children?: ComponentMeta[];
}

export interface PropMeta {
  name: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'color';
  options?: { label: string; value: any }[];
  default?: any;
}

export interface EventMeta {
  name: string;
  label: string;
  description: string;
}