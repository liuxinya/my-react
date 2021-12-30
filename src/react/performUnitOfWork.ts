import {Fiber} from '../interface';
import {createDom} from './createDom';
import {reconcileChildren} from './reconcileChildren';
import {myReact} from './index';

export function performUnitOfWork(fiber: Fiber) {
     // 是否是函数类型组件
     const isFunctionComponent = fiber && fiber.type && (fiber.type as unknown as Function) instanceof Function

     // 如果是函数组件，执行 updateFunctionComponent 函数
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        // 如果不是函数组件，执行 updateHostComponent 函数
        updateHostComponent(fiber)
    }

    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }

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


function updateFunctionComponent(fiber: Fiber) {
    myReact.wipFiber = fiber;
    myReact.wipFiber.hooks = [];
    myReact.hookIndex = 0;
    console.log(111111);
    // fiber.type 就是函数组件本身，fiber.props 就是函数组件的参数
    const children = [(fiber.type as unknown as Function)(fiber.props)]
    // 执行结果就是我们 需要构建的 函数组件类型Fiber的子节点了
    reconcileChildren(fiber, children)
}

function updateHostComponent(fiber: Fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
}