import styled from 'styled-components';

export const Vertical = styled.div``;
export const Horizontal = styled.div``;

export const Fancy = styled.button`
  --offset: 10px;
  --border-size: 2px;

  display: block;
  position: relative;
  padding: 1.5em 3em;
  appearance: none;
  border: 0;
  background: transparent;
  color: ${(props) => (props.color === 'primary' ? props.theme.primary : props.theme.secondary)};
  text-transform: uppercase;
  letter-spacing: 0.25em;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 0;
  box-shadow: inset 0 0 0 var(--border-size) currentcolor;
  transition: background 0.8s ease;

  &:hover {
    background: rgba(100, 0, 0, 0.03);
  }

  ${Vertical},
  ${Horizontal} {
    position: absolute;
    top: var(--horizontal-offset, 0);
    right: var(--vertical-offset, 0);
    bottom: var(--horizontal-offset, 0);
    left: var(--vertical-offset, 0);
    transition: transform 0.8s ease;
    will-change: transform;

    &::before {
      content: '';
      position: absolute;
      border: inherit;
    }
  }

  ${Horizontal} {
    --vertical-offset: calc(var(--offset) * -1);
    border-top: var(--border-size) solid currentcolor;
    border-bottom: var(--border-size) solid currentcolor;

    &::before {
      top: calc(var(--vertical-offset) - var(--border-size));
      bottom: calc(var(--vertical-offset) - var(--border-size));
      left: calc(var(--vertical-offset) * -1);
      right: calc(var(--vertical-offset) * -1);
    }
  }

  &:hover ${Horizontal} {
    transform: scaleX(0);
  }

  ${Vertical} {
    --horizontal-offset: calc(var(--offset) * -1);
    border-left: var(--border-size) solid currentcolor;
    border-right: var(--border-size) solid currentcolor;

    &::before {
      top: calc(var(--horizontal-offset) * -1);
      bottom: calc(var(--horizontal-offset) * -1);
      left: calc(var(--horizontal-offset) - var(--border-size));
      right: calc(var(--horizontal-offset) - var(--border-size));
    }
  }

  &:hover ${Vertical} {
    transform: scaleY(0);
  }
`;
