import React from "react";
import ItemList from "@/components/common/item-list/ItemList";
import ConversationFallback from "@/components/common/conservation/ConversationFallBack";
type Props = {};

const Friends = (props: Props) => {
  return (
    <>
      <ItemList title="Bạn bè">
        <div>bạn bè</div>
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default Friends;
