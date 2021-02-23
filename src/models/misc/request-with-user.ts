import {ApplicationUser} from "../../entity/application-user.entity";

﻿﻿import {Request} from 'express';

export interface RequestWithUser extends Request {
    user: ApplicationUser;
}