import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
import Subject from './components/Subject'
import Control from './components/Control'

class App extends Component {
  constructor(props) {
    super(props);
    // 불필요한 렌더링을 줄이기 위해서 컴포넌트에 아무런 영향이 없는 값은 state 밖으로 빼준다.
    this.max_content_id = 3;
    this.state = {
      mode:'create',
      selected_content_id:2,
      Subject:{title:'WEB', sub:'world wide web'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is HyperText'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'},
      ]
    }
  }
  // shouldComponentUpdate 함수가 반환하는 값이 false 일 경우 렌더링이 되지 않아 state값이 바뀌어도 컴포넌트가 바뀌지 않는다.
  // 렌더링을 효율적으로 할 수 있다. 쓸대없는 렌더링을 막을 수 있다.
  // 여기서 push를 쓸 경우 원본 데이터가 바뀌게 되어 shouldComponentUpdate 함수를 사용할 수 없다. concat을 사용하도록 하자.
  // push를 쓰고 싶으면 form() 함수를 사용하여 새로운 배열을 복사해주고 처리하자.
  // 만약 배열이 아니라 객체일 경우 Object.assign({},a) 로 객체 복사 가능 
  // shouldComponentUpdate(newProps, newState) {
  //   console.log(newProps.data, this.props.data);
  //   return false;
  // }
  getReadContent() {
    var i = 0;
    while(i < this.state.contents.length) {
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i ++;
    }
  }
  getContent() {
    console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read') {
      var _content = this.getReadContent();
      console.log(_content);
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id ++;
        // push 원본 데이터에 값을 하나 추가하는 방식 concat은 추가된 새로운 배열을 만들어 내는 것.
        // this.state.contents.push({id: this.max_content_id, title: _title, desc: _desc});
        var _contents = Array.from(this.state.contents);
        _contents.push({id: this.max_content_id, title: _title, desc: _desc});
        // var _contents = this.state.contents.concat(
        //   {id: this.max_content_id, title: _title, desc: _desc}
        // )
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
      }.bind(this)}></CreateContent>
    }else if(this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
        // 기존의 데이터를 바꾸지 않고 새로운 배열을 만들어서 값을 수정. 불변성. 성능을 끌어올리는데 도움이 됨.
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i ++;
        }
        this.setState({
          contents: _contents,
          mode: 'read'
        })
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }
  render() {
    return (
      <div className="App">
        <Subject 
          title={this.state.Subject.title} 
          sub={this.state.Subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id: Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}
        >
        </TOC>
        <Control
          onChangeMode={function(_mode){
            if(_mode === 'delete') {
              if(window.confirm('really?')) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while(i < this.state.contents.length) {
                  if(_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i,1);
                    break;
                  }
                  i ++;
                }
                this.setState({
                  mode: 'welcome',
                  contents: _contents
                });
                alert('deleted');
              }
            } else {
              this.setState({mode: _mode})
            }
          }.bind(this)}
        >
        </Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
