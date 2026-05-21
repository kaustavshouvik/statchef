import { useState } from 'react';

const matches = [
  {
    team1: 'Team A',
    team2: 'Team B',
  },
  {
    team1: 'Team C',
    team2: 'Team D',
  },
];

function MatchOutcomeButton({ team, disabled = false }) {
  const [selected, setSelected] = useState(false);

  const baseClass =
    'flex flex-col items-center rounded-xl border px-4 py-3 text-center transition-all';

  const selectedClass = selected
    ? 'border-black bg-black text-white'
    : 'border-gray-200 bg-white hover:bg-gray-100';

  const disabledClass = disabled ? 'cursor-not-allowed opacity-50 hover:bg-white' : '';

  const handleClick = () => {
    if (disabled) return;
    setSelected(!selected);
  };

  if (team) {
    return (
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`${baseClass} ${selectedClass} ${disabledClass}`}
      >
        <div className="text-sm font-semibold tracking-wide">{team}</div>

        <div className={`text-xs ${selected ? 'text-gray-300' : 'text-gray-500'}`}>wins</div>
      </button>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`${baseClass} ${selectedClass} ${disabledClass}`}
    >
      <div className="text-sm font-semibold tracking-wide">ABANDONED</div>

      <div className="text-xs text-gray-500">no result</div>
    </button>
  );
}

function Match({ index, team1, team2, disabled }) {
  return (
    <div className="mb-3 grid grid-cols-[auto_1fr] items-start gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white font-bold">
        {index + 1}
      </div>

      <div className="flex flex-col gap-2">
        <div>
          {team1} vs {team2}
        </div>

        <div className="flex gap-2">
          <MatchOutcomeButton team={team1} disabled={disabled} />

          <MatchOutcomeButton disabled={disabled} />

          <MatchOutcomeButton team={team2} disabled={disabled} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="m-4">
      <h2 className="text-3xl">Qualification Predictions</h2>
      <h4>Pick an outcome for each match.</h4>
      <hr className="border-t border-gray-300 my-4"></hr>
      <div className="grid grid-cols-[1.25fr_2fr_2fr] gap-4 divide-x">
        <div>
          <h2 className="text-center text-xl tracking-tight mb-5">Match Outcomes</h2>
          {matches.map((match, index) => (
            <Match key={index} index={index} team1={match.team1} team2={match.team2} />
          ))}
        </div>
        <div>
          <h2 className="text-center text-xl tracking-tight mb-5">Qualification Chances</h2>
        </div>
        <div>
          <h2 className="text-center text-xl tracking-tight mb-5">Effective Points</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
