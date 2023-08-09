import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { BodyLogin, IUser } from '../interfaces/users/IUser';
import { IUserModel } from '../interfaces/users/IUserModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import JWTToken from '../utils/JWTToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private userToken = new JWTToken(),
  ) { }

  public async findEmail(body: BodyLogin): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findOne(body.email);

    if (!user) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const verifyPassword = bcrypt.compareSync(body.password, user.password);

    if (!verifyPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { email, role } = user;

    const token = this.userToken.sign({ email, role });

    return { status: 'SUCCESSFUL', data: token };
  }
}
