import { ipcMain, webContents } from 'electron'
import { Action, AnyAction, Store, StoreEnhancer } from 'redux'

import constants from '../../../../shared/constants'
import { isValidAction } from '../fsa'
import { stopActionForwarding } from '../stopForwarding'

const forwardActionsToRenderer = <S = any, A extends Action = AnyAction>(
  store: Store<S, A>
): Store<S, A> => {
  return {
    ...store,
    dispatch: action => {
      const value = store.dispatch(action)
      if (isValidAction(action)) {
        webContents
          .getAllWebContents()
          .filter(c => !c.getURL().startsWith('devtools://'))
          .forEach(contents => contents.send(constants.IPC.ReduxAction, action))
      }
      return value
    }
  }
}

export const mainStateEnhancer = (): StoreEnhancer => createStore => {
  return (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)

    ipcMain.handle(constants.IPC.InitReduxState, async () => {
      const state = store.getState()
      // Don't send redux-persist specific info to the renderer
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _persist: _, ...restState } = state

      return JSON.stringify(restState)
    })

    ipcMain.on(constants.IPC.ReduxAction, (event, action: Action) => {
      const localAction = stopActionForwarding(action)

      store.dispatch(action as never)

      webContents
        .getAllWebContents()
        .filter(
          c => c.id !== event.sender.id && !c.getURL().startsWith('devtools://')
        )
        .forEach(contents =>
          contents.send(constants.IPC.ReduxAction, localAction)
        )
    })

    return forwardActionsToRenderer(store)
  }
}
