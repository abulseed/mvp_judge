import { readAllInputFiles } from 'utils/InputReader';
import { saveSportData, loadAllSportsData } from 'models/Sports/ProcessSports';
import { Sport, SportName, Match } from 'config/types';
import { savePlayerData, loadAllPlayers } from 'models/Players/ProcessPlayes';
import { saveMatchData } from 'models/Matches/ProcessMatches';
import { loadDataFromSource } from 'utils/DataLoader';
import { getSport } from 'utils/DataSource/methods';

let sport: SportName | null = null;
function processInputLine(sourceName: string) {
  function saveLineData(line: string, index?: number) {
    console.log(line, index)
    if (!index) {
      sport = saveSportData(line)
    } else {
      savePlayerData(sourceName, line, sport!)
    }
  }
  return saveLineData
}

loadDataFromSource(readAllInputFiles, processInputLine)
console.log('sports', JSON.stringify(loadAllSportsData(),null,2))