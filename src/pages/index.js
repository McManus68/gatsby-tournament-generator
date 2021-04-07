import * as React from 'react';
import Theme from '../theme';
import Bracket from '../components/bracket';
import Layout from '../components/layout';
import 'normalize.css';
import { generateRandomBracket } from '../utils/bracket-utils';
import { BracketContext } from '../context/bracket';
import { FirebaseContext } from '../context/firebase';
import { firebase } from '../firebase/firebase.prod';
import { setWinner } from '../utils/bracket-utils';

const IndexPage = () => {
  const [bracket, setBracket] = React.useState(generateRandomBracket(16));

  return (
    <Theme>
      <FirebaseContext.Provider value={{ firebase }}>
        <BracketContext.Provider value={{ bracket, setBracket, setWinner }}>
          <Layout>
            <Bracket bracket={bracket} />
          </Layout>
        </BracketContext.Provider>
      </FirebaseContext.Provider>
    </Theme>
  );
};

export default IndexPage;
