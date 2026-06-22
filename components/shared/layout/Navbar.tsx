'use client';

import { Suspense } from 'react';
import NavbarContent from './NavbarContent';

export default function Navbar({user, cart}: {
  user: any,
  cart: any
}) {
  return (
    <Suspense fallback={null}>
      <NavbarContent user={user} cart={cart}/>
    </Suspense>
  );
}