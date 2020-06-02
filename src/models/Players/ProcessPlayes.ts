import { validateStringValue, validateNumberValue, validatePlayerPosition } from 'utils/Validators';
import {
  BasketballPosition,
  HandballPosition,
  SportName,
  Player,
  BasketballPlayer,
  HandballPlayer,
  Match
} from 'config/types';
import { addPlayer, getAllPlayers, getSport } from 'utils/DataSource/methods';

export function loadAllPlayers() {
  return getAllPlayers()
}

export function savePlayerData(matchName: string, line: string, sportName: SportName) {
  const player = playerFactory(line, sportName)
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
  match.players.push(player)
  return player.nickname
}

function playerFactory(line: string, sportName: SportName) {
  const playerData = line.split(';');
  return validatePlayerData(playerData, sportName);
}

function validatePlayerData(playerData: string[], sportName: SportName): Player {
  if (!playerData || !playerData.length) {
    throw new Error(`Failed reading player data: ${playerData.join()}`)
  }
  console.log(playerData)
  const playerName = validateStringValue(playerData[0], 'playerName')
  const nickname = validateStringValue(playerData[1], 'nickname')
  const jerseyNumber = validateNumberValue(playerData[2])
  const teamName = validateStringValue(playerData[3], 'teamName')
  const position = validatePlayerPosition(sportName, playerData[4])
  const performanceData = calculatePerformanceData(sportName, position, playerData)
  return {
    playerName,
    nickname,
    jerseyNumber,
    team: { teamName },
    ...performanceData
  } as BasketballPlayer | HandballPlayer
}

function calculatePerformanceData(sportName: SportName, position: string, playerData: string[]) {
  let scoredPoints = 0
  let rebounds = 0
  let assists = 0
  let initialRating = 0
  let goalsMade = 0
  let goalsReceived = 0
  switch (sportName) {
    case 'BASKETBALL':
      scoredPoints = validateNumberValue(playerData[5])
      rebounds = validateNumberValue(playerData[6])
      assists = validateNumberValue(playerData[7])
      return {
        position: position as BasketballPosition,
        scoredPoints,
        rebounds,
        assists
      }

    case 'HANDBALL':
      initialRating = getInitialRating(position as HandballPosition)
      goalsMade = validateNumberValue(playerData[5])
      goalsReceived = validateNumberValue(playerData[6])
      return {
        position: position as HandballPosition,
        initialRating,
        goalsMade,
        goalsReceived
      }

    default:
      throw new Error(`Invalid sport name: ${sportName}`)
  }
}

function getInitialRating(position: HandballPosition) {
  switch (position) {
    case 'G':
      return 50

    case 'F':
      return 20

    default:
      throw new Error(`Invalid handball position: ${position}`)
  }
}

