import { calculateBasketballPlayerRating, calculateHandballPlayerRating } from 'models/Sports/ProcessSports';
import { startSeedingData } from 'controllers/DataSeeder';
import { mvpOfSport } from 'controllers/Judge';

startSeedingData()
const basketballMvp = mvpOfSport('BASKETBALL', calculateBasketballPlayerRating)
const handballMvp = mvpOfSport('HANDBALL', calculateHandballPlayerRating)

console.log(
  'Basketball MVP is:',
  basketballMvp.nickname,
  'with overall rating:',
  basketballMvp.overallRating
);

console.log(
  'Handball MVP is:',
  handballMvp.nickname,
  'with overall rating:',
  handballMvp.overallRating
);
