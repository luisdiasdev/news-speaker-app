import ElectronStore from 'electron-store'
import createElectronStorage from 'redux-persist-electron-storage'

export const createStorage = (name: string) => {
  const electronStore = new ElectronStore({
    name
  })

  return createElectronStorage({ electronStore })
}
