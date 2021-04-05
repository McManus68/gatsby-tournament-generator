import * as React from 'react';
import Theme from '../theme';
import Bracket from '../components/bracket';
import Layout from '../components/layout';
import 'normalize.css';
import generateBracket from '../utils/bracket-service';

let bracket = generateBracket();

const IndexPage = () => {
  return (
    <Theme>
      <Layout>
        <Bracket bracket={bracket}></Bracket>
      </Layout>
    </Theme>
  );
};

export default IndexPage;
