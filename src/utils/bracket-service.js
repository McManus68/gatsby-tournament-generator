import teams8 from '../content/teams_8.json';
import teams16 from '../content/teams_16.json';
import teams32 from '../content/teams_32.json';
import teams64 from '../content/teams_64.json';
import teams128 from '../content/teams_128.json';

function getData(size) {
  switch (size) {
    case 8:
      return teams8;
    case 16:
      return teams16;
    case 32:
      return teams32;
    case 64:
      return teams64;
    case 128:
      return teams128;
  }
}

export default function generateBracket(size) {
  const teams = getData(size);
  console.log('teams length', teams.length);
  // Nombre de rounds
  const rounds = Math.floor(Math.log(teams.length) / Math.log(2));
  console.log('rounds length', rounds);
  // Initialisation de l'objet bracket
  let bracket = { rounds: new Array(rounds), completed: false };
  for (let i = 0; i < rounds; i++) {
    let matchups = Math.floor(teams.length / Math.pow(2, i + 1));
    console.log('matchups on round ' + i, matchups);
    bracket.rounds[i] = { matchups: new Array(matchups) };
    //
    for (let j = 0; j < bracket.rounds[i].matchups.length; j++) {
      bracket.rounds[i].matchups[j] = {
        teams: new Array(2),
        playable: false,
        played: false,
        winner: -1,
      };
    }
  }

  // Positionnement des équipes pour le premier round
  for (let i = 0; i < bracket.rounds[0].matchups.length; i++) {
    bracket.rounds[0].matchups[i] = {
      teams: [teams[i], teams[teams.length - (i + 1)]],
      playable: true,
      played: false,
      winner: -1,
    };
  }
  return bracket;
}
