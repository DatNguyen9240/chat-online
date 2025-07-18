import { Card } from '@/components/ui/Card';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const ConservationContainer = ({ children }: Props) => {
  return (
    <Card className="w-full h-[calc(100vh-80px)] lg:h-full p-2 flex flex-col gap-2">
      {children}
    </Card>
  );
};

export default ConservationContainer;
