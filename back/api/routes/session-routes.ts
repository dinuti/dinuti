import { Router, NextFunction, Response } from 'express';
import { authentication } from '../utilities/authentication';
import { JWTRequest, ProfileRequest } from '../interfaces/requests-interface';
import { ILocationModel, Location } from '../models/location-model';
import { User, IUserModel } from '../models/user-model';

const router: Router = Router();

/**
* @api {post} /session/
* @apiName Post Session
* @apiDescription Create a new Session
* @apiGroup Location
* @apiSuccess {Location} Location Location of the Session
* @apiError (401) {String} Error Error Unauthorized or Error Param not defined
*/

export const SessionRoutes: Router = router;