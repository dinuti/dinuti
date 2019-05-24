import { Router, NextFunction, Response } from 'express';
import { authentication } from '../utilities/authentication';
import { JWTRequest, ProfileRequest } from '../interfaces/requests-interface';
import { ILocationModel, Location } from '../models/location-model';
import { User, IUserModel } from '../models/user-model';

const router: Router = Router();

router.param('username', (req: ProfileRequest, res: Response, next: NextFunction, username: string) => {
	User.findOne({ username }).then((user: IUserModel) => {
		req.profile = user;
		return next();
	}).catch(next);
});

/**
 * @api {post} /location/
 * @apiName Post Location
 * @apiDescription Add the Location of the Session
 * @apiGroup Location
 * @apiSuccess {Location} Location Location of the Session
 * @apiError (401) {String} Error Error Unauthorized or Error Param not defined
 *
*/
router.post('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	const location: ILocationModel = new Location(req.body.location);
	Location
		.findById(req.payload.id)
		.then((location: any) => {
			return location.save().then(() => {
				return res.json({ location: location.formatAsLocationJSON() });
			});
		})
		.catch(next);
});

export const LocationRoutes: Router = router;
