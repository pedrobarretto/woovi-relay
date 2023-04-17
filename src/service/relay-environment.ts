import {
  Environment,
  Network,
  RecordSource,
  Store,
  GraphQLTaggedNode,
  Variables,
} from 'relay-runtime';

type GraphQLOperation = GraphQLTaggedNode;
type GraphQLResponse = any;

async function fetchQuery(
  operation: GraphQLOperation,
  variables: Variables,
): Promise<GraphQLResponse> {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.request.text,
      variables,
    }),
  });
  const data = await response.json();
  return data;
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
