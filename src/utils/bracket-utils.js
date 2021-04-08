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
    default:
      return teams16;
  }
}

export function generateRandomBracket(size) {
  const teams = getData(size);
  return generateBracket(teams);
}

export function generateBracket(teams) {
  // Nombre de rounds
  const rounds = Math.floor(Math.log(teams.length) / Math.log(2));
  // Initialisation de l'objet bracket
  let bracket = { rounds: new Array(rounds), completed: false };
  for (let i = 0; i < rounds; i++) {
    let matchups = Math.floor(teams.length / Math.pow(2, i + 1));
    bracket.rounds[i] = { matchups: new Array(matchups) };
    //
    for (let j = 0; j < bracket.rounds[i].matchups.length; j++) {
      bracket.rounds[i].matchups[j] = {
        teams: [{}, {}],
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

export function setWinner(bracket, roundIndex, matchupIndex, teamIndex, score) {
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
    console.log('nextMatchup', nextMatchup);
    nextMatchup.playable = !isEmpty(nextMatchup.teams[0]) && !isEmpty(nextMatchup.teams[1]);
  }
  return newBracket;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
