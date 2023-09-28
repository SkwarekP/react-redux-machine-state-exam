import React from 'react';
import {Wrapper} from "./ui/wrapper/wrapper";
import './style.css'
import {ExamReduxProcess} from "./examReduxProcess";
import {Provider} from "react-redux";
import {getStore} from "./redux/store";

function App() {

  return (
    <div className="App">
      <Provider store={getStore()}>
          <Wrapper>
            <ExamReduxProcess />
          </Wrapper>
      </Provider>
    </div>
  );
}

export default App;
