import { SportName } from 'config/types';
import { getAllMatches } from 'utils/DataSource/methods';

export function loadAllMatches(sportName: SportName){
  return getAllMatches(sportName)
}