const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};


// A  -  B           -  A             (REVISITS B-A)
//       graph.A[0]     graph.B[0]

// A  -  B           -  D             (DEAD-END)
//       graph.A[0]     graph.B[1]

// A  -  B           -  E    
//       graph.A[0]     graph.B[2]

// A  -  B           -  E           -  B          (REVISITS E-B)
//       graph.A[0]     graph.B[2]     graph.E[0]

// A  -  B           -  E           -  F          
//       graph.A[0]     graph.B[2]     graph.E[1]

// A  -  B           -  E           -  F           -  C  
//       graph.A[0]     graph.B[2]     graph.E[1]     graph.F[0]

// A  -  B           -  E           -  F           -  C           -  A  (END-FULL-LOOP)
//       graph.A[0]     graph.B[2]     graph.E[1]     graph.F[0]     graph.C[0] ******

// A  -  B           -  E           -  F           -  C           -  F  (REVISITS F-C)
//       graph.A[0]     graph.B[2]     graph.E[1]     graph.F[0]     graph.C[1] ******

// A  -  B           -  E           -  F           -  E  (REVISITS F-E) 
//       graph.A[0]     graph.B[2]     graph.E[1]     graph.F[1] ******

// A  -  C
//       graph.A[1]

// A  -  C           -  A  (REVISITS A-C)
//       graph.A[1]     graph.C[0]

// A  -  C           -  F
//       graph.A[1]     graph.C[1]

// A  -  C           -  F           -  C  (REVISITS F-C)
//       graph.A[1]     graph.C[1]     graph.F[0]

// A  -  C           -  F           -  E 
//       graph.A[1]     graph.C[1]     graph.F[1]

// A  -  C           -  F           -  E           -  B
//       graph.A[1]     graph.C[1]     graph.F[1]     graph.E[0]

// A  -  C           -  F           -  E           -  B           -  A  (END-FULL-LOOP)
//       graph.A[1]     graph.C[1]     graph.F[1]     graph.E[0]     graph.B[0]

// A  -  C           -  F           -  E           -  B           -  D 
//       graph.A[1]     graph.C[1]     graph.F[1]     graph.E[0]     graph.B[1]

// A  -  C           -  F           -  E           -  B           -  D           -  B  (REVISITS D-B)
//       graph.A[1]     graph.C[1]     graph.F[1]     graph.E[0]     graph.B[1]     graph.D[0]

// A  -  C           -  F           -  E           -  B           -  E  (REVISITS B-E)
//       graph.A[1]     graph.C[1]     graph.F[1]     graph.E[0]     graph.B[2]

// A  -  C           -  F           -  E           -  F  (REVISITS E-F) 
//       graph.A[1]     graph.C[1]     graph.F[1]     graph.E[1]