import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, createHttpLink, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {environment} from "../../environments/environment";
import {WebSocketLink} from "./wsLink";
import {setContext} from "@apollo/client/link/context";
import {getMainDefinition} from '@apollo/client/utilities';

const uri = `${environment.localAPIServer}graphql`; // <-- add the URL of the GraphQL server here
const graphqlSubUri = `${environment.webSocketServer}/subscriptions`
export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  const http = createHttpLink({uri});
  const wss = new WebSocketLink({
    url: graphqlSubUri,
    lazyCloseTimeout: 50000,
    retryAttempts: Infinity,
    lazy: false,
    on: {
      connected: () => console.log('graphql-ws connected'),
      error: (err) => console.log(err)
    },
    connectionParams: async () => {
      const token = localStorage.getItem('token');
      return {
        authorization: token ? `Bearer ${token}` : null
      };
    }
  });
  const authMiddleware = setContext(operation => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
      }
  );

  const graphqlLink = authMiddleware.concat(http);
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
      // split based on operation type
      ({query}) => {
        // @ts-ignore
        const {kind, operation} = getMainDefinition(query);
        return (
            kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      wss,
      graphqlLink,
  );
  return {
    link,
    cache: new InMemoryCache(),
  };
};

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
