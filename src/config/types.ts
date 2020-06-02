import { SPORTS, BASKETBALL_POSITION, HANDBALL_POSITION } from './constants'

export interface Sport {
  sportName: SportName;
  matches: {[matchName: string]: Match};
  mvp: Player | null;
}

export type SportName = keyof typeof SPORTS

export interface Player {
  playerName: string;
  nickname: string;
  jerseyNumber: number;
  team: Team;
}

export interface BasketballPlayer extends Player {
  position: BasketballPosition;
  scoredPoints: number;
  rebounds: number;
  assists: number;
}

export type BasketballPosition = keyof typeof BASKETBALL_POSITION

export interface HandballPlayer extends Player {
  position: HandballPosition;
  initialRating: number;
  goalsMade: number;
  goalsReceived: number;
}

export type HandballPosition = keyof typeof HANDBALL_POSITION

export interface Team {
  teamName: string;
}

export interface Match {
  matchName: string;
  sportName: SportName;
  players: Player[];
}