
import { Router } from 'express';
import { UserRoutes } from './user-routes';
import { ProfilesRoutes } from './profiles-routes';
import { LocationRoutes } from './location-routes';
import { SessionRoutes } from './session-routes';
const router: Router = Router();

router.use('/user', UserRoutes);
router.use('/profiles', ProfilesRoutes);
router.use('/location', LocationRoutes);
router.use('/session', SessionRoutes);

export const MainRouter: Router = router;
