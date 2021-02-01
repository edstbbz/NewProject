import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.module.scss'
import Header from '../header/header.js'
import { routesMap, routes } from '../../router/routes';


export default class extends React.Component{
    render(){
        let routesItems = routes.map((route) =>{
            return <Route
                key = {route.path}
                path = {route.path}
                component = {route.component}
                exact = {route.exact}
            />
        });

        return<BrowserRouter>
            <React.Fragment>
                 <Header/>
                 <Switch>
                     {routesItems}
                 </Switch>
            </React.Fragment>
       </BrowserRouter>
      
    }
}