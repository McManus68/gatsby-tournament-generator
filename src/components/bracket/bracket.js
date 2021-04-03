import React from 'react';
import styled, { css } from 'styled-components';

export const StyledBracket = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.rounds},
    ${(props) => props.theme.bracket.gridWidth}
  );
`;

export const StyledRound = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledMatchup = styled.div`
  display: flex;
  margin: ${(props) => props.theme.bracket.gridGap};
  border-radius: 0.25rem;
  position: relative;
`;

export const StyledTeams = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTeam = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  padding: 0 0.3rem;
  box-sizing: border-box;
  min-width: ${(props) => props.theme.bracket.teamWidth};
  color: ${(props) => props.theme.bracket.fg};
  border-left: 0.25rem solid ${(props) => props.theme.bracket.winner};
  background: ${(props) => props.theme.bracket.bg};
  height: ${(props) => props.theme.bracket.teamHeight};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
  ${({ team }) =>
    team === 1 &&
    css`
      border-radius: 0.25rem 0.25rem 0 0;
    `}
  ${({ team }) =>
    team === 2 &&
    css`
      border-radius: 0 0 0.25rem 0.25rem;
    `}
  &:nth-child(1) {
    border-bottom: thin solid ${(props) => props.theme.bracket.border};
  }
`;

export const StyledMatchupMerger = styled.div`
  position: relative;
  ${({ lastRound }) =>
    !lastRound &&
    css`
      &:after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: calc(
          (
              ${(props) => props.theme.bracket.gridWidth} -
                ${(props) => props.theme.bracket.teamWidth}
            ) / 2
        );
        height: 2px;
        background: ${(props) => props.theme.bracket.border};
        top: calc(50% - 1px);
        left: 100%;
      }

      &:before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: 2px;
        height: calc(
          (
              ${(props) => props.theme.bracket.teamHeight} +
                ${(props) => props.theme.bracket.gridGap}
            ) * ${(props) => Math.pow(2, props.round)}
        );
        background: ${(props) => props.theme.bracket.border};
        left: calc(
          (
              ${(props) => props.theme.bracket.gridWidth} -
                ${(props) => props.theme.bracket.teamWidth}
            ) / 2
        );
        ${({ odd }) =>
          odd &&
          css`
            top: calc(50% - 1px);
          `}
        ${({ odd }) =>
          !odd &&
          css`
            bottom: calc(50% - 1px);
          `}
      }
    `}
`;

export const StyledRoundMerger = styled.div`
  position: relative;
  ${({ firstRound }) =>
    !firstRound &&
    css`
      &:before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: calc(
          (
              ${(props) => props.theme.bracket.gridWidth} -
                ${(props) => props.theme.bracket.teamWidth}
            ) / 2
        );
        height: 2px;
        background: ${(props) => props.theme.bracket.border};
        top: calc(50% - 1px);
        left: calc(
          (
              ${(props) => props.theme.bracket.gridWidth} -
                ${(props) => props.theme.bracket.teamWidth}
            ) / 2 * -1
        );
      }
    `}
`;

const CurrentRoundContext = React.createContext(null);
const TotalRoundContext = React.createContext(null);

const MatchupMerger = ({ index }) => {
  const round = React.useContext(CurrentRoundContext);
  const roundCount = React.useContext(TotalRoundContext);

  return (
    <StyledMatchupMerger
      odd={index % 2 === 0}
      round={round}
      lastRound={round === roundCount - 1}
    ></StyledMatchupMerger>
  );
};

const RoundMerger = () => {
  const round = React.useContext(CurrentRoundContext);

  return <StyledRoundMerger firstRound={round === 0}></StyledRoundMerger>;
};

const Matchup = ({ matchup, index }) => {
  const getTeamName = (team) => {
    if (team.players) {
      return team.players[0].name + ' / ' + team.players[1].name;
    } else return '- / -';
  };

  return (
    <StyledMatchup>
      <RoundMerger />
      <StyledTeams>
        <StyledTeam team={1}>{getTeamName(matchup.team1)}</StyledTeam>
        <StyledTeam team={2}>{getTeamName(matchup.team2)}</StyledTeam>
      </StyledTeams>
      <MatchupMerger index={index}></MatchupMerger>
    </StyledMatchup>
  );
};

const Round = ({ round, index }) => {
  console.log('round.matchups', round.matchups);
  return (
    <CurrentRoundContext.Provider value={index}>
      <StyledRound>
        {round.matchups.map((matchup, i) => {
          return <Matchup key={i} matchup={matchup} index={i}></Matchup>;
        })}
      </StyledRound>
    </CurrentRoundContext.Provider>
  );
};

const Bracket = ({ bracket }) => {
  console.log('bracket', bracket);
  return (
    <TotalRoundContext.Provider value={bracket.rounds.length}>
      <StyledBracket rounds={bracket.rounds.length}>
        {bracket.rounds.map((round, i) => {
          return <Round key={i} round={round} index={i}></Round>;
        })}
      </StyledBracket>
    </TotalRoundContext.Provider>
  );
};

export default Bracket;
