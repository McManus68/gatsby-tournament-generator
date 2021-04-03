import React from 'react';
import styled, { css } from 'styled-components';

function computeWidth(props) {
  return `calc(
    ( ${props.theme.bracket.gridWidth} - ${props.theme.bracket.teamWidth} ) / 2
  )`;
}

function computeHeight(props) {
  return `calc((${props.theme.bracket.teamHeight} + ${
    props.theme.bracket.gridGap
  }) * ${Math.pow(2, props.round)})`;
}

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
  ${({ firstTeam }) =>
    firstTeam
      ? css`
          border-radius: 0.25rem 0.25rem 0 0;
        `
      : css`
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
        width: ${(props) => computeWidth(props)};
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
        height: ${(props) => computeHeight(props)};
        background: ${(props) => props.theme.bracket.border};
        left: ${(props) => computeWidth(props)};
        ${({ odd }) =>
          odd
            ? css`
                top: calc(50% - 1px);
              `
            : css`
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
        width: ${(props) => computeWidth(props)};
        height: 2px;
        background: ${(props) => props.theme.bracket.border};
        top: calc(50% - 1px);
        left: calc(${(props) => computeWidth(props)} * -1);
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
        <StyledTeam firstTeam={true}>{getTeamName(matchup.team1)}</StyledTeam>
        <StyledTeam firstTeam={false}>{getTeamName(matchup.team2)}</StyledTeam>
      </StyledTeams>
      <MatchupMerger index={index} />
    </StyledMatchup>
  );
};

const Round = ({ round, index }) => {
  return (
    <CurrentRoundContext.Provider value={index}>
      <StyledRound>
        {round.matchups.map((matchup, i) => {
          return <Matchup key={i} matchup={matchup} index={i} />;
        })}
      </StyledRound>
    </CurrentRoundContext.Provider>
  );
};

const Bracket = ({ bracket }) => {
  return (
    <TotalRoundContext.Provider value={bracket.rounds.length}>
      <StyledBracket rounds={bracket.rounds.length}>
        {bracket.rounds.map((round, i) => {
          return <Round key={i} round={round} index={i} />;
        })}
      </StyledBracket>
    </TotalRoundContext.Provider>
  );
};

export default Bracket;
