import React                                   from 'react';
import ReactDOM                                from 'react-dom';
import App                                     from './App';
import { Provider }                            from 'react-redux';
import { createStore }                         from 'redux';
import appCRM                                  from './reducers'
import 'font-awesome/css/font-awesome.min.css';
import './styles/index.css';


let store = createStore(appCRM);


ReactDOM.render(
    <Provider store={ store }>
            <App />
    </Provider>
    ,
    document.getElementById('root'));




