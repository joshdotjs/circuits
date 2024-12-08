const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

function findPathsAndLoops(graph, start) {
  const paths = [];          // Stores all paths
  const visitedEdges = new Set(); // Tracks visited edges (undirected)
  const stack = [[start, []]]; // Stack with [currentNode, currentPath]

  while (stack.length > 0) {
    const [node, path] = stack.pop();
    const currentPath = [...path, node];

    for (const neighbor of graph[node]) {
      const edge = `${node}-${neighbor}`;
      const reverseEdge = `${neighbor}-${node}`; // For undirected graphs

      if (!visitedEdges.has(edge) && !visitedEdges.has(reverseEdge)) {
        if (neighbor === start && currentPath.length > 1) {
          // Loop found (back to the start)
          paths.push([...currentPath, neighbor]);
        } else {
          // Visit new node
          stack.push([neighbor, currentPath]);
          visitedEdges.add(edge); // Mark edge as visited
        }
      }
    }

    // If this node is a dead end, add it as a path
    if (graph[node].every(neighbor => visitedEdges.has(`${node}-${neighbor}`) || visitedEdges.has(`${neighbor}-${node}`))) {
      paths.push(currentPath);
    } 
  }

  return paths;
}

// Run the algorithm
const result = findPathsAndLoops(graph, "A");
console.log(result);