import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderBoardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getHomeTeam(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getHomeTeam();
    res.status(200).json(serviceResponse.data);
  }

  public async getAwayTeam(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAwayTeam();
    res.status(200).json(serviceResponse.data);
  }
}
