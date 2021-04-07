import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import { MatchupContext } from '../../../context/bracket';

const DialogContentForm = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin: 0.6rem 0;
  }
`;

export default function ScoreDialog({ open, onCancel, onConfirm }) {
  const { getTeamName, matchup } = useContext(MatchupContext);
  const [winnerTeam, setWinnerTeam] = useState(-1);
  const [score, setScore] = useState('');

  const onWinnerChange = (event) => {
    setWinnerTeam(event.target.value * 1);
  };

  const onScoreChange = (event) => {
    setScore(event.target.value);
  };

  const onConfirmDialog = () => {
    onConfirm(winnerTeam, score);
    setWinnerTeam(-1);
    setScore('');
  };

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Enregistrer le score</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Veuillez saisir le score du match qui opposait les équipes:{' '}
          <b>{getTeamName(matchup.teams[0])}</b> et <b>{getTeamName(matchup.teams[1])}</b>
        </DialogContentText>

        <DialogContentForm>
          <FormLabel component="legend">Vainqueur</FormLabel>
          <RadioGroup
            aria-label="winner"
            name="winner"
            value={winnerTeam}
            onChange={onWinnerChange}
          >
            <FormControlLabel value={0} control={<Radio />} label={getTeamName(matchup.teams[0])} />
            <FormControlLabel value={1} control={<Radio />} label={getTeamName(matchup.teams[1])} />
          </RadioGroup>

          <FormLabel component="legend">Score</FormLabel>
          <TextField id="filled-basic" variant="outlined" value={score} onChange={onScoreChange} />
        </DialogContentForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Annuler
        </Button>
        <Button onClick={onConfirmDialog} color="primary">
          Confirmer le score
        </Button>
      </DialogActions>
    </Dialog>
  );
}
