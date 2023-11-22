export function createEdge<T extends { id: string | number }>(node: T) {
  return {
    node,
    cursor: node.id + '',
  }
}

export function createConnection<T extends { id: string | number }>(
  nodes: T[],
  hasNext: boolean,
  hasPrevious: boolean,
) {
  return {
    edges: nodes.map(createEdge),
    pageInfo: {
      startCursor: nodes[0] ? nodes[0].id + '' : null,
      endCursor: nodes[nodes.length - 1]
        ? nodes[nodes.length - 1].id + ''
        : null,
      hasNextPage: hasNext,
      hasPreviousPage: hasPrevious,
    },
  }
}
