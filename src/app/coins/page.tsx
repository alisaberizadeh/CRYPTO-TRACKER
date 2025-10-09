import React, { Suspense } from 'react';
import CoinsList from '../components/coinsList/Coins';

function Page() {
  return (
    <div>
      <Suspense fallback={<div className="text-center text-gray-400 mt-10"></div>}>
        <CoinsList />
      </Suspense>
    </div>
  );
}

export default Page;
