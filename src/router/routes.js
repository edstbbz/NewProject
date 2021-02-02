import Login from '../components/login/login';
import Simulator from '../components/simutalor/simulator';
import Home from '../components/home/home';
import Sign from '../components/login/sign'
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