// @ts-ignore
import storage from 'redux-persist/lib/storage'

export const playerPersistConfig = {
  key: 'player',
  storage: storage,
  whitelist: ['volume']
}
