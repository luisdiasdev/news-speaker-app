import { isPlainObject, isString } from 'lodash'

export type ActionMeta = {
  scope?: 'local' | string
}

export type MetaType = {
  [key: string]: any
}

export type FluxStandardAction<Meta = MetaType> = {
  type: string
  payload?: unknown
  meta?: Meta
}

const isFluxStandardAction = (action: FluxStandardAction): boolean =>
  isPlainObject(action) &&
  isString(action.type) &&
  Object.keys(action).every(
    k => ['type', 'payload', 'error', 'meta'].indexOf(k) > -1
  )

export const isValidAction = (action: FluxStandardAction) => {
  const denyList: RegExp[] = [/^@@/, /^redux-form/]
  return (
    isFluxStandardAction(action) &&
    action.meta?.scope !== 'local' &&
    denyList.every(rule => !rule.test(action.type))
  )
}
