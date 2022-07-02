import { useEffect } from 'react';

class GraphCore {
  name: string;
  constructor(name: string) {
    console.log('cotr-GraphCore');
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const CodeToGraph = new Map<String, GraphCore>();

export const useGraphByCode = (code: string | number) => {
  const key = code.toString();
  let graph = CodeToGraph.get(key);
  if (!graph) {
    graph = new GraphCore(key);
    CodeToGraph.set(key, graph);
  }

  return graph;
};

export const umountGraphByCode = (code: string) => {
  const key = code.toString();
  let graph = CodeToGraph.get(key);
  if (graph) {
    CodeToGraph.delete(key);
  }
};
