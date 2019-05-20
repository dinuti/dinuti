
import { Router, Response, NextFunction, Request } from 'express';
import { IUserModel, User } from '../models/user-model';
import * as passport from 'passport';

const router: Router = Router();

/**
 * @api {post} /users/
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

export const UsersRoutes: Router = router;
