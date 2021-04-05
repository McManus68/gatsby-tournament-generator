import React, { useState, useContext } from 'react';
import { Bracket, Round, Matchup, Teams, Team, MatchupMerger, RoundMerger } from './styles/bracket';
import ScoreDialog from '../dialog/score';
import { BracketContext, MatchupContext, RoundContext } from '../../context/context';

Bracket.MatchupMerger = function BracketMatchupMerger() {
  const { bracket } = useContext(BracketContext);
  const { roundIndex } = useContext(RoundContext);
  const { matchupIndex } = useContext(MatchupContext);

  return (
    <MatchupMerger
      matchupIndex={matchupIndex}
      roundIndex={roundIndex}
      last={roundIndex === bracket.rounds.length - 1}
    />
  );
};

Bracket.RoundMerger = function BracketRoundMerger() {
  const { roundIndex } = useContext(RoundContext);
  return <RoundMerger first={roundIndex === 0} />;
};

Bracket.Matchup = function BracketMatchup({ matchup, matchupIndex }) {
  const { setWinner } = useContext(BracketContext);
  const { roundIndex } = useContext(RoundContext);
  const [openDialog, setOpenDialog] = useState(false);
  const onCancel = () => {
    setOpenDialog(false);
  };
  const onConfirm = (winner, score) => {
    setOpenDialog(false);
    setWinner(roundIndex, matchupIndex, winner);
  };

  const getTeamName = (team) => {
    if (team && team.players) {
      return team.players[0].name + ' / ' + team.players[1].name;
    } else return '- / -';
  };

  return (
    <MatchupContext.Provider value={{ matchup, matchupIndex, getTeamName }}>
      <ScoreDialog open={openDialog} onCancel={onCancel} onConfirm={onConfirm} />
      <Matchup matchup={matchup} onClick={() => setOpenDialog(true)}>
        <Bracket.RoundMerger />
        <Bracket.Teams />
        <Bracket.MatchupMerger />
      </Matchup>
    </MatchupContext.Provider>
  );
};

Bracket.Teams = function BracketTeams() {
  return (
    <Teams>
      <Bracket.Team teamIndex={0} />
      <Bracket.Team teamIndex={1} />
    </Teams>
  );
};

Bracket.Team = function BracketTeam({ teamIndex }) {
  const { matchup, getTeamName } = useContext(MatchupContext);
  const team = matchup.teams[teamIndex];

  let status;
  if (matchup.played) {
    status = matchup.winner === teamIndex ? 'W' : 'L';
  }

  return (
    <Team status={status} matchup={matchup}>
      <span>{getTeamName(team)}</span>
    </Team>
  );
};

Bracket.Round = function BracketRound({ round, roundIndex }) {
  return (
    <RoundContext.Provider value={{ roundIndex }}>
      <Round>
        {round.matchups.map((matchup, i) => {
          return <Bracket.Matchup key={i} matchup={matchup} matchupIndex={i} />;
        })}
      </Round>
    </RoundContext.Provider>
  );
};

export default function BracketComponent(props) {
  const [bracket, setBracket] = React.useState(props.bracket);

  const setWinner = (roundIndex, matchupIndex, teamIndex) => {
    // Le score est sur un match jouable
    let matchup = bracket.rounds[roundIndex].matchups[matchupIndex];
    if (!matchup.playable) return;

    // Positionnement du résultat
    let newMatchup = { ...matchup, played: true, playable: false, winner: teamIndex };
    let newBracket = { ...bracket };
    newBracket.rounds[roundIndex].matchups[matchupIndex] = newMatchup;

    // Grande finale? Auquel cas le tournoi est terminé
    if (roundIndex === bracket.rounds.length - 1) {
      newBracket.completed = true;
    } else {
      const nextMatchupIndex = Math.floor(matchupIndex / 2);
      const nextMatchupTeamIndex = matchupIndex % 2;
      const nextMatchup = newBracket.rounds[roundIndex + 1].matchups[nextMatchupIndex];
      nextMatchup.teams[nextMatchupTeamIndex] = matchup.teams[teamIndex];
      nextMatchup.playable = nextMatchup.teams[0] && nextMatchup.teams[1];
    }
    setBracket(newBracket);
  };

  return (
    <BracketContext.Provider value={{ bracket, setWinner }}>
      <Bracket rounds={bracket.rounds.length}>
        {bracket.rounds.map((round, i) => {
          return <Bracket.Round key={i} round={round} roundIndex={i} />;
        })}
      </Bracket>
    </BracketContext.Provider>
  );
}
