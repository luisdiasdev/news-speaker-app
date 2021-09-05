import { ActionMeta, FluxStandardAction } from './fsa'

export const stopActionForwarding = (
  action: FluxStandardAction<ActionMeta>
): any => ({
  ...action,
  meta: {
    ...action.meta,
    scope: 'local'
  }
})
