'use client';
import Image from 'next/image';

// hooks:
import { useAppContext } from '@/app/context/app-context';

// ====================================
// ====================================
// ====================================
// ====================================

const components = [
  {
    title: 'DC Voltage Source',
    slug: 'dc-voltage-source',
    imgSrc: "/img/source-voltage-DC.png",
    imgAlt: "Description of the image"
  },
  {
    title: 'Resistor',
    slug: 'resistor',
    imgSrc: "/img/resistor.png",
    imgAlt: "Description of the image"
  }
];

// ====================================
// ====================================
// ====================================
// ====================================

export default function Picker() {

  // ==================================

  const { state, setState } = useAppContext();

  // ==================================

  const onClick = (slug: string) => setState(slug);

  // ==================================

  return (
    <div className="border-black border-2">
      {
        components.map(({ title, slug, imgSrc, imgAlt }) => {
          return (
            <div 
              key={`picker-component-${slug}`}
              className={
                `
                  h-10  w-10  hover:border-blue-500  border-white  border-2
                  ${ state === slug ? 'border-yellow-500 !important' : ''  }
                `
              }
              onClick={() => onClick(slug)}
            >
              <Image src={imgSrc} alt={imgAlt} width={500} height={300} />
            </div>            
          );
        })
      }
    </div>
  );
}