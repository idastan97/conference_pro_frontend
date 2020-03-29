import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import IndexRouter from "./IndexRouter";
import * as serviceWorker from './serviceWorker';
import './fonts/Sansation_Bold.ttf';
import './fonts/Sansation_Bold_Italic.ttf';
import './fonts/Sansation_Italic.ttf';
import './fonts/Sansation_Light.ttf';
import './fonts/Sansation_Light_Italic.ttf';
import './fonts/Sansation_Regular.ttf';
import './index.css';

ReactDOM.render(<IndexRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
