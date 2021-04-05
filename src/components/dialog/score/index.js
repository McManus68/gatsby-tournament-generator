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
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import { MatchupContext } from '../../../context/context';

const DialogContentForm = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin: 0.6rem 0;
  }
`;

const DialogContentFormScores = styled.div`
  display: flex;
  & > div {
    margin-right: 1.5rem;
    width: 80px;
  }
`;

const DialogContentFormScore = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ScoreDialog({ open, onCancel, onConfirm }) {
  const { getTeamName, matchup } = useContext(MatchupContext);
  const [winner, setWinner] = useState(-1);
  const [score, setScore] = useState(['', '', '']);

  const availableScores = [
    '6/0',
    '6/1',
    '6/2',
    '6/3',
    '6/4',
    '7/5',
    '7/6',
    '0/6',
    '1/6',
    '2/6',
    '3/6',
    '4/6',
    '5/7',
    '6/7',
  ];
  const onWinnerChange = (event) => {
    setWinner(event.target.value);
  };

  const onSetScoreChange = (event, setIndex) => {
    const newScore = { ...score };
    newScore[setIndex] = event.target.value;
    setScore(newScore);
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
          <RadioGroup aria-label="winner" name="winner" value={winner} onChange={onWinnerChange}>
            <FormControlLabel value="0" control={<Radio />} label={getTeamName(matchup.teams[0])} />
            <FormControlLabel value="1" control={<Radio />} label={getTeamName(matchup.teams[1])} />
          </RadioGroup>

          <FormLabel component="legend">Score</FormLabel>
          <DialogContentFormScores>
            {Array.from(Array(3), (e, i) => {
              return (
                <DialogContentFormScore key={i}>
                  <Select
                    value={score[i]}
                    onChange={(e) => onSetScoreChange(e, i)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Set n°' + (i + 1) }}
                  >
                    {availableScores.map((score, i) => (
                      <MenuItem key={i} value={score}>
                        {score}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Set n°{i + 1}</FormHelperText>
                </DialogContentFormScore>
              );
            })}
          </DialogContentFormScores>
        </DialogContentForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Annuler
        </Button>
        <Button onClick={() => onConfirm(winner * 1, score)} color="primary">
          Confirmer le score
        </Button>
      </DialogActions>
    </Dialog>
  );
}
