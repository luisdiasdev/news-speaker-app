import { contextBridge, ipcRenderer } from 'electron'
import { Action, AnyAction, Reducer, Store, StoreEnhancer } from 'redux'

import constants from '../../constants'
import { ActionMeta, FluxStandardAction, isValidAction } from '../fsa'
import { stopActionForwarding } from '../stopForwarding'

const subscribeToMainActions = (callback: (action: Action) => void) => {
  ipcRenderer.on(constants.IPC.REDUX_ACTION, (_, action: Action) =>
    callback(action)
  )
}

const forwardActionsToMain = <S = any, A extends Action = AnyAction>(
  store: Store<S, A>
): Store<S, A> => {
  return {
    ...store,
    dispatch: action => {
      const returnValue = store.dispatch(action)

      if (isValidAction(action)) {
        ipcRenderer.send(constants.IPC.REDUX_ACTION, action)
      }

      return returnValue
    }
  }
}

interface ReplaceStateAction<S> extends FluxStandardAction<ActionMeta> {
  payload: S
}

const REPLACE_STATE_ACTION = 'REPLACE_STATE'

export const replaceState = <S>(state: S): ReplaceStateAction<S> => ({
  type: REPLACE_STATE_ACTION,
  payload: state,
  meta: { scope: 'local' }
})

export const withStoreReplacerReducer =
  <S, A extends AnyAction>(reducer: Reducer<S, A>) =>
  (state: S | undefined, action: A) => {
    if (action.type === REPLACE_STATE_ACTION) {
      return (action as any).payload
    }
    return reducer(state, action)
  }

export async function fetchInitialStateAsync(
  callback: (state: unknown) => void
): Promise<void> {
  try {
    const state = await ipcRenderer.invoke(constants.IPC.INIT_REDUX_STATE)
    callback(JSON.parse(state))
  } catch (error) {
    throw new Error('No Redux store found in main process.')
  }
}

const rendererStoreEnhancer = (): StoreEnhancer => createStore => {
  return (reducer, preloadedState) => {
    const store = createStore(withStoreReplacerReducer(reducer), preloadedState)

    fetchInitialStateAsync(state =>
      store.dispatch(replaceState(state) as never)
    )
    subscribeToMainActions(action =>
      store.dispatch(stopActionForwarding(action) as never)
    )

    return forwardActionsToMain(store)
  }
}

declare global {
  interface StoreBridge {
    rendererStoreEnhancer: typeof rendererStoreEnhancer
  }
  interface Window {
    __store: StoreBridge
  }
  const __store: StoreBridge
}

export function preloadContextBindings() {
  const bridge = {
    rendererStoreEnhancer
  }
  try {
    contextBridge.exposeInMainWorld('__store', bridge)
  } catch {
    window.__store = bridge
  }
}
