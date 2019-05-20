
import { Router } from 'express';
import { UserRoutes } from './user-routes';
import { UsersRoutes } from './users-routes';
import { ProfilesRoutes } from './profiles-routes';
import { LocationRoutes } from './location-routes';

const router: Router = Router();

router.use('/user', UserRoutes);
router.use('/users', UsersRoutes);
router.use('/profiles', ProfilesRoutes);
router.use('/location', LocationRoutes);

export const MainRouter: Router = router;
