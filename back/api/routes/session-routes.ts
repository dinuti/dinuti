import { Router, NextFunction, Response } from 'express';
import { authentication } from '../utilities/authentication';
import { JWTRequest } from '../interfaces/requests-interface';
import { ILocationModel, Location } from '../models/location-model';
import { User, IUserModel } from '../models/user-model';
import { Session, ISessionModel } from '../models/session-model';

const router: Router = Router();

/**
* @api {post} /session/
* @apiName Post Session
* @apiDescription Create a new Session
* @apiGroup Session
* @apiSuccess {Session} Session Location of the Session
* @apiError (Error 401) {String} Error Error Unauthorized or Error Param not defined
*/
router.post('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	const location: ILocationModel = new Location(req.body.session.location);
	User.findById(req.payload.id).then(async (user: IUserModel) => {
		await location.save();
		req.body.session.location = location;
		req.body.session.user = user;
		const session: ISessionModel = new Session(req.body.session);
		try {
			await session.save();
			return res.json({ session: session.formatAsSessionJSON(user, location) });
		} catch (err) {
			return next(err);
		}
	});
});

export const SessionRoutes: Router = router;
