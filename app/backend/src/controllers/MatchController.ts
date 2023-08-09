import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const matchesInProgress = req.query.inProgress as string;
    if (matchesInProgress === undefined) {
      const serviceResponse = await this.matchService.getAllMatches();
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchService.getByProgress(matchesInProgress);
    return res.status(200).json(serviceResponse.data);
  }

  public async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.updateById(Number(id));
    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatchInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchService
      .updateMatchInProgress(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(serviceResponse.data);
  }

  public async createNewMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createNewMatch(req.body);
    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(404).json(serviceResponse.data);
    }
    res.status(201).json(serviceResponse.data);
  }
}
