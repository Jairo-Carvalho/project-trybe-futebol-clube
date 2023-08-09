import TeamModel from '../models/TeamModel';
import ITeam from '../interfaces/teams/ITeam';
import { ServiceResponse } from '../interfaces/ServiceResponse';

export default class TeamService {
  private teamModel: TeamModel;
  constructor() { this.teamModel = new TeamModel(); }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const teamId = await this.teamModel.findById(id);

    if (!teamId) {
      return { status: 'NOT_FOUND', data: { message: `Oops. Team ${id} not found!` } };
    }

    return { status: 'SUCCESSFUL', data: teamId };
  }
}
