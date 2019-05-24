
import { IUserModel, User } from '../models/user-model';
import { authentication } from '../utilities/authentication';
import { NextFunction,  Response, Router, Request } from 'express';
import { JWTRequest } from '../interfaces/requests-interface';
import * as passport from 'passport';

const router: Router = Router();

/**
 * @api {get} /user/
 * @apiName Get User
 * @apiGroup User
 * @apiSuccess {User} Return the User
 * @apiError (401) {String} Error Username not found
 */
router.get('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	User
	.findById(req.payload.id)
	.then((user: IUserModel) => {
		res.status(200).json({ user: user.formatAsUserJSON() });
	})
	.catch(next);
});

/**
 * @api {put} /user/
 * @apiName Put User
 * @apiGroup User
 * @apiSuccess {User} User Return the User
 * @apiError (Error 401) {String} Error Username not found
 * @apiError (Error 403) {String} Error You must be logged in
 */
router.put('/', authentication.required, (req: JWTRequest, res: Response, next: NextFunction) => {
	User
	.findById(req.payload.id)
	.then((user: IUserModel) => {
		if (!user) {
			return res.sendStatus(401);
		}
		if (typeof req.body.user.email !== 'undefined') {
			user.email = req.body.user.email;
		}
		if (typeof req.body.user.username !== 'undefined') {
			user.username = req.body.user.username;
		}
		if (typeof req.body.user.password !== 'undefined') {
			user.setPassword(req.body.user.password);
		}
		return user.save().then(() => {
			return res.json({ user: user.formatAsUserJSON() });
		});
	}).catch(next);
});

/**
 * @api {post} /user/
 * @apiName Create new user
 * @apiGroup Users
 * @apiSuccess {Users} Users The user has been created
 * @apiError (401) {String} Error Username not found
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {

	const user: IUserModel = new User();
	user.username = req.body.user.username;
	user.email = req.body.user.email;
	user.setPassword(req.body.user.password);

	try {
		await user.save();
		return res.json({ user: user.formatAsUserJSON() });
	} catch (err) {
		return next(err);
	}
});

/**
 * @api {post} /users/login
 * @apiName Log user
 * @apiGroup Users
 * @apiSuccess {Users} Users The user is logged in
 * @apiError (401) {String} Error Failed authentication
 */
router.post('/login', (req: Request, res: Response, next: NextFunction) => {

	if (!req.body.user.email)  {
		return res.status(422).json({ errors: { email: "Can't be blank" } });
	}

	if (!req.body.user.password)  {
		return res.status(422).json({ errors: { password: "Can't be blank" } });
	}

	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err) { return next(err); }

		if (user) {
			user.token = user.generateJWT();
			return res.json({ user: user.formatAsUserJSON() });

		}
		return res.status(422).json(info);

	})(req, res, next);

});
export const UserRoutes: Router = router;
