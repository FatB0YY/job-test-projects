import { ValueOf } from '../types'

export const EntryStatusObj = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const

export type EntryStatusObjKeys = ValueOf<typeof EntryStatusObj>
