import {createStore} from 'redux';

export default createStore(function(state, action){
  if(state === undefined) {
    return {number:0}
  }

  if(action.type === 'INCREMENT') {
    // ...state 처리를 해주면 state 값을 복제해주고 처리해주게 된다. 불변성
    return {...state, number:state.number + action.size}
  }
  return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())