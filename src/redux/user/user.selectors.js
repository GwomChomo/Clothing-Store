import {createSelector} from 'reselect';

const selectUser = state=> state.user;

//first param of create selector is an input seletor (previous) (could be an array of selectors). 
//Second param is the return value of the given selector
export const selectCurrentUser = createSelector(
    [selectUser],
    (user)=> user.currentUser
)
