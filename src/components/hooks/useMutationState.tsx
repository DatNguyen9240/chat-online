import { useMutation } from "convex/react";
import { useState } from "react";

const useMutationState = (mutatinToRun: any) => {
  const [pending, setPending] = useState(false);
  const mutationFn = useMutation(mutatinToRun);

  const mutation = (payload: any) => {
    setPending(true);

    return mutationFn(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return { pending, mutation };
};

export default useMutationState;
