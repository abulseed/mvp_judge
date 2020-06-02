import { Sport, Match, SportName } from 'config/types';
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
  return {
    sportName,
    matches: {},
    mvp: null
  } as Sport
}
