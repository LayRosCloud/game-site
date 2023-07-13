const {createStore} = require("redux");

const defaultState = {
    isAuth: false,
    user: {}
}

const reducer = (state = defaultState, action) =>{
    switch(action.type){
        case "AUTH":
            return {...state, isAuth: true}
        case "EXIT_AUTH":
            return {...state, isAuth: false}
        case "SET_USER":
            return {...state, user: action.payload}
        case "DELETE_USER":
            return {...state, user: {}}
        default:
            return state;
    }
}

export const store = createStore(reducer)