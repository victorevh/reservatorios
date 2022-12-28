import { Router } from 'express';
import DatabaseRouter from '@modules/Product/Router';
class Routes {
    static define(router: Router): Router {
        router.use('/database', DatabaseRouter);

        return router;
    }
}

export default Routes.define(Router());