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

export interface Fiber {
    type: NodeType,
    dom: HTMLElement | Text,
    child: Fiber,
    parent: Fiber,
    sibling: Fiber,
    props: NodeProps,
    alternate: Fiber,
    effectTag: 'UPDATE' | 'PLACEMENT' | 'DELETION'
}