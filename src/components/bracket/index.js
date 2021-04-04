import React, { useContext, createContext } from 'react';
import {
  Container,
  Round,
  Matchup,
  Teams,
  Team,
  MatchupMerger,
  RoundMerger,
} from './styles/bracket';

const BracketContext = createContext({ rounds: 0 });
const RoundContext = createContext(0);
const MatchupContext = createContext(0);

Bracket.MatchupMerger = function BracketMatchupMerger() {
  const { rounds } = useContext(BracketContext);
  const round = useContext(RoundContext);
  const matchup = useContext(MatchupContext);

  return (
    <MatchupMerger
      odd={matchup % 2 === 0}
      round={round}
      lastRound={round === rounds - 1}
    />
  );
};

Bracket.RoundMerger = function BracketRoundMerger() {
  const round = React.useContext(RoundContext);
  return <RoundMerger firstRound={round === 0} />;
};

Bracket.Matchup = function BracketMatchup({ matchup }) {
  return (
    <Matchup>
      <Bracket.RoundMerger />
      <Bracket.Teams matchup={matchup} />
      <Bracket.MatchupMerger />
    </Matchup>
  );
};

Bracket.Teams = function BracketTeams({ matchup }) {
  return (
    <Teams>
      <Bracket.Team isFirst={true} team={matchup.team1} />
      <Bracket.Team isFirst={false} team={matchup.team2} />
    </Teams>
  );
};

Bracket.Team = function BracketTeam({ team, isFirst }) {
  const getTeamName = (team) => {
    if (team.players) {
      return team.players[0].name + ' / ' + team.players[1].name;
    } else return '- / -';
  };
  return <Team firstTeam={isFirst}>{getTeamName(team)}</Team>;
};

Bracket.Round = function BracketRound({ round }) {
  return (
    <Round>
      {round.matchups.map((matchup, i) => {
        return (
          <MatchupContext.Provider key={i} value={i}>
            <Bracket.Matchup matchup={matchup} />
          </MatchupContext.Provider>
        );
      })}
    </Round>
  );
};

export default function Bracket({ bracket }) {
  return (
    <BracketContext.Provider value={{ rounds: bracket.rounds.length }}>
      <Container rounds={bracket.rounds.length}>
        {bracket.rounds.map((round, i) => {
          return (
            <RoundContext.Provider key={i} value={i}>
              <Bracket.Round round={round} />
            </RoundContext.Provider>
          );
        })}
      </Container>
    </BracketContext.Provider>
  );
}
