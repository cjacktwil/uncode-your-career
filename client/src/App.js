import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
 import { ApolloProvider } from '@apollo/react-hooks';
 import ApolloClient from 'apollo-boost';
import Auth from './utils/auth';

const client = new ApolloClient({
  request: operation => {
    const token = Auth.getToken();

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: 'http://localhost:3001/graphql'
});
   
function App() {
  return (
     <ApolloProvider client={client}>
    <Router>
      <>
      <Switch>
          <Route exact path='/' component={Homepage} />
          <Route render={() => <h1 >Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
     </ApolloProvider>
  );
}

export default App;

