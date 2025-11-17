import React from 'react'
import ClientProfileCard from './ClientProfileCard';

export default function Dashboard(){
  return(
     <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #2f322f 100%)',
      padding: '2rem'
    }}>
      <ClientProfileCard />
    </div>
  );
}