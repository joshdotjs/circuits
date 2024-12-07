'use client';
import Image from 'next/image';

// ====================================

export default function Picker() {
  return (
    <div className="border-green-500 border-2">
      <div className="h-10  w-10  hover:border-blue-500  border-white  border-2">
        <Image src="/img/source-voltage-DC.png" alt="Description of the image" width={500} height={300} />
      </div>

      <hr className="border-black border-1" />

      <div className="h-10  w-10  hover:border-blue-500  border-white  border-2">
        <Image src="/img/resistor.png" alt="Description of the image" width={500} height={300} />
      </div>
    </div>
  );
}