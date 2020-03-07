import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  var [funcShow, setFuncShow] = useState(true);
  var [classShow, setClassShow] = useState(true);
  return (
    <div className="container">
      Hello world
      <input type="button" value="remove func" onClick={function(){
        setFuncShow(false);
      }}></input>
      <input type="button" value="remove class" onClick={function(){
        setClassShow(false);
      }}></input>
      
      {funcShow ? <FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp> : null}
    </div>
  );
}
var funcStyle = 'color:blue';
var funcId = 0;
// 기존에는 function은 state를 관리 할 수 없었지만 훅이 생기면서 가능해 졌다.
function FuncComp(props) {
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];
  console.log(numberState, number)

  // var dateState = useState((new Date()).toString());
  // var date = dateState[0];
  // var setDate = dateState[1];

  // 위 3줄의 코드를 아래 한 줄의 코드로 정리할 수 있다.
  var [date, setDate] = useState((new Date()).toString());

  useEffect(function(){
    console.log('%cfunc = > useEffect (componentDidMount)' + (++funcId), funcStyle);
    document.title = number;
    return function() {
      console.log('%cfunc = > useEffect return (componentWillUnMount)' + (++funcId), funcStyle);
      // 부모 컴포넌트에 의해 해당 컴포넌트가 사라진다면 발생된다.
    }
  }, []); // 빈 배열을 넣으면 마운트 됬을 때만 실행이 된다.

  // useEffect 는 복수로 사용할 수 도 있다.
  // side effect가 생략된 것.
  useEffect(function(){
    console.log('%cfunc = > useEffect number (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    document.title = number;
    return function() {
      // return 함수가 실행되고 다시 useEffect가 실행된다.
      // 이것을 clean up 이라고 한다.
      console.log('%cfunc = > useEffect number return (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
  }, [number]); // number가 바꼈을 때만 useEffect가 실행

  useEffect(function(){
    console.log('%cfunc = > useEffect date (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    document.title = date;
    return function() {
      // return 함수가 실행되고 다시 useEffect가 실행된다.
      // 이것을 clean up 이라고 한다.
      console.log('%cfunc = > useEffect date return (componentDidMount & componentDidUpdate)' + (++funcId), funcStyle);
    }
  }, [date]); // date가 바꼈을 때만 useEffect가 실행

  console.log('%cfunc = > render' + (++funcId), funcStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {number}</p>
      <p>Date: {date}</p>
      <input type="button" value="random" onClick={function(){
        setNumber(Math.random());
      }}></input>
      <input type="button" value="date" onClick={function(){
        setDate((new Date()).toString());
      }}></input>      
    </div>
  );
}
var classStyle = 'color:red'
class ClassComp extends React.Component{
  // state에 값을 넣어주고 활용함으로써 state 값이 변경될 때마다 렌더링 된다.
  state = {
    number: this.props.initNumber,
    date:(new Date()).toString()
  }
  // react life cycle
  componentWillMount() {
    // 로그 앞에 %c를 붙이면 css style을 입힐 수 있다.
    console.log('%cclass => componentWillMount', classStyle);
  }
  componentDidMount() {
    console.log('%cclass => componentDidMount', classStyle);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  componentWillUpdate() {
    console.log('%cclass => componentWillUpdate', classStyle);
  }
  componentDidUpdate() {
    console.log('%cclass => componentDidUpdate', classStyle);
  }
  componentWillUnmount() {
    console.log('%cclass => componentWillUnmount', classStyle);
  }
  render() {
    console.log('%cclass => render', classStyle)
    return (
      <div className="container">
        <h2>class style component</h2>
        <p>Number: {this.state.number}</p>
        <p>Date: {this.state.date}</p>
        <input type="button" value="random" onClick={function(){
          this.setState({number:Math.random()})
        }.bind(this)}></input>
        <input type="button" value="date" onClick={function(){
          this.setState({date:(new Date()).toString()})
        }.bind(this)}></input>
      </div>
    )
  }
}

export default App;
