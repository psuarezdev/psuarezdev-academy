'use client';

import { useEffect } from 'react';

interface SignOutActionProps {
  action: () => Promise<void>;
}

export default function SignOutAction({ action }: SignOutActionProps) {
  useEffect(() => {
    action().then();
  }, []);

  return null;
}
