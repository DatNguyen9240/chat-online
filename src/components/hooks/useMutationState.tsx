import { useMutation } from 'convex/react';
import { useState } from 'react';
import { FunctionReference } from 'convex/server';

type MutationFunction = FunctionReference<'mutation'>;

const useMutationState = (mutationToRun: MutationFunction) => {
  const [pending, setPending] = useState(false);
  const mutationFn = useMutation(mutationToRun);

  const mutation = (payload: Parameters<typeof mutationFn>[0]) => {
    setPending(true);

    return mutationFn(payload)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return { pending, mutation };
};

export default useMutationState;
