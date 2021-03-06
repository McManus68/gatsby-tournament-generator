import * as React from 'react';
import Theme from '../theme';
import Bracket from '../components/bracket';
import Layout from '../components/layout';
import styled from 'styled-components';
import { generateRandomBracket, setWinner } from '../utils/bracket-utils';
import { BracketContext } from '../context/bracket';
import FancyButton from '../components/button/fancy';
import { Container } from '../components/container';

const BracketGenerator = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  margin: 3rem;
`;

const StyledFancyButton = styled(FancyButton)`
  margin-left: 1.5rem;
`;

const BracketGeneratorPage = () => {
  const [teamCount, setTeamCount] = React.useState(8);
  const [bracket, setBracket] = React.useState(null);

  const onTeamCountChange = (event) => {
    setTeamCount((prevState) => event.target.value * 1);
  };

  const onGenerateNewBracket = () => {
    setBracket(() => generateRandomBracket(teamCount));
  };

  return (
    <Theme>
      <BracketContext.Provider value={{ bracket, setBracket, setWinner, db: false }}>
        <Layout>
          <Container>
            <Header>
              <select value={teamCount} onChange={onTeamCountChange}>
                {[...Array(5)].map((x, i) => (
                  <option key={i} value={Math.pow(2, i + 3)}>
                    {Math.pow(2, i + 3)} équipes
                  </option>
                ))}
              </select>

              <StyledFancyButton color="secondary" onClick={onGenerateNewBracket}>
                Simuler un tournoi
              </StyledFancyButton>
            </Header>
          </Container>
          {bracket && <Bracket bracket={bracket} />}
        </Layout>
      </BracketContext.Provider>
    </Theme>
  );
};

export default BracketGeneratorPage;
