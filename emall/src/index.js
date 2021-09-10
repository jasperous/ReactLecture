import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let initState = [
  {
    id: 8,
    title: "Nike Jordan",
    content: "Made in China",
    price: "20000 KRW",
    quantity: 20
  },
  {
    id: 5,
    title: "Easy Boost",
    content: "Made in Kobe",
    price: "650000 KRW",
    quantity: 5
  },
]
let initNotification = true;
function reducer(state = initState, action) {
  if (action.type === 'inc') {
    let copy = [...state];
    copy[action.payload].quantity++;
    return copy
  } else if (action.type === 'desc') {
    let copy = [...state];
    copy[action.payload].quantity--;
    return copy
  } else if (action.type === 'add') {
    let found = state.findIndex((a) => { return a.id === action.payload.id })
    if (found >= 0) {
      let copy = [...state];
      copy[found].quantity++;
      return copy
    } else {
      let copy = [...state, action.payload];
      return copy;
    }
  } else {
    return state
  }
}
function reducer2(state = initNotification, action) {
  if (action.type === 'close') {
    state = false;
    return state;
  } else {
    return state;
  }
}
let store = createStore(combineReducers({ reducer, reducer2 }))

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
