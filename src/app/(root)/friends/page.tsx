'use client';

import React from 'react';
import ItemList from '@/components/common/item-list/ItemList';
import AddFriendDialog from './_components/AddFriendDialog';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';
import Request from './_components/Request';
import { Id } from '@/convex/_generated/dataModel';

const Friends = () => {
  const requests = useQuery(api.requests.get);

  if (!requests) {
    return <Loader2 className="animate-spin" />;
  }

  if ('error' in requests) {
    return <div>Error: {requests.error}</div>;
  }

  return (
    <>
      <ItemList title="Bạn bè" action={<AddFriendDialog />}>
        {requests.length === 0 ? (
          <div>Không có yêu cầu kết bạn</div>
        ) : (
          requests.map(request => (
            <Request
              key={request.request?._id}
              id={request.request?._id as Id<'requests'>}
              image={request.sender?.imageUrl || ''}
              username={request.sender?.username || ''}
              email={request.sender?.email || ''}
            />
          ))
        )}
      </ItemList>
    </>
  );
};

export default Friends;
