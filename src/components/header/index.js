import React from 'react';
import { Header, Logo, Button, Title, Actions, Left, Right } from './styles/header';
import logo from '../../images/logo3.png';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { BracketContext } from '../../context/context';
import generateBracket from '../../utils/bracket-service';

export default function HeaderComponent() {
  return (
    <Header>
      <Header.Left>
        <Header.Logo />
        <Header.Title>
          King Of <span>Padel</span>
        </Header.Title>
      </Header.Left>
      <Header.Right>
        <Header.Actions />
      </Header.Right>
    </Header>
  );
}

Header.Logo = function HeaderLogo() {
  return <Logo src={logo} />;
};

Header.Left = function HeaderLeft({ children }) {
  return <Left>{children}</Left>;
};

Header.Right = function HeaderRight({ children }) {
  return <Right>{children}</Right>;
};

Header.Title = function HeaderTitle({ children }) {
  return <Title>{children}</Title>;
};

Header.Button = function HeaderButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Header.Actions = function HeaderActions() {
  const { setBracket, bracket } = React.useContext(BracketContext);
  const [teamCount, setTeamCount] = React.useState(16);
  const handleChange = (event) => {
    setTeamCount(event.target.value);
  };

  const onGenerateNewBracket = () => {
    let newBracket = generateBracket(teamCount);
    console.log('setBracket', bracket);
    setBracket(newBracket);
  };

  return (
    <Actions>
      <FormControl>
        <Select
          color="accent"
          value={teamCount}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Taille du tournoi' }}
        >
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
          <MenuItem value={64}>64</MenuItem>
          <MenuItem value={128}>128</MenuItem>
        </Select>
        <FormHelperText>Nombre d'équipes</FormHelperText>
      </FormControl>

      <Button color="primary" variant="outlined" onClick={onGenerateNewBracket}>
        Générer un tournoi
      </Button>
    </Actions>
  );
};
