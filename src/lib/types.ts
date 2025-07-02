export interface Background {
  id: string;
  name: string;
  css: string;
  preview: string;
  fileUrl?: string;
}

export interface AspectRatioOption {
  label: string;
  tooltip: string;
  value: string;
  ratio: number;
}
