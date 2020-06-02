import { Match, SportName, Player, PlayerResult } from "config/types";
import { loadAllMatches } from "models/MatchModel";

export function mvpOfSport(
  sportName: SportName,
  calculatePlayerRating: (player: Player) => PlayerResult
) {
  const matches = loadAllMatches(sportName)
  const allPlayers = crawlAllMatches(matches, calculatePlayerRating)
  return getMvpOfTheSport(allPlayers)
}

function crawlAllMatches(
  matches: Match[],
  calculatePlayerRating: (player: Player) => PlayerResult
) {
  const allPlayers: { [nickname: string]: Player } = {}
  for (let match of matches) {
    const winnerTeam = decideWinnerTeam(match, calculatePlayerRating)
    if (!winnerTeam) {
      throw new Error(`Match ${match.matchName} doesn't have a winner team. ${winnerTeam}`)
    }
    match.players.forEach(p => {
      if (p.team.teamName === winnerTeam) {
        p.overallRating += 10
      }
      if (!allPlayers[p.nickname]) {
        allPlayers[p.nickname] = p
        return;
      }
      allPlayers[p.nickname].overallRating += p.overallRating
    })
  }
  return allPlayers
}

function decideWinnerTeam(
  match: Match,
  calculatePlayerRating: (player: Player) => PlayerResult
) {
  const results: { [team: string]: number } = {}
  for (let player of match.players) {
    if (!results[player.team.teamName]) {
      results[player.team.teamName] = 0
    }
    const { overall, teamPoints } = calculatePlayerRating(player)
    results[player.team.teamName] += teamPoints
    player.overallRating = overall
  }
  return Object.keys(results)
    .reduce((teamName, current) => {
      const currentResult = results[current]
      const prevResult = results[teamName] || -Infinity
      return currentResult > prevResult ? current : teamName
    }, '')
}

function getMvpOfTheSport(players: { [nickname: string]: Player }) {
  const candidates = Object.keys(players)
    .map(key => players[key])
    .sort((p1, p2) => p2.overallRating - p1.overallRating)
  return candidates[0]
}