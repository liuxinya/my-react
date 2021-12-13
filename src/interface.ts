export type NodeType = 'DIV' | 'TEXT';
export type NodeProps = {
    nodeValue?: string;
    className?: string;
    id?: string;
    children?: VirtualDomObj[];
}

export interface VirtualDomObj {
    type: NodeType;
    props: NodeProps;
}