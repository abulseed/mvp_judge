import { Sport, Player, Match, Team, SportName } from 'config/types';
import { sports, players, matches, teams } from './variables';

export function addSport(sport: Sport){
  sports[sport.sportName] = sport
}

export function getSport(sportName: SportName){
  return sports[sportName];
}

export function getAllSports(){
  return sports;
}

export function addPlayer(player: Player){
  players.push(player)
}

export function getPlayer(nickname: string){
  return players.find(p => p.nickname === nickname)
}

export function getAllPlayers(){
  return players;
}

export function addMatch(match: Match){
  matches.push(match)
}

export function getAllMatches(){
  return matches;
}

export function getMatchesBySport(sportName: SportName){
  return matches.slice().filter(match => match.sportName === sportName)
}

export function addTeam(team: Team){
  teams[team.teamName] = team
}