import { Sport, Match, SportName, Player, BasketballPlayer, HandballPlayer, PlayerResult } from 'config/types';
import { addSport, getSport, getAllSports } from 'utils/DataSource/methods';
import { validateSportName } from 'utils/Validators';

export function saveSportData(line: string) {
  const sport = sportFactory(line)
  addSport(sport)
  return sport.sportName
}

export function loadAllSportsData() {
  return getAllSports()
}

export function addMatchToSport(match: Match, sportName: SportName) {
  const sport = getSport(sportName)
  sport.matches[match.matchName] = match
  return sport.matches.length
}

function sportFactory(line: string) {
  const sportName = validateSportName(line)
  return getSport(sportName as SportName) || {
    sportName,
    matches: {},
    mvp: null
  } as Sport
}

export function calculateBasketballPlayerRating(player: Player): PlayerResult {
  const basketballPlayer = player as BasketballPlayer
  switch (basketballPlayer.position) {
    case 'G':
      return {
        overall: (2 * basketballPlayer.scoredPoints) + (3 * basketballPlayer.rebounds) + (1 * basketballPlayer.assists),
        teamPoints: basketballPlayer.scoredPoints
      }
    case 'F':
      return {
        overall: (2 * basketballPlayer.scoredPoints) + (2 * basketballPlayer.rebounds) + (2 * basketballPlayer.assists),
        teamPoints: basketballPlayer.scoredPoints
      }
    case 'C':
      return {
        overall: (2 * basketballPlayer.scoredPoints) + (1 * basketballPlayer.rebounds) + (3 * basketballPlayer.assists),
        teamPoints: basketballPlayer.scoredPoints
      }
  }
}

export function calculateHandballPlayerRating(player: Player): PlayerResult {
  const handballPlayer = player as HandballPlayer
  switch (handballPlayer.position) {
    case 'G':
      return {
        overall: handballPlayer.initialRating +
          (5 * handballPlayer.goalsMade) +
          (-2 * handballPlayer.goalsReceived),
        teamPoints: handballPlayer.goalsMade
      }
    case 'F':
      return {
        overall: handballPlayer.initialRating +
          (1 * handballPlayer.goalsMade) +
          (-1 * handballPlayer.goalsReceived),
        teamPoints: handballPlayer.goalsMade
      }
  }
}
