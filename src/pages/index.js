import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Theme from '../theme';
import Bracket from '../components/bracket';
import Layout from '../components/layout';
import 'normalize.css';
import { BracketContext } from '../context/bracket';
import { FirebaseContext } from '../context/firebase';
import { firebase } from '../firebase/firebase.prod';
import { setWinner } from '../utils/bracket-utils';
import { BracketService, TeamService } from '../services';
import TeamsTable from '../components/table/teams';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddTeamDialog from '../components/dialog/addTeam';
import FancyButton from '../components/button/fancy';
import { Container } from '../components/container';
import Tooltip from '@material-ui/core/Tooltip';

const NextTournament = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  max-width: 800px;

  p {
    font-size: 1.3rem;
  }
`;

const TableTitle = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.primary};
  margin-right: auto;
`;

const StyledFancyButton = styled(FancyButton)`
  max-width: 400px;
  margin: 4rem auto;
  align-items: center;
`;

const IndexPage = () => {
  const [bracket, setBracket] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [teams, setTeams] = React.useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  console.log('bracket', bracket);
  const onCancel = () => {
    setOpenDialog(false);
  };

  const onOpenDialog = () => {
    setOpenDialog(true);
  };

  const onConfirmTeam = (team) => {
    setOpenDialog(false);
    TeamService.create(team).then((result) => {
      setTeams([...teams, result]);
    });
  };

  const onDeleteTeam = (team) => {
    TeamService.delete(team.id).then(() => {
      let newTeams = [...teams];
      newTeams = newTeams.filter((t) => t.id !== team.id);
      setTeams(newTeams);
    });
  };

  const onCreateNewBracket = () => {
    /*const newBracket = generateBracket(teams);
    BracketService.create(newBracket).then((result) => {
      setBracket(result);
    });*/
  };

  useEffect(() => {
    TeamService.getAll().then((result) => {
      setTeams(result);
    });

    BracketService.get().then((result) => {
      setBracket(result);
      setLoading(false);
    });
  }, []);

  return (
    <Theme>
      <FirebaseContext.Provider value={{ firebase }}>
        <BracketContext.Provider value={{ bracket, setBracket, setWinner, db: true }}>
          <Layout>
            {!loading && bracket && <Bracket bracket={bracket} />}
            {!loading && !bracket && (
              <Container>
                <NextTournament>
                  <AddTeamDialog open={openDialog} onCancel={onCancel} onConfirm={onConfirmTeam} />
                  <p>
                    Aucun tournoi en cours. Mais pouvez inscrire votre équipe pour le prochain
                    tournoi.
                  </p>
                  <p>
                    Le simulateur de tournoi permet d'avoir un aperçu du rendu une fois le tournoi
                    démarré.
                  </p>
                  <TableTitle>
                    <Title>Liste des équipes</Title>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<AddIcon />}
                      onClick={onOpenDialog}
                    >
                      Ajouter une équipe
                    </Button>
                  </TableTitle>

                  <TeamsTable teams={teams} onDeleteTeam={onDeleteTeam} />

                  <Tooltip title="Seul l'admin peut créer le tournoi" aria-label="add">
                    <StyledFancyButton onClick={onCreateNewBracket}>
                      Créer un nouveau tournoi
                    </StyledFancyButton>
                  </Tooltip>
                </NextTournament>
              </Container>
            )}
          </Layout>
        </BracketContext.Provider>
      </FirebaseContext.Provider>
    </Theme>
  );
};

export default IndexPage;
