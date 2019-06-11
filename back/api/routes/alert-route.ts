import { Router, NextFunction, Response } from 'express';
import { authentication } from '../utilities/authentication';
import { JWTRequest } from '../interfaces/requests-interface';
import { ILocationModel, Location } from '../models/location-model';
import { User, IUserModel } from '../models/user-model';
import { Session, ISessionModel } from '../models/session-model';

const router: Router = Router();

/**
* @api {put} /alert/
* @apiName Put Alert
* @apiDescription Send an alert
* @apiGroup Alert
* @apiSuccess {Session} Session Session that send the alert
* @apiError (Error 401) {String} Error Error Unauthorized or Error Param not defined
*/
router.put('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	User.findById(req.payload.id).then(async (user: IUserModel) => {
		Session.findOne({ user: req.payload.id }).sort({ lastAlive: -1 }).then(async (session: ISessionModel) => {
			session.statut = 2;
			session.save();
			console.log(' We send an alert ');
			return res.json({ session });
		}).catch(next);
	});
});

export const AlertRoutes: Router = router;
