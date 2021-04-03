import * as React from 'react';
import Theme from '../theme';
import Bracket from '../components/bracket/bracket';

import JSONData from '../content/teams_16.json';

console.log(JSONData);

const generateBracket = (teams) => {
  console.log('teams length', teams.length);
  // Nombre de rounds
  const rounds = Math.floor(Math.log(teams.length) / Math.log(2));
  console.log('rounds length', rounds);
  // Initialisation de l'objet bracket
  let bracket = { rounds: new Array(rounds) };
  for (let i = 0; i < rounds; i++) {
    let matchups = Math.floor(teams.length / Math.pow(2, i + 1));
    console.log('matchups on round ' + i, matchups);
    bracket.rounds[i] = { matchups: new Array(matchups) };
    //
    for (let j = 0; j < bracket.rounds[i].matchups.length; j++) {
      bracket.rounds[i].matchups[j] = { team1: {}, team2: {} };
    }
  }

  // Positionnement des équipes pour le premier round
  for (let i = 0; i < bracket.rounds[0].matchups.length; i++) {
    bracket.rounds[0].matchups[i] = {
      team1: teams[i],
      team2: teams[teams.length - (i + 1)],
    };
  }
  return bracket;
};

let bracket = generateBracket(JSONData);

console.log('bracket', bracket);

//const rounds = Math.floor(Math.log(teams.length) / Math.log(2));

//console.log('rounds', rounds)

const IndexPage = () => {
  return (
    <Theme>
      <Bracket bracket={bracket}></Bracket>
      <h2>Coucou le hibounus</h2>
    </Theme>
  );
};

export default IndexPage;
