import { AspectRatioOption } from "./types";

export const aspectRatios: AspectRatioOption[] = [
  {
    label: "16:9",
    tooltip: "Videos",
    value: "16 / 9",
    ratio: 16 / 9,
  },
  {
    label: "4:3",
    tooltip: "Retro Style",
    value: "4 / 3",
    ratio: 4 / 3,
  },
  {
    label: "1:1",
    tooltip: "Square",
    value: "1 / 1",
    ratio: 1,
  },
  {
    label: "3:2",
    tooltip: "Portraits",
    value: "3 / 2",
    ratio: 3 / 2,
  },
  {
    label: "9:16",
    tooltip: "Mobile",
    value: "9 / 16",
    ratio: 9 / 16,
  },
];
