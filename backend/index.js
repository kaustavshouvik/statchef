const initialPoints = { A: 10, B: 7, C: 5 };

const matches = ['AB', 'BC'];

const WIN_POINTS = 2;
const DRAW_POINTS = 1;

const QUALIFIED_SCENARIOS = { A: 0, B: 0, C: 0 };

const displayQualifiedScenarios = () => {
  for (const team in QUALIFIED_SCENARIOS) {
    const scenarios = QUALIFIED_SCENARIOS[team];
    const percentage = (scenarios / 9) * 100;
    console.log(`${team}: ${scenarios} scenarios (${percentage.toFixed(2)}%)`);
  }
};

const tbd = (points) => {
  const pointToTeams = {};
  for (const team in points) {
    const point = points[team];
    if (!pointToTeams[point]) {
      pointToTeams[point] = [];
    }
    pointToTeams[point].push(team);
  }

  // console.log({ pointToTeams });

  // Max two points
  const [max1, max2] = Object.keys(pointToTeams)
    .map(Number)
    .sort((a, b) => b - a);

  // console.log({ max1, max2 });

  if (pointToTeams[max1].length === 2) {
    for (const team of pointToTeams[max1]) {
      QUALIFIED_SCENARIOS[team] += 1;
    }

    return;
  }

  for (const team of pointToTeams[max1]) {
    QUALIFIED_SCENARIOS[team] += 1.0 / pointToTeams[max1].length;
  }

  for (const team of pointToTeams[max2]) {
    QUALIFIED_SCENARIOS[team] += 1.0 / pointToTeams[max2].length;
  }
};

// A - 12
// B - 7
// C - 7

const dfs = (at, points) => {
  if (at === matches.length) {
    // console.log('--END--');
    // console.log(points);
    tbd(points);
    return;
  }

  const match = matches[at];
  const [team1, team2] = match.split('');

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
