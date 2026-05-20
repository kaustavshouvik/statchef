const { getProbability } = require('./probability');

const initialPoints = {
  RCB: 18,
  GT: 16,
  SRH: 16,
  RR: 14,
  PBKS: 13,
  CSK: 12,
  DC: 12,
  KKR: 11,
  MI: 8,
  LSG: 8,
};

const matches = ['MI-KKR', 'GT-CSK', 'SRH-RCB', 'LSG-PBKS', 'MI-RR', 'KKR-DC'];

const WIN_POINTS = 2;
const DRAW_POINTS = 1;

const QUALIFIED_SCENARIOS = {
  RCB: 0,
  GT: 0,
  SRH: 0,
  RR: 0,
  PBKS: 0,
  CSK: 0,
  DC: 0,
  KKR: 0,
  MI: 0,
  LSG: 0,
};
let TOTAL = 0;

const displayQualifiedScenarios = () => {
  for (const team in QUALIFIED_SCENARIOS) {
    const scenarios = QUALIFIED_SCENARIOS[team];
    const percentage = (scenarios / TOTAL) * 100;
    console.log(`${team}: ${scenarios} scenarios (${percentage.toFixed(2)}%)`);
  }
};

const tbd = (points) => {
  const teamProbs = getProbability(points, 4);
  for (const team in teamProbs) {
    QUALIFIED_SCENARIOS[team] += teamProbs[team];
  }
};

const dfs = (at, points) => {
  if (at === matches.length) {
    // console.log('--END--');
    // console.log(points);
    tbd(points);
    TOTAL += 1;
    return;
  }

  const match = matches[at];
  const [team1, team2] = match.split('-');

  // Team 1 wins
  points[team1] += WIN_POINTS;
  dfs(at + 1, points);
  points[team1] -= WIN_POINTS;

  // Team 2 wins
  points[team2] += WIN_POINTS;
  dfs(at + 1, points);
  points[team2] -= WIN_POINTS;

  // Draw
  points[team1] += DRAW_POINTS;
  points[team2] += DRAW_POINTS;
  dfs(at + 1, points);
  points[team1] -= DRAW_POINTS;
  points[team2] -= DRAW_POINTS;
};

dfs(0, { ...initialPoints });

// console.log(QUALIFIED_SCENARIOS);
displayQualifiedScenarios();
// console.log({ TOTAL });
