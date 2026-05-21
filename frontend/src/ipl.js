const TEAMS = {
  CSK: 'CSK',
  DC: 'DC',
  GT: 'GT',
  KKR: 'KKR',
  LSG: 'LSG',
  MI: 'MI',
  PBKS: 'PBKS',
  RCB: 'RCB',
  RR: 'RR',
  SRH: 'SRH',
};

const INITIAL_POINTS = {
  [TEAMS.CSK]: 12,
  [TEAMS.DC]: 12,
  [TEAMS.GT]: 18,
  [TEAMS.KKR]: 13,
  [TEAMS.LSG]: 8,
  [TEAMS.MI]: 8,
  [TEAMS.PBKS]: 13,
  [TEAMS.RCB]: 18,
  [TEAMS.RR]: 14,
  [TEAMS.SRH]: 16,
};

const MATCHES = [
  {
    team1: TEAMS.SRH,
    team2: TEAMS.RCB,
  },
  {
    team1: TEAMS.LSG,
    team2: TEAMS.PBKS,
  },
  {
    team1: TEAMS.MI,
    team2: TEAMS.RR,
  },
  {
    team1: TEAMS.KKR,
    team2: TEAMS.DC,
  },
];

export { TEAMS, INITIAL_POINTS, MATCHES };
