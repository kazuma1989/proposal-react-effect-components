import { shallowEqual as shallowEqualOriginal } from 'react-redux'

export const shallowEqual: <TSelected>(
  left: TSelected,
  right: TSelected,
) => boolean = shallowEqualOriginal
