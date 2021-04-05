import teams from '../content/teams_8.json';

export default function generateBracket() {
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
