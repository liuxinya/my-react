import {Fiber} from '../interface';
import {createDom} from './createDom';

export function performUnitOfWork(fiber: Fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }
    let index = 0;
    const elements = fiber.props.children;
    // 用来记录上个fiber
    let preSibling: Fiber = null;
    // 构建子孙fiber
    while (index < elements.length) {
        const element = elements[index];
        const newFiber: Fiber = {
            type: element.type,
            props: element.props,
            dom: null,
            parent: fiber,
            child: null,
            sibling: null,
        }
        // 第一个作为孩子
        // 其他的作为上一个fiber节点的兄弟
        if (index === 0) {
            fiber.child = newFiber;
        } else {
            preSibling.sibling = newFiber;
        }
        preSibling = newFiber;
        index++;
    }
    // 返回下一个fiber节点
    // 有 child 返回 child
    // 没child 返回 sibling
    // 没 child 没 sibling 返回父节点的sibling
    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent
    }
}
