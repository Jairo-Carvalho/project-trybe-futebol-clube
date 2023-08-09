import { ILeaderboardModel } from '../interfaces/leaderboard/ILeaderboardModel';
import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import TeamModel from '../database/models/SequelizeTeamsModel';
// import { ILeaderboardRequest } from '../interfaces/leaderboard/ILeaderboard';

export default class LeaderboardModel implements ILeaderboardModel {
  private teamModel = TeamModel;

  async findAll(): Promise<any> {
    const dbData = await this.teamModel.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { model: SequelizeMatchesModel,
          as: 'homeMatch',
          attributes: { exclude: ['id'] },
          where: { inProgress: false },
        },
      ],
    });
    console.log(dbData[0].dataValues);

    return dbData;
  }

  async findAllAway(): Promise<any> {
    const dbData = await this.teamModel.findAll({
      attributes: { exclude: ['id'] },
      include: [
        { model: SequelizeMatchesModel,
          as: 'awayMatch',
          attributes: { exclude: ['id'] },
          where: { inProgress: false },
        },
      ],
    });

    return dbData;
  }
}
