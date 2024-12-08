'use client';

// hooks:
import { useAppContext } from '@/app/context/app-context';

// ====================================
// ====================================
// ====================================
// ====================================

export default function Board() {

  // ==================================

  const { state, setState } = useAppContext();

  // ==================================

  return (
    <div className="border-blue-500 border-2">
      {
        state.matrix.map((row, idx) => <Row key={`board-row-${idx}`} y={idx} row={row} />)
      }
    </div>
  );
}

// ====================================
// ====================================
// ====================================
// ====================================

function Row({ y, row }: { y: number, row: any[] }) {
  return (
    <div className="flex">
      {
        row.map((point, idx) => <Point key={`board-row-${y}-col-${idx}`} y={y} x={idx} point={point} />)
      }
    </div>   
  );
}

// ====================================
// ====================================
// ====================================
// ====================================

function Point({ x, y, point }: { x: number, y: number, point: any }) {

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
          ${ state.click_num === 0         ? 'pointer-events-none' : '' }
          ${ point?.comp_id  !== undefined ? 'pointer-events-none' : '' }
          text-white text-sm
        `
      }
      onClick={() => {
        console.log(`row: ${y}, col: ${x}`);
        onClick(y, x);
      }}
    >
      { point?.comp_id }
    </div>
  );
}