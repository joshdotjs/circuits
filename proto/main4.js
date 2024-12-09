const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

function dfsIterativeWithLoops(graph, start) {
  const stack = [[start, [start]]]; // Stack stores [currentNode, pathSoFar]
  const paths = []; // To store all explored paths
  const loops = []; // To store all detected loops

  while (stack.length > 0) {
    const [node, path] = stack.pop();
    
    // Explore all neighbors of the current node
    for (const neighbor of graph[node]) {
      if (!path.includes(neighbor)) {
        // If neighbor is not already in the path, we proceed
        // and add the neighbor to the path
        stack.push([neighbor, [...path, neighbor]]);
      } else {
        // A loop is detected since neighbor is already in the path
        const loopStartIndex = path.indexOf(neighbor);
        const loop = path.slice(loopStartIndex);
        
        // Check if we haven't already recorded this loop 
        // (Optional: You might want to normalize or sort loops for 
        // deduplication. For now, we just push it.)
        loops.push(loop);
      }
    }

    paths.push(path);
  }

  return { allPaths: paths, allLoops: loops };
}

// Perform DFS starting from node 'A'
const result = dfsIterativeWithLoops(graph, "A");
console.log("All Paths:", result.allPaths);
console.log("All Loops:", result.allLoops);