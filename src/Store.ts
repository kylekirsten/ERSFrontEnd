import { createStore, Store } from 'redux'
import authVar from './reducers/index'
const storeVar: Store<any> = createStore(authVar);
export default storeVar;