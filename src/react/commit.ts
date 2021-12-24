import {myReact} from './index';
import {Fiber} from '../interface';
import {updateDom} from './createDom';

export function commitRoot() {
    myReact.deletions.forEach(commitWork)
    commitWork(myReact.wipRoot.child);
    // 根节点只需要渲染一次
    // 下一次更新如果 又生成 新一轮的工作单元，那么会一直重复执行
    myReact.currentRoot = myReact.wipRoot;
    myReact.wipRoot = null;
}
export function commitWork(fiber: Fiber) {
    if (!fiber) return;

    let domParentFiber = fiber.parent
    // 有dom的第一个祖先节点
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }

    const parentDom = domParentFiber.dom;

    if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
        // 替换直接append
        parentDom.appendChild(fiber.dom);

    } else if (fiber.effectTag === "DELETION") {
        // console.log(fiber);
        commitDeletion(fiber, parentDom as HTMLElement)

        // 删除就从父亲元素里面删除
        // parentDom.removeChild(fiber.dom)

    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        // 更新需要更新相关属性
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    }
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}


function commitDeletion(fiber: Fiber, parentDom: HTMLElement) {
    if (fiber.dom) {
        parentDom.removeChild(fiber.dom)
    } else {
         // 找到有dom的子节点
        commitDeletion(fiber.child, parentDom)
    }
}