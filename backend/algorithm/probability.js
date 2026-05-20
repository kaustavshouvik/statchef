// Extracts probability from an outcome.
const getProbability = (points, maxTeams) => {
  const teamPoints = Object.entries(points).sort((a, b) => b[1] - a[1]);

  const res = {};
  for (const team in points) {
    res[team] = 0;
  }

  let i = 0;
  const maxPoint = teamPoints[0][1];
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

// getProbability(
//   {
//     RCB: 5,
//     GT: 4,
//     SRH: 4,
//     RR: 3,
//     PBKS: 3,
//     CSK: 2,
//     DC: 2,
//     KKR: 2,
//     MI: 2,
//     LSG: 2,
//   },
//   4,
// );

module.exports = { getProbability };
