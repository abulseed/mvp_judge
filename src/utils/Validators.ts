import { BASKETBALL_POSITION, HANDBALL_POSITION, SPORTS } from 'config/constants'
import { SportName, BasketballPosition, HandballPosition } from 'config/types'

export function validateStringValue(value: any, msg?: string) {
  if (!value || typeof value !== 'string') {
    throw new Error(`Invalid string value: ${value}. ${msg}`)
  }
  return value as string
}

export function validateNumberValue(value: any) {
  const numValue = Number(value)
  if (isNaN(numValue)) {
    throw new Error(`Invalid number value: ${numValue}`)
  }
  return numValue
}

export function validateSportName(sportName: unknown){
  const sportNameString = validateStringValue(sportName)
  switch (sportNameString as SportName) {
    case 'BASKETBALL':
    case 'HANDBALL':
      return SPORTS[sportNameString as SportName]
  
    default:
      throw new Error(`Invalid sport name: ${sportName}`)
  }
}

export function validatePlayerPosition(sport: SportName, position: unknown) {
  const positionString = validateStringValue(position)
  switch (sport) {
    case 'BASKETBALL':
      switch (positionString as BasketballPosition) {
        case 'C':
        case 'F':
        case 'G':
          return BASKETBALL_POSITION[positionString as BasketballPosition];

        default:
          throw new Error(`Invalid basketball position: ${positionString}`)
      }

    case 'HANDBALL':
      switch (positionString as HandballPosition) {
        case 'F':
        case 'G':
          return HANDBALL_POSITION[positionString as HandballPosition]

        default:
          throw new Error(`Invalid handball position: ${positionString}`)
      }
  }
}