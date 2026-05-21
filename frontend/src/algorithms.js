import { MATCHES, TEAMS } from './ipl';

const WIN_POINTS = 2;
const DRAW_POINTS = 1;

const getProbability = (points, maxTeams) => {
  const teamPoints = Object.entries(points).sort((a, b) => b[1] - a[1]);

  const res = {};
  for (const team in points) {
    res[team] = 0;
  }

  let i = 0;
  const n = teamPoints.length;
  while (i < n) {
    const currentPoint = teamPoints[i][1];
    let teams = [];

    while (i < n && teamPoints[i][1] === currentPoint) {
      teams.push(teamPoints[i][0]);
      i++;
    }

    const teamProb = i <= maxTeams ? 1 : 1.0 / teams.length;
    for (const team of teams) {
      res[team] += teamProb;
    }

    if (i > maxTeams) {
      break;
    }
  }

  return res;
};

export const dfs = (at, points) => {
  if (at === MATCHES.length) {
    const teamProbs = getProbability(points, 4);

    return {
      total: 1,
      probs: teamProbs,
    };

    // return;
  }

  const res = {
    total: 0,
    probs: {},
  };

  const match = MATCHES[at];
  const { team1, team2 } = match;

  // Team 1 wins
  points[team1] += WIN_POINTS;
  const res1 = dfs(at + 1, points);
  points[team1] -= WIN_POINTS;

  // Team 2 wins
  points[team2] += WIN_POINTS;
  const res2 = dfs(at + 1, points);
  points[team2] -= WIN_POINTS;

  // Draw
  points[team1] += DRAW_POINTS;
  points[team2] += DRAW_POINTS;
  const res3 = dfs(at + 1, points);
  points[team1] -= DRAW_POINTS;
  points[team2] -= DRAW_POINTS;

  res.total = res1.total + res2.total + res3.total;
  for (const team of Object.values(TEAMS)) {
    res.probs[team] = (res1.probs[team] || 0) + (res2.probs[team] || 0) + (res3.probs[team] || 0);
  }

  return res;
};
