import * as actionTypes from './ActionTypes'

export const setName = (name) => ({
    type:actionTypes.SETNAME,
    payload:name
})

export const setPhone = (phone) => ({
    type:actionTypes.SETPHONE,
    payload:phone
})