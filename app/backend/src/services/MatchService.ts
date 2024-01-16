import MatchModel from '../models/MatchModel';
import { IMatch, IMatchRequest } from '../interfaces/matches/IMatch';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  private matchModel: MatchModel;
  private teamModel: TeamModel;
  constructor() {
    this.matchModel = new MatchModel();
    this.teamModel = new TeamModel();
  }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    if (!allMatches) {
      return { status: 'NOT_FOUND', data: { message: 'Not Found' } };
    }
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getByProgress(progressParam: string): Promise<ServiceResponse<IMatch[]>> {
    const matchesInProgress = await this.matchModel.findByProgress(progressParam);
    /* if (!matchesInProgress) {
      return { status: 'NOT_FOUND', data: { message: 'Not Found' } };
    } */
    return { status: 'SUCCESSFUL', data: matchesInProgress };
  }

  public async updateById(id: number): Promise<ServiceResponse<IMatch[]>> {
    const updatedMatch = await this.matchModel.updateById(id);
    if (updatedMatch === 0) {
      return { status: 'NOT_FOUND', data: { message: 'Not Found' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchInProgress(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch[]>> {
    await this.matchModel
      .updateMatchInProgress(id, homeTeamGoals, awayTeamGoals);

    return { status: 'SUCCESSFUL', data: { message: 'Placar Atualizado' } };
  }

  public async createNewMatch(match: IMatchRequest): Promise<ServiceResponse<IMatch>> {
    const homeTeamId = await this.teamModel.findById(match.homeTeamId);
    const awayTeamId = await this.teamModel.findById(match.awayTeamId);

    if (!homeTeamId || !awayTeamId) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createNewMatch({ ...match, inProgress: true });
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
