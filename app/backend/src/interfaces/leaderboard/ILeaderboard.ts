export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency?: string | number,
}

interface HomeMatch {
  'homeTeamId': number,
  'homeTeamGoals': number,
  'awayTeamId': number,
  'awayTeamGoals': number,
  'inProgress': boolean,
}

export interface ILeaderboardRequest {
  teamName: string,
  homeMatch: HomeMatch[],
}

export interface ILeaderboardAway {
  teamName: string,
  awayMatch: HomeMatch[],
}
