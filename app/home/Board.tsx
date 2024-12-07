'use client';

// hooks:
import { useAppContext } from '@/app/context/app-context';

// ====================================
// ====================================
// ====================================
// ====================================

export default function Board() {
  return (
    <div className="border-blue-500 border-2">
      <Row y={0} />
      <Row y={1} />
      <Row y={2} />
      <Row y={3} />
      <Row y={4} />
    </div>
  );
}

// ====================================
// ====================================
// ====================================
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
// ====================================
// ====================================
// ====================================

function Point({ x, y }: { x: number, y: number }) {

  // ==================================

  const { state, setState } = useAppContext();

  // ==================================

  const onClick = (y: number, x: number) => {
    
    setState((prev) => {

      if (!prev)
        throw new Error("state is null");

      const new_matrix = structuredClone(prev.matrix);
      new_matrix[y][x] = {
        component: prev.selected,
        node_num:  prev.click_num,
        comp_id:   prev.comp_count,
      };

      let new_click_num, new_selected, new_comp_count;
      if (prev.click_num === 1) {
        new_click_num  = 2;
        new_comp_count = prev.comp_count;
        new_selected   = prev.selected;
      }
      else {
        new_click_num  = 0;
        new_comp_count = prev.comp_count + 1;
        new_selected   = '';
      }

      return ({
        ...prev,
        selected:    new_selected,
        click_num:   new_click_num,
        comp_count:  new_comp_count,
        matrix:      new_matrix,
      });
    });
  };

  // TODO: Display the component id in the cells
  // TODO: Don't allow already placed cells to be clicked

  // ==================================

  return (
    <div
      data-y="0" 
      data-x={x} 
      className={
        `
          hover:bg-blue-500 h-4 w-4 border-r border-b border-blue-500
          ${state.click_num === 0 ? 'pointer-events-none' : ''}
        `
      }
      onClick={() => {
        console.log(`row: ${y}, col: ${x}`);
        onClick(y, x);
      }}
    >
    </div>
  );
}