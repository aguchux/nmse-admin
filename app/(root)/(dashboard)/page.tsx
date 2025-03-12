'use client';
import { useAuthContext } from '@/context/AuthContext';

const LandingPage = () => {
  const { isBusy, user } = useAuthContext();
  return (
    <>
      <h1>Welcome {isBusy ? 'BUSY...' : ''}</h1>
    </>
  );
};

export default LandingPage;
