import dagre from 'dagre';
import type { Node, Edge } from '@xyflow/react';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 180;
const nodeHeight = 80;

export type LayoutDirection = 'TB' | 'BT' | 'LR' | 'RL';

export function getLayoutedElements(
    nodes: Node[],
    edges: Edge[],
    direction: LayoutDirection = 'TB'
): { nodes: Node[]; edges: Edge[] } {
    const isHorizontal = direction === 'LR' || direction === 'RL';

    dagreGraph.setGraph({
        rankdir: direction,
        nodesep: 50,
        ranksep: 80,
        edgesep: 20,
    });

    // Clear previous nodes and edges
    dagreGraph.nodes().forEach((node) => dagreGraph.removeNode(node));

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
        };
    });

    return { nodes: layoutedNodes as Node[], edges };
}
