import {NodeProps} from './../interface';
import {Fiber} from '../interface';
import { myReact } from '.';

// 对比旧fiber 创建新fiber
export function reconcileChildren(wipFiber: Fiber, elements: NodeProps['children']) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    // 用来记录上个fiber
    let preSibling: Fiber = null;
    // 构建子孙fiber
    // 多个oldFiber 应为子元素有可能被删除了 需要构建 删除列表
    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber: Fiber = null;
        const isSameType = oldFiber && element && oldFiber.type === element.type;
        // 类型相同 -> 只更新props
        if (isSameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE",
                child: null,  // 后续根据 index 添加
                sibling: null, // 后续根据 index 添加
            }
        }
        // 类型不同 且 有新元素 -> 被替换
        if (!isSameType && element) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,  // 被替换的fiber 没有旧fiber
                effectTag: "PLACEMENT",
                child: null,  // 后续根据 index 添加
                sibling: null, // 后续根据 index 添加
            }
        }
        // 类型不同 但是 有旧 fiber -> 被删除了
        // 这里不必担心位置，因为不是数组，只需要专心做新fiber的构建
        // 需保存被删除的fiber 找时机一次性从父元素删除即可
        if (!isSameType && oldFiber) {
            console.log('什么疑似', oldFiber.props.id)
            oldFiber.effectTag = "DELETION"
            myReact.deletions.push(oldFiber)
            // console.log(myReact.deletions, oldFiber, element);
        }     
        // 这句话狠重要，喵的 找半天bug
        // 对比一定要同步。。
        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }   
        if (index === 0) {
            wipFiber.child = newFiber;
        // 可能oldFiber 会导致 再次循环 有没有子元素 所以要要加个判断 element
        } else if (element) {
            preSibling.sibling = newFiber;
        }
        preSibling = newFiber;
        index++;
    }
}