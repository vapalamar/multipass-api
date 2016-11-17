import { Router, Request, Response, NextFunction } from 'express';
import User from './../models/User';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const data = await User.getAll();
    const normalizedUsers = data.rows.map(row => {
      return {
        email: row.id
      };
    });

    res.send(normalizedUsers);
  }

  private init() {
    this.router.get('/', this.getAll);
  }
}

export default new UserRouter().router;