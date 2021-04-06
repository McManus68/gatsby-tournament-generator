import * as React from 'react';
import Theme from '../theme';
import Bracket from '../components/bracket';
import Layout from '../components/layout';
import 'normalize.css';
import generateBracket from '../utils/bracket-service';
import { BracketContext } from '../context/context';

const IndexPage = () => {
  const [bracket, setBracket] = React.useState(generateBracket(16));

  const setWinner = (roundIndex, matchupIndex, teamIndex, score) => {
    // Le score est sur un match jouable
    let matchup = bracket.rounds[roundIndex].matchups[matchupIndex];
    if (!matchup.playable) return;

    // Positionnement du résultat
    let newMatchup = { ...matchup, played: true, playable: false, winner: teamIndex, score };
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
    <Theme>
      <BracketContext.Provider value={{ bracket, setBracket, setWinner }}>
        <Layout>
          <Bracket bracket={bracket} />
        </Layout>
      </BracketContext.Provider>
    </Theme>
  );
};

export default IndexPage;
