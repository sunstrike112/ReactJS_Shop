export interface FormResource {
  items: FieldResource[];
}

export interface FieldResource {
  key: string;
  label: string;
  colSpan?: number;
  colon?: boolean;
  required?: boolean;
  initialValue?: any;
  options?: any[];
  tooltip?: string;
  widget?: any;
  forwardRef?: boolean;
  buttonGroup?: boolean;
  extra?: string;
  widgetProps?: any;
  noStyle?: boolean;
  rules?: any[];
  dependField?: string;
  disabled?: boolean;
  can?: string;
}
