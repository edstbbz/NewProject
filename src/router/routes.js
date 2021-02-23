import Login from '../pages/login/login';
import Simulator from '../pages/simutalor/simulator';
import Base from '../pages/simutalor/base';
import Average from '../pages/simutalor/average'
import Home from '../pages/home/home';
import Sign from '../pages/login/sign';
const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        exact: true
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        exact: true
    },
    {
        name: 'simulator',
        path: '/simulator',
        component: Simulator,
        exact: true
    },
    {
        name: 'base',
        path: '/simulator/base/:id',
        component: Base,
        exact: true
    },
    {
        name: 'average',
        path: '/simulator/average',
        component: Average,
        exact: true
    },
    {
        name: 'signup',
        path: '/sign up',
        component: Sign,
        exact: true
    },

]

const routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.path;
    }
});

export { routes, routesMap };