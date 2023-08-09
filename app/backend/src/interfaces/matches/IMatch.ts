export interface IMatch {
  id: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamId: number;
  inProgress: boolean;
}

export interface IMatchRequest {
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamId: number;
}
