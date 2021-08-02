import {createStore} from 'redux'
import { root } from './root'


export const Store = () => {
    return createStore(root)
}
