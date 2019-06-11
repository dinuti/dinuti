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
		req.body.session.statut = 1;
		req.body.session.lastAlive = Date.now();
		const session: ISessionModel = new Session(req.body.session);
		try {
			await session.save();
			return res.json({ session: session.formatAsSessionJSON(user, location) });
		} catch (err) {
			return next(err);
		}
	});
});
/**
* @api {get} /session/
* @apiName Get Session
* @apiDescription Return current Session
* @apiGroup Session
* @apiSuccess {Session} Session Location of the Session
* @apiError (Error 401) {String} Error Error Unauthorized or Error Param not defined
*/
router.get('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	User.findById(req.payload.id).then(async (user: IUserModel) => {
		Session.findOne({ user: user._id }).sort({ lastAlive: -1 }).populate('location').limit(1).then(async (session: ISessionModel) => {
			return res.json({ session });
		}).catch(next);
	}).catch(next);
});
/**
* @api {put} /session/
* @apiName Put Session
* @apiDescription Modify the last Session
* @apiGroup Session
* @apiSuccess {Session} Session Location of the Session
* @apiError (Error 401) {String} Error Error Unauthorized or Error Param not defined
*/
router.put('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	User.findById(req.payload.id).then(async (user: IUserModel) => {
		Session.findOne({ user: req.payload.id }).sort({ lastAlive: -1 }).then(async (session: ISessionModel) => {
			session.lastAlive = Date.now();
			session.statut = 1;
			session.save();
			return res.json({ session });
		}).catch(next);
	});
});
/**
* @api {delete} /session/
* @apiName Delete Session
* @apiDescription Safe delete Session, update statut to 0
* @apiGroup Session
* @apiSuccess {Session} Session Location of the Session
* @apiError (Error 401) {String} Error Error Unauthorized or Error Param not defined
*/
router.delete('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	User.findById(req.payload.id).then(async (user: IUserModel) => {
		Session.findOne({ user: user._id }).sort({ lastAlive: -1 }).limit(1).then(async (session: ISessionModel) => {
			session.statut = 0;
			await session.save();
			return res.json({ session });
		}).catch(next);
	});
});

export const SessionRoutes: Router = router;
