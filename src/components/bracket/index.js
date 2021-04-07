import React, { useState, useContext } from 'react';
import {
  Bracket,
  Round,
  Matchup,
  Teams,
  Team,
  MatchupMerger,
  RoundMerger,
  Score,
} from './styles/bracket';
import ScoreDialog from '../dialog/score';
import { BracketContext, MatchupContext, RoundContext } from '../../context/bracket';
import { BracketService } from '../../services';

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

Bracket.Score = function BracketScore() {
  const { matchup, matchupIndex } = useContext(MatchupContext);
  return <Score matchupIndex={matchupIndex}>{matchup.score}</Score>;
};

Bracket.RoundMerger = function BracketRoundMerger() {
  const { roundIndex } = useContext(RoundContext);
  return <RoundMerger first={roundIndex === 0} />;
};

Bracket.Matchup = function BracketMatchup({ matchup, matchupIndex }) {
  const getTeamName = (team) => {
    if (team && team.players) {
      return team.players[0].name + ' / ' + team.players[1].name;
    } else return '- / -';
  };

  return (
    <MatchupContext.Provider value={{ matchup, matchupIndex, getTeamName }}>
      <Matchup matchup={matchup}>
        <Bracket.RoundMerger />
        <Bracket.Teams />
        <Bracket.Score />
        <Bracket.MatchupMerger />
      </Matchup>
    </MatchupContext.Provider>
  );
};

Bracket.Teams = function BracketTeams() {
  const { bracket, setBracket, setWinner, db } = useContext(BracketContext);
  const { matchupIndex, matchup } = useContext(MatchupContext);
  const { roundIndex } = useContext(RoundContext);
  const [openDialog, setOpenDialog] = useState(false);
  const onCancel = () => {
    setOpenDialog(false);
  };

  const onConfirmScore = (winner, score) => {
    setOpenDialog(false);
    const newBracket = setWinner(bracket, roundIndex, matchupIndex, winner, score);
    if (db) {
      BracketService.update(newBracket);
    }
    setBracket(newBracket);
  };

  const onOpenDialog = () => {
    if (matchup.playable) {
      setOpenDialog(true);
    }
  };

  return (
    <>
      <ScoreDialog open={openDialog} onCancel={onCancel} onConfirm={onConfirmScore} />
      <Teams onClick={onOpenDialog}>
        <Bracket.Team teamIndex={0} />
        <Bracket.Team teamIndex={1} />
      </Teams>
    </>
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

export default function BracketComponent({ bracket }) {
  return (
    <Bracket rounds={bracket.rounds.length}>
      {bracket.rounds.map((round, i) => {
        return <Bracket.Round key={i} round={round} roundIndex={i} />;
      })}
    </Bracket>
  );
}
