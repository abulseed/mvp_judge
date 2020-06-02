import { SportName } from "config/types";
import { saveSportData } from "models/Sports/ProcessSports";
import { savePlayerData } from "models/Players/ProcessPlayes";
import { loadDataFromSource } from "utils/DataLoader";
import { readAllInputFiles } from "utils/InputReader";

let sport: SportName | null = null;
function processInputLine(sourceName: string) {
  function saveLineData(line: string, index?: number) {
    if (!index) {
      sport = saveSportData(line)
    } else {
      savePlayerData(sourceName, line, sport!)
    }
  }
  return saveLineData
}

export function startSeedingData() {
  loadDataFromSource(readAllInputFiles, processInputLine)
}
