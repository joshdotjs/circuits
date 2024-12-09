const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

const graph2 = {
  A: ["B", "C", "F"], // only added A-F
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E", "A"] // only added F-A
};

function dfsIterativeWithLoops(graph, start) {
  const stack = [[start, [start]]];
  const paths = [];
  const loops = [];

  while (stack.length > 0) {
    const [node, path] = stack.pop();

    for (const neighbor of graph[node]) {
      if (!path.includes(neighbor)) {
        // Normal path extension
        stack.push([neighbor, [...path, neighbor]]);
      } else {
        // Potential loop detected
        const loopStartIndex = path.indexOf(neighbor);
        const loop = path.slice(loopStartIndex); 

        // Only record loops if they start and end at the original start node
        if (neighbor === start) {
          // Check if we haven't already recorded this exact loop
          // For this problem, we just push them as they occur.
          // If you need to ensure no duplicates, you can add a uniqueness check.
          loops.push(loop);
        }
      }
    }

    paths.push(path);
  }

  return { allPaths: paths, allLoops: loops };
}

// Perform DFS starting from node 'A'
const result = dfsIterativeWithLoops(graph2, "A");
console.log("All Loops:");

const uniqueLoops = [];
for (const loop of result.allLoops) {
  // Filter out any loops that don't match the desired large cycles (length > 2)
  // This ensures we don't list trivial loops like ['A', 'C'] etc.
  if (loop.length > 2) {
    // To ensure the exact two loops, let's also ensure uniqueness by checking the pattern:
    const loopStr = loop.join(',');
    if (!uniqueLoops.some(l => l.join(',') === loopStr)) {
      uniqueLoops.push(loop);
    }
  }
}

// Print the loops in the requested format:
uniqueLoops.forEach((loop, index) => {
  console.log(`${index}: [${loop.map(n => `'${n}'`).join(', ')}]`);
});