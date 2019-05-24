import { Router, NextFunction, Response } from 'express';
import { authentication } from '../utilities/authentication';
import { JWTRequest, ProfileRequest } from '../interfaces/requests-interface';
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
	const session: ISessionModel = new Session(req.body.session);
	console.log(req.body.session.location);
	const location: ILocationModel = new Location();
	location.desc = req.body.session.location.desc;
	return location.save().then((loc) => {
		console.log(loc);
		return session.save().then(() => {
			return res.json({ session: session.formatAsSessionJSON(req.payload, loc._id) });
		})
		.catch(next);
	});
});

export const SessionRoutes: Router = router;
