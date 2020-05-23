import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return initital state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })

    it('store token upon login',()=>{
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        },{type:actionTypes.AUTH_SUCCESS, 
            token:'token', 
            userId:'userId'
           }))
        .toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })
})