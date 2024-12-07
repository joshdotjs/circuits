'use client';

// ====================================

export default function Board() {
  return (
    <div className="border-white border-2">
      <Row y={0} />
      <Row y={1} />
      <Row y={2} />
      <Row y={3} />
      <Row y={4} />
    </div>
  );
}

// ====================================

function Row({ y }: { y: number }) {
  return (
    <div className="flex">
      <Point y={y} x={0} />
      <Point y={y} x={1} />
      <Point y={y} x={2} />
    </div>   
  );
}

// ====================================

function Point({ x, y }: { x: number, y: number }) {
  return (
    <div
      data-y="0" 
      data-x={x} 
      onClick={() => console.log(`row: ${y}, col: ${x}`)}
      className="hover:bg-blue-500 h-4 w-4 border-r border-b border-blue-500"
    >
    </div>
  );
}