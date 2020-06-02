import { Team } from 'config/types';
import { addTeam } from 'utils/DataSource/methods';

export function saveTeamData(team: Team){
  addTeam(team)
}