import {Fiber} from '../interface';
import {createDom} from './createDom';
import {reconcileChildren} from './reconcileChildren';

export function performUnitOfWork(fiber: Fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }

    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }

    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
    // console.log(fiber)
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
