import { readAllInputFiles } from 'utils/InputReader';
import { saveSportData, addMatchToSport } from 'models/Sports/ProcessSports';
import { Sport, SportName, Match } from 'config/types';
import { savePlayerData, loadAllPlayers } from 'models/Players/ProcessPlayes';
import { saveMatchData } from 'models/Matches/ProcessMatches';

let linesCounter = 0
let sport: SportName | null = null
let match: Match | null = null
function processInputLine(filename: string) {
  function saveLineData(line: string) {
    if (!linesCounter) {
      sport = saveSportData(line)
    } else {
      savePlayerData(filename, line, sport!)
    }
    linesCounter++
  }
  return saveLineData
}

function completeReadFile() {
  linesCounter = 0
}

