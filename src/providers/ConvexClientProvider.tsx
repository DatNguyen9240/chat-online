'use client';

import React from 'react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { useAuth } from '@clerk/nextjs';
import { Authenticated, AuthLoading, ConvexReactClient } from 'convex/react';
import Loading from '@/components/common/loading';

type Props = {
  children: React.ReactNode;
};

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || '';
const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({ children }: Props) => {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <AuthLoading>
        <Loading />
      </AuthLoading>
      {children}
    </ConvexProviderWithClerk>
  );
};

export default ConvexClientProvider;
