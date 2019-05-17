import { Router, NextFunction, Response } from 'express';
import { authentication } from '../utilities/authentication';
import { JWTRequest } from '../interfaces/requests-interface';
import { ILocationModel, Location } from '../models/location-model';
import { User } from '../models/user-model';

const router: Router = Router();

/**
 * POST /api/location
 */
router.post('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {

	const location: ILocationModel = new Location();

	if (typeof req.body.location.room !== 'undefined' &&
		typeof req.body.location.floor !== 'undefined') {
		location.floor = req.body.location.floor;
		location.room = req.body.location.room;
	} else {
		res.json('Error');
	}
	User
		.findById(req.payload.id)
		.then(user => {
			location.author = user;
			return location.save().then(() => {
				return res.json({location: location.formatAsLocationJSON(user)});
			});
		})
		.catch(next);
});

export const LocationRoutes: Router = router;