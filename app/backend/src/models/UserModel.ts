import SequelizeUsersModel from '../database/models/SequelizeUsersModel';
import { IUser } from '../interfaces/users/IUser';
import { IUserModel } from '../interfaces/users/IUserModel';

export default class SequelizeUserModel implements IUserModel {
  private model = SequelizeUsersModel;

  async findOne(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return !user ? null : user;
  }
}
