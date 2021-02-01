import React from 'react';
import ReactDom from 'react-dom'; 
import 'normalize.css';
//import './styles/index.module.scss';
import App from '~/components/app/app.js';


 

ReactDom.render(
    <App/>

     ,document.querySelector('#root'));