import { Middleware } from '@reduxjs/toolkit'
import constants from '@shared/constants'
import { ipcMain, webContents } from 'electron'
import { Action, AnyAction, Store, StoreEnhancer } from 'redux'

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
          .forEach(contents =>
            contents.send(constants.IPC.REDUX_ACTION, action)
          )
      }
      return value
    }
  }
}

export const mainStateSyncMiddleware: Middleware = ({ dispatch }) => {
  ipcMain.on(constants.IPC.REDUX_ACTION, (event, action: Action) => {
    const localAction = stopActionForwarding(action)

    dispatch(localAction)

    webContents
      .getAllWebContents()
      .filter(
        c => c.id !== event.sender.id && !c.getURL().startsWith('devtools://')
      )
      .forEach(contents =>
        contents.send(constants.IPC.REDUX_ACTION, localAction)
      )
  })
  return next => action => next(action)
}

export const mainStateEnhancer = (): StoreEnhancer => createStore => {
  return (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState)

    ipcMain.handle(constants.IPC.INIT_REDUX_STATE, async () => {
      const state = store.getState()
      // Don't send redux-persist specific info to the renderer
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _persist: _, ...restState } = state

      return JSON.stringify(restState)
    })

    return forwardActionsToRenderer(store)
  }
}
