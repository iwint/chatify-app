import express from 'express';
import authRouter from './auth.route';

const router = express();

const routes = [
    {
        path: '/auth',
        route: authRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
