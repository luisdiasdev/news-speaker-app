import { ActionMeta, FluxStandardAction } from './fsa'

export const stopActionForwarding = (
  action: FluxStandardAction<ActionMeta>
): FluxStandardAction<ActionMeta> => ({
  ...action,
  meta: {
    ...action.meta,
    scope: 'local'
  }
})
