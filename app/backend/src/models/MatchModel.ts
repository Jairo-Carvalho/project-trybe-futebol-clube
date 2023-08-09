import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import { IMatch } from '../interfaces/matches/IMatch';
import { IMatchModel } from '../interfaces/matches/IMatchModel';
import TeamModel from '../database/models/SequelizeTeamsModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchesModel;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
          // attributes: ['teamName'], // outra forma de fazer, neste caso, capturando apenas a chave que queremos.
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
          // attributes: ['teamName'], // outra forma de fazer, neste caso, capturando apenas a chave que queremos.
        },
      ],
    });
    return dbData;
  }

  async findByProgress(progressParam: string): Promise<IMatch[]> {
    const stringToBoolean = progressParam === 'true';
    const dbData = await this.model.findAll({
      where: { inProgress: stringToBoolean },
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
          // attributes: ['teamName'], // outra forma de fazer, neste caso, capturando apenas a chave que queremos.
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
          // attributes: ['teamName'], // outra forma de fazer, neste caso, capturando apenas a chave que queremos.
        },
      ],
    });
    return dbData;
  }

  async updateById(id: number): Promise<number> {
    const [affectedCount] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    return affectedCount;
  }

  async updateMatchInProgress(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<number> {
    const [affectedCount] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return affectedCount;
  }

  async createNewMatch(match: Omit<IMatch, 'id'>): Promise<IMatch> {
    const dbData = await this.model.create(match);
    const {
      id,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      homeTeamId,
      inProgress,
    }: IMatch = dbData;

    return {
      id,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      homeTeamId,
      inProgress,
    };
  }
}
