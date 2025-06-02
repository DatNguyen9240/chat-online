import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export const useConversation = () => {
  const params = useParams();
  const conversationId = useMemo(() => params?.conversationId as string, [params]);

  const isActive = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isActive,
      conversationId,
    }),
    [isActive, conversationId]
  );
};
