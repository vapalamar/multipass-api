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

    res.send(data);
  }

  async get(req: Request, res: Response, next: NextFunction) {
    const data = await User.get(req.params.email);

    res.send(data);
  }

  async add(req: Request, res: Response, next: NextFunction) {
    const additionRes = await User.add(req.body);

    res.send(additionRes);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const updateRes = await User.update(req.body);

    res.send(updateRes);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const deleteRes = await User.del(req.body.email);

    res.send(deleteRes);
  }

  private init() {
    this.router.get('/', this.getAll);
    this.router.get('/:email', this.get);
    this.router.delete('/', this.delete);
    this.router.put('/', this.update);
    this.router.post('/', this.add);
  }
}

export default new UserRouter().router;