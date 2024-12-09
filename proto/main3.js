const graph = {
A: ["B", "C"],
B: ["A", "D", "E"],
C: ["A", "F"],
D: ["B"],
E: ["B", "F"],
F: ["C", "E"]
};

function dfsIterativeWithPaths(graph, start) {
  const stack = [[start, [start]]]; // Stack stores [currentNode, pathSoFar]
  console.log('stack: ', stack);
  debugger;

  const visited = new Set();
  const paths = []; // To store all paths explore

  while (stack.length > 0) {
      const [node, path] = stack.pop(); // Destructure current node and path
      console.log('node: ', node);
      console.log('path: ', path);

      if (visited.has(node)) continue;

      visited.add(node); // Mark node as visited
      console.log('visited: ', visited);

      paths.push(path); // Save the path
      console.log('paths: ', paths);

      // Add neighbors to the stack with updated paths
      for (const neighbor of graph[node]) {
          console.log('neighbor: ', neighbor);
          console.log('visited.has(neighbor): ', visited.has(neighbor));

          if (!visited.has(neighbor)) {
              stack.push([neighbor, [...path, neighbor]]);
          }

          console.log('stack :', stack);
      }
  }

  return paths;
}

// Perform DFS starting from node 'A' and get all paths
const allPaths = dfsIterativeWithPaths(graph, "A");
console.log("All Paths:", allPaths);