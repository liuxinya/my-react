import {NodeProps} from './../interface';
import {VirtualDomObj} from '../interface';

export function render(element: VirtualDomObj, container: HTMLElement) {
    // 创建当前节点
    const dom = element.type === 'TEXT'
        ? document.createTextNode("")
        : document.createElement(element.type)

    // 有children 就递归创建children
    element.props.children.forEach(child => 
        render(child, dom as any)
    )
    
    // 剔除children属性, 并添加其他属性到当前元素上
    const isProperty = (key: keyof NodeProps) => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })
    // 添加到容器内
    container.appendChild(dom)
}