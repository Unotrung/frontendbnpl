import {gql} from 'apollo-angular';

export const subscriptionGraphql = {
  newUserEvent: gql`
    subscription onNewUserEvent {
      newUserEvent {
        id
        name
        credit_limit
      }
    }
  `
};
