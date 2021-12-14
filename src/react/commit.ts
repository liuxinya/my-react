import {myReact} from './index';
import {Fiber} from '../interface';

export function commitRoot() {
    commitWork(myReact.wipRoot.child);
    // 根节点只需要渲染一次
    // 下一次更新如果 又生成 新一轮的工作单元，那么会一直重复执行
    myReact.wipRoot = null;
}
export function commitWork(fiber: Fiber) {
    if (!fiber) return;
    const parentDom = fiber.parent.dom;
    parentDom.appendChild(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}