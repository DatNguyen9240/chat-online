import React from "react";

type Props = React.PropsWithChildren<{}>;

const ConservationsLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ConservationsLayout;
