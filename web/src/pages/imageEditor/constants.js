export const MIRROR_OPTIONS = [
  {
    label: 'Original',
    value: '',
  },
  {
    label: 'Axis X',
    value: 'x',
  },
  {
    label: 'Axis Y',
    value: 'y',
  },
];

export const RESIZE_OPTIONS = [
  {
    label: 'Original',
    value: 1,
  },
  ...(new Array(19).fill().map((_, k) => {
    const value = (k * 5) + 5;
    return {
      label: `${value}%`,
      value: value / 100,
    };
  }).reverse()),
];

export const ROTATE_OPTIONS = [
  {
    label: 'Original',
    value: 0,
  },
  {
    label: '90°',
    value: 90,
  },
  {
    label: '180°',
    value: 180,
  },
  {
    label: '270°',
    value: 270,
  },
];
