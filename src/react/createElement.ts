import { NodeProps, NodeType, VirtualDomObj } from '../interface';

// 元素节点
export function createElement(type: NodeType, props: NodeProps, ...children: VirtualDomObj[]) {
    // console.log('type', type,props, children)
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return (
                    typeof child === 'object'
                    ? child
                    : createTextElement(child)

                )
            }
            )
        }
    }
}

// 文本节点
export function createTextElement(text: string): VirtualDomObj {
    return {
        type: "TEXT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}