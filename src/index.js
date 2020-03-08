import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch, NavLink, useParams} from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  )
}
var contents = [
  {id:1, title:'HTML', description:'HTML is ...'},
  {id:2, title:'JS', description:'JS is ...'},
  {id:3, title:'React', description:'React is ...'},
];

function Topic() {
  var params = useParams();
  var topic_id = params.topic_id;
  var selected_topic = {
    title:'Sorry',
    description:'Not found'
  }
  for(var i=0; i<contents.length; i++) {
    if(contents[i].id === Number(topic_id)) {
      selected_topic = contents[i];
      break;
    }
  }
  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  )
}
function Topics() {
  var lis = [];
  for(var i = 0; i< contents.length; i ++) {
    lis.push(<li key={contents[i].id}><NavLink to={'/topics/'+contents[i].id}>{contents[i].title}</NavLink></li>);
  }
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Route path="/topics/:topic_id">
        <Topic></Topic>
      </Route>
      {/* <Switch>
        <Route path="/topics/1">HTML 1...</Route>
        <Route path="/topics/2">JS 1...</Route>
        <Route path="/topics/3">React 1...</Route>
      </Switch> */}
    </div>
  )
}

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  )
}


function App() {
  return (
    <div>
      <h1>React Router DOM example</h1>
      <ul>
        {/* a태그 대신 Link를 사용하면 페이지 전환을 하지 않는다. */}
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink exact to="/topics">Topics</NavLink></li>
        <li><NavLink exact to="/contact">Contact</NavLink></li>
      </ul>
      {/* Switch 는 첫 번째 걸리는 path가 있으면 나머지는 확인해 보지 않게 된다. home만 뜨게 됨. => home을 가장 아래에 두면 해결 됨.*/}
      <Switch>
      {/* exact 를 넣지 않으면 /topics 로 접근했을때 /, /topics 두개가 같이 뜨게 된다. */}
        <Route exact path="/"><Home></Home></Route>
        <Route path="/topics"><Topics></Topics></Route>
        <Route path="/contact"><Contact></Contact></Route>
        <Route path="/">Not found</Route>
      </Switch>
    </div>
  )
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
