import React from "react";
import ItemList from "@/components/common/item-list/ItemList";
type Props = React.PropsWithChildren<{}>;

const ConservationsLayout = ({ children }: Props) => {
  return (
    <>
      <ItemList title="Cuộc hội thoại">hello</ItemList>
      {children}
    </>
  );
};

export default ConservationsLayout;
