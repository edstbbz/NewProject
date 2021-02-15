import React from 'react';
import ReactDom from 'react-dom'; 
import "regenerator-runtime/runtime.js";
import 'normalize.css';
//import './styles/index.module.scss';
import App from '~/app/app.js';


 

ReactDom.render(
    <App/>

     ,document.querySelector('#root'));