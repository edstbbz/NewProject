import AppHeader from '../components/header/header';
import login from '../components/login/login';

const routes = [
    {
        name: 'home',
        path: '/',
        component: AppHeader,
        exact: true
    },
    {
        name: 'login',
        path: '/login',
        component: login,
        exact: true
    }
]

const routesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')){
        routesMap[route.name] = route.path;
    }
});

export { routes, routesMap };