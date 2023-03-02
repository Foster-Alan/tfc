export interface InHomeMatches {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface InTeamScore {
  id: number;
  teamName: string;
  homeMatches: InHomeMatches[];
}

export interface InTeamClassification {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
