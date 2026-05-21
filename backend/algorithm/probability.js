// Extracts probability from an outcome.
const getProbability = (points, maxTeams) => {
  const teamPoints = Object.entries(points).sort((a, b) => b[1] - a[1]);

  const res = {};
  for (const team in points) {
    res[team] = 0;
  }

  let i = 0;
  const n = teamPoints.length;
  while (i < n && i < maxTeams) {
    const currentPoint = teamPoints[i][1];
    let teams = [];

    while (i < n && i < maxTeams && teamPoints[i][1] === currentPoint) {
      teams.push(teamPoints[i][0]);
      i++;
    }

    const teamProb = i <= maxTeams ? 1 : 1.0 / teams.length;
    for (const team of teams) {
      res[team] += teamProb;
    }
  }

  // console.log({ res });

  return res;
};

// getProbability(
//   {
//     RCB: 18,
//     GT: 18,
//     SRH: 16,
//     RR: 16,
//     PBKS: 15,
//     CSK: 14,
//     DC: 13,
//     KKR: 12,
//     MI: 8,
//     LSG: 8,
//   },
//   4,
// );

module.exports = { getProbability };
