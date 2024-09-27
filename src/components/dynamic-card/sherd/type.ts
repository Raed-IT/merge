export interface CardDataTableProps {
  rows: any[]; 
  fields: any[]; 
  statusField?: string; 
  onChangeSelection: (selectedIds: Set<number>) => void; 
}

export interface FieldConfig {
  fieldName: string;
  label: string;
  icon?: React.ElementType;
  gridSize?: number;
}

export interface DynamicCardProps {
  row: any;
  fields: FieldConfig[];
  statusField?: string;
}
