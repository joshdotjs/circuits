'use client';
import Picker from './Picker';
import Board from './Board';

// ====================================

export default function HomePage() {
  return (
    <main className="flex border-orange-500 border-2">
      <Picker />
      <Board />
    </main>
  );
}