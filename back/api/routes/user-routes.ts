
import { IUserModel, User } from '../models/user-model';
import { authentication } from '../utilities/authentication';
import { NextFunction,  Response, Router } from 'express';
import { JWTRequest } from '../interfaces/requests-interface';

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
					res.status(200).json({user: user.formatAsUserJSON()});
				}
			)
			.catch(next);

	}
);


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

				if (typeof req.body.user.email !== 'undefined' ) {
					user.email = req.body.user.email;
				}
				if (typeof req.body.user.username !== 'undefined') {
					user.username = req.body.user.username;
				}
				if (typeof req.body.user.password !== 'undefined') {
					user.setPassword(req.body.user.password);
				}

				return user.save().then( () => {
					return res.json({user: user.formatAsUserJSON()});
				});
			})
			.catch(next);
	}

);


export const UserRoutes: Router = router;
