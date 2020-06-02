import { Sport, Player, Match, SportName } from 'config/types';
import { sports } from './variables';

export function addSport(sport: Sport) {
  sports[sport.sportName] = sport
}

export function getSport(sportName: SportName) {
  return sports[sportName];
}

export function getAllSports() {
  return sports;
}

export function addPlayer(player: Player, sportName: SportName, matchName: string) {
  let match = addMatch(sportName, matchName)
  match.players.push(player)
}

export function addMatch(sportName: SportName, matchName: string) {
  const sport = getSport(sportName)
  let match = sport.matches[matchName]
  if (!match) {
    match = {
      matchName,
      players: [],
      sportName
    } as Match
    sport.matches[matchName] = match
  }
  return match
}

export function getAllMatches(sportName: SportName) {
  const sport = getSport(sportName)
  return Object.keys(sport.matches).map(key => sport.matches[key]);
}
