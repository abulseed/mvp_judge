import { Match } from 'config/types';
import { addMatch } from 'utils/DataSource/methods';

export function saveMatchData(match: Match) {
  addMatch(match);
}