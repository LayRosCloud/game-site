const {createStore} = require("redux");

const defaultState = {
    isAuth: false,
    user: {},
    news: false,
    about: false,
    store: false,

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
        case "SET_NEWS":
            return {state, news: action.payload}
        case "SET_ABOUT":
            return {state, about: action.payload}
        case "SET_STORE":
            return {state, store: action.payload}
        default:
            return state;
    }
}

export const store = createStore(reducer)