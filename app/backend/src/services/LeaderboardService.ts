import LeaderboardModel from '../models/LeaderboardModel';
import {
  ILeaderboardAway,
  ILeaderboardRequest,
  ILeaderboard } from '../interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../interfaces/ServiceResponse';

export default class LeaderboardService {
  private leaderboardModel: LeaderboardModel;
  constructor() { this.leaderboardModel = new LeaderboardModel(); }

  public async getHomeTeam(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboardHome = await this.leaderboardModel.findAll();
    const result = leaderboardHome.map((match: ILeaderboardRequest) => ({
      name: match.teamName,
      totalPoints: (LeaderboardService.victories(match) * 3) + LeaderboardService.draws(match),
      totalGames: match.homeMatch.length,
      totalVictories: LeaderboardService.victories(match),
      totalDraws: LeaderboardService.draws(match),
      totalLosses: LeaderboardService.losses(match),
      goalsFavor: LeaderboardService.favor(match),
      goalsOwn: LeaderboardService.own(match),
      goalsBalance: LeaderboardService.favor(match) - LeaderboardService.own(match),
      efficiency: ((((LeaderboardService.victories(match) * 3) + LeaderboardService
        .draws(match)) / (match.homeMatch.length * 3)) * 100).toFixed(2),
    }));
    const classification = result.sort((teamA: ILeaderboard, teamB: ILeaderboard) => (
      teamB.totalPoints - teamA.totalPoints || teamB.totalVictories - teamA.totalVictories
          || teamB.goalsBalance - teamA.goalsBalance || teamB.goalsFavor - teamA.goalsFavor));
    return { status: 'SUCCESSFUL', data: classification };
  }

  static victories(param: ILeaderboardRequest): number {
    const result = param.homeMatch.map((sg) => sg.homeTeamGoals - sg.awayTeamGoals)
      .filter((item) => item > 0).length;
    return result;
  }

  static draws(param: ILeaderboardRequest): number {
    const result = param.homeMatch.map((sg) => sg.homeTeamGoals - sg.awayTeamGoals)
      .filter((item) => item === 0).length;
    return result;
  }

  static losses(param: ILeaderboardRequest): number {
    const result = param.homeMatch.map((sg) => sg.homeTeamGoals - sg.awayTeamGoals)
      .filter((item) => item < 0).length;
    return result;
  }

  static favor(param: ILeaderboardRequest): number {
    const result = param.homeMatch.reduce((acc, item) => acc + item.homeTeamGoals, 0);
    return result;
  }

  static own(param: ILeaderboardRequest): number {
    const result = param.homeMatch
      .reduce((acc, item) => acc + item.awayTeamGoals, 0);
    return result;
  }

  public async getAwayTeam(): Promise<ServiceResponse<ILeaderboard>> {
    const leaderboardAway = await this.leaderboardModel.findAllAway();
    const result = leaderboardAway.map((match: ILeaderboardAway) => ({
      name: match.teamName,
      totalPoints: (LeaderboardService.victories2(match) * 3) + LeaderboardService.draws2(match),
      totalGames: match.awayMatch.length,
      totalVictories: LeaderboardService.victories2(match),
      totalDraws: LeaderboardService.draws2(match),
      totalLosses: LeaderboardService.losses2(match),
      goalsFavor: match.awayMatch.reduce((acc, param) => acc + param.awayTeamGoals, 0),
      goalsOwn: match.awayMatch.reduce((acc, param) => acc + param.homeTeamGoals, 0),
      goalsBalance: LeaderboardService.favor2(match) - LeaderboardService.own2(match),
      efficiency: ((((LeaderboardService.victories2(match) * 3) + LeaderboardService
        .draws2(match)) / (match.awayMatch.length * 3)) * 100).toFixed(2),
    }));
    const classification = result.sort((teamA: ILeaderboard, teamB: ILeaderboard) => (
      teamB.totalPoints - teamA.totalPoints || teamB.totalVictories - teamA.totalVictories
          || teamB.goalsBalance - teamA.goalsBalance || teamB.goalsFavor - teamA.goalsFavor));
    return { status: 'SUCCESSFUL', data: classification };
  }

  static victories2(param: ILeaderboardAway): number {
    const result = param.awayMatch.map((sg) => sg.awayTeamGoals - sg.homeTeamGoals)
      .filter((item) => item > 0).length;
    return result;
  }

  static draws2(param: ILeaderboardAway): number {
    const result = param.awayMatch.map((sg) => sg.awayTeamGoals - sg.homeTeamGoals)
      .filter((item) => item === 0).length;
    return result;
  }

  static losses2(param: ILeaderboardAway): number {
    const result = param.awayMatch.map((sg) => sg.awayTeamGoals - sg.homeTeamGoals)
      .filter((item) => item < 0).length;
    return result;
  }

  static favor2(param: ILeaderboardAway): number {
    const result = param.awayMatch.reduce((acc, item) => acc + item.awayTeamGoals, 0);
    return result;
  }

  static own2(param: ILeaderboardAway): number {
    const result = param.awayMatch
      .reduce((acc, item) => acc + item.homeTeamGoals, 0);
    return result;
  }
}

// (sg) = saldo de gols
