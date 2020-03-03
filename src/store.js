import { createStore } from "redux";

const reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, signup: true };
  }
  if (action.type === "login-success") {
    return { ...state, signup: false, loggedIn: true };
  }
  //action 은 dispatch안에있는 오브젝트이다. 여기는 우리가 정보를 입력하는단계.
  //deal with posts info from Home.jxs, it will interconvert to posts in dispatch in home.jsx
  if (action.type === "SET_POST") {
    return { ...state, posts: action.posts };
  }
  if (action.type === "SET_USER") {
    return { ...state, users: action.users };
  }
  return state;
};

const store = createStore(reducer, {
  signup: false,
  loggedIn: false,
  users: [],
  posts: []
});

export default store;
