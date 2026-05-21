import { useState } from 'react';
import { Button } from '@/components/ui/button';

const matches = [
  {
    team1: 'Team A',
    team2: 'Team B',
  },
  {
    team1: 'Team C',
    team2: 'Team D',
  },
  {
    team1: 'Team A',
    team2: 'Team C',
  },
  {
    team1: 'Team B',
    team2: 'Team D',
  },
];

function MatchOutcomeButton({ team, selected, disabled, onClick }) {
  // const [selected, setSelected] = useState(false);

  const baseClass =
    'flex flex-col items-center rounded-xl border px-4 py-3 text-center transition-all';

  const selectedClass = selected
    ? 'border-black bg-black text-white'
    : 'border-gray-200 bg-white hover:bg-gray-100';

  const disabledClass = disabled ? 'cursor-not-allowed opacity-50 hover:bg-white' : '';

  const handleClick = (clickValue) => {
    if (disabled) return;

    if (selected) {
      onClick(null);
      return;
    }

    onClick(clickValue);
  };

  if (team) {
    return (
      <button
        disabled={disabled}
        onClick={() => handleClick(team)}
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
      onClick={() => handleClick('DRAW')}
      className={`${baseClass} ${selectedClass} ${disabledClass}`}
    >
      <div className="text-sm font-semibold tracking-wide">ABANDONED</div>

      <div className="text-xs text-gray-500">no result</div>
    </button>
  );
}

function Match({ index, team1, team2, selectedOutcomes, onOutcomeChange }) {
  const disabled =
    (index > 0 && !selectedOutcomes[index - 1]) ||
    (index < matches.length - 1 && selectedOutcomes[index + 1]);

  const containerClass = disabled
    ? 'opacity-50 pointer-events-none transition-opacity'
    : 'transition-opacity';

  return (
    <div className={`mb-3 grid grid-cols-[auto_1fr] items-start gap-3 ${containerClass}`}>
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full font-bold ${
          disabled ? 'bg-gray-300 text-gray-600' : 'bg-black text-white'
        }`}
      >
        {index + 1}
      </div>

      <div className="flex flex-col gap-2">
        <div className={`${disabled ? 'text-gray-400' : 'text-black'} transition-colors`}>
          {team1} vs {team2}
        </div>

        <div className="flex gap-2">
          <MatchOutcomeButton
            team={team1}
            selected={selectedOutcomes[index] === team1}
            disabled={disabled}
            onClick={onOutcomeChange}
          />
          <MatchOutcomeButton
            selected={selectedOutcomes[index] === 'DRAW'}
            disabled={disabled}
            onClick={onOutcomeChange}
          />
          <MatchOutcomeButton
            team={team2}
            selected={selectedOutcomes[index] === team2}
            disabled={disabled}
            onClick={onOutcomeChange}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedOutcomes, setSelectedOutcomes] = useState({});

  const onOutcomeChange = (matchIndex, outcome) => {
    setSelectedOutcomes({
      ...selectedOutcomes,
      [matchIndex]: outcome,
    });
  };

  return (
    <div className="m-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-3xl">Qualification Predictions</h2>
          <h4>Pick an outcome for each match.</h4>
        </div>
        <Button onClick={() => setSelectedOutcomes({})}>Reset</Button>
      </div>

      <hr className="my-4 border-t border-gray-300" />

      <div className="grid grid-cols-[1.25fr_2fr_2fr] gap-4 divide-x">
        <div>
          <h2 className="mb-5 text-center text-xl tracking-tight">Match Outcomes</h2>

          {matches.map((match, index) => (
            <Match
              key={index}
              index={index}
              team1={match.team1}
              team2={match.team2}
              selectedOutcomes={selectedOutcomes}
              onOutcomeChange={(outcome) => onOutcomeChange(index, outcome)}
            />
          ))}
        </div>

        <div>
          <h2 className="mb-5 text-center text-xl tracking-tight">Qualification Chances</h2>
        </div>

        <div>
          <h2 className="mb-5 text-center text-xl tracking-tight">Effective Points</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
