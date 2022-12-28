import { Router } from 'express';
import DatabaseRouter from '@modules/ear/Router';
import DatabaseRouterNordeste from '@modules/nordeste/Router'
class Routes {
    static define(router: Router): Router {
        router.use('/ear', DatabaseRouter);

        return router;
    }
    static defineNordeste(router: Router): Router {
        router.use('/nordeste', DatabaseRouterNordeste);

        return router;
    }
}

export default [Routes.define(Router()), Routes.defineNordeste(Router())];