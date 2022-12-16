import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

function getHeaders() {
  return {
    'x-hasura-admin-secret': 'tasty-birds',
  };
}

const httpLink = new HttpLink({
  uri: 'https://gcr-15600fe9-713d-4ba1-a1cd-4a2d2c916b5c-5qvrslo3za-uc.a.run.app/v1/graphql',
  headers: getHeaders(),
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'wss://gcr-15600fe9-713d-4ba1-a1cd-4a2d2c916b5c-5qvrslo3za-uc.a.run.app/v1/graphql',
  headers: getHeaders(),
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// Instantiate client
export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
