import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import LevelSlider from '../../slider/level';

const DialogContentForm = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin: 0.6rem 0;
  }
`;

export default function AddTeamDialog({ open, onCancel, onConfirm }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [level, setLevel] = useState(5);

  const onPlayer1Change = (event) => {
    setPlayer1(event.target.value);
  };

  const onPlayer2Change = (event) => {
    setPlayer2(event.target.value);
  };

  const onConfirmDialog = () => {
    const team = { players: [{ name: player1 }, { name: player2 }], level: level };
    onConfirm(team);
    setPlayer1('');
    setPlayer2('');
    setLevel(5);
  };

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Ajouter une équipe</DialogTitle>
      <DialogContent>
        <DialogContentText>Composition de la nouvelle équipe</DialogContentText>

        <DialogContentForm>
          <FormLabel component="legend">Joueur n°1</FormLabel>
          <TextField
            id="filled-basic"
            variant="outlined"
            value={player1}
            onChange={onPlayer1Change}
          />

          <FormLabel component="legend">Joueur n°2</FormLabel>
          <TextField
            id="filled-basic"
            variant="outlined"
            value={player2}
            onChange={onPlayer2Change}
          />
          <LevelSlider level={level} setLevel={setLevel} />
        </DialogContentForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Annuler
        </Button>
        <Button onClick={onConfirmDialog} color="primary">
          Valider la nouvelle équipe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
