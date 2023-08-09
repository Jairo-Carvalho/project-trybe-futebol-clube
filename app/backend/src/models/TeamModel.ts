import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import ITeam from '../interfaces/teams/ITeam';
import { ITeamModel } from '../interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamsModel;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);

    if (dbData === null) return null;

    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
