import styled, { css } from 'styled-components/macro';

function computeHeight(props) {
  return `calc((${props.theme.bracket.teamHeight} + ${props.theme.bracket.gapX}) * ${Math.pow(
    2,
    props.roundIndex
  )})`;
}

export const Bracket = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.rounds},
    ${(props) => props.theme.bracket.gridWidth}
  );
`;

export const Round = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Matchup = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: ${(props) => props.theme.bracket.gapY} ${(props) => props.theme.bracket.gapX};
  border-radius: 0.25rem;
  position: relative;
  background-color: blue;
  ${({ matchup }) =>
    matchup.playable &&
    css`
      cursor: pointer;
    `}
`;

export const Teams = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const Team = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  padding: 0 0.3rem;
  box-sizing: border-box;
  width: 100%;
  color: ${(props) => props.theme.bracket.fg};
  border-left: 0.25rem solid ${(props) => props.theme.primary};
  background: ${(props) => props.theme.bracket.bg};
  height: ${(props) => props.theme.bracket.teamHeight};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);

  ${({ status }) =>
    status === 'W' &&
    css`
      color: ${(props) => props.theme.bracket.winner};
      border-left: 0.25rem solid ${(props) => props.theme.bracket.winner};
      font-weight: bold;
    `}
  ${({ status }) =>
    status === 'L' &&
    css`
      color: ${(props) => props.theme.bracket.looser};
      border-left: 0.25rem solid ${(props) => props.theme.bracket.looser};
      span {
        opacity: 0.7;
      }
    `}
  &:nth-child(1) {
    border-bottom: thin solid ${(props) => props.theme.bracket.border};
  }
`;

export const MatchupMerger = styled.div`
  position: relative;
  ${({ last }) =>
    !last &&
    css`
      &:after {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: ${(props) => props.theme.bracket.gapX};
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
        left: ${(props) => props.theme.bracket.gapX};
        ${({ matchupIndex }) =>
          matchupIndex % 2 === 0
            ? css`
                top: calc(50% - 1px);
              `
            : css`
                bottom: calc(50% - 1px);
              `}
      }
    `}
`;

export const RoundMerger = styled.div`
  position: relative;
  ${({ first }) =>
    !first &&
    css`
      &:before {
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: ${(props) => props.theme.bracket.gapX};
        height: 2px;
        background: ${(props) => props.theme.bracket.border};
        top: calc(50% - 1px);
        left: calc(${(props) => props.theme.bracket.gapX} * -1);
      }
    `}
`;

export const Score = styled.div`
  position: absolute;
  color: ${(props) => props.theme.bracket.border};
  left: calc(100% + 0.2rem);
  font-size: 0.8rem;
  white-space: nowrap;
  ${({ matchupIndex }) =>
    matchupIndex % 2 === 0
      ? css`
          top: 1rem;
        `
      : css`
          bottom: 1rem;
        `}
`;
