import {performUnitOfWork} from './performUnitOfWork';
import {myReact} from './index';
import {commitRoot} from './commit';

export function workLoop (deadline: IdleDeadline) {
    let shouldYield = false
    // 浏览器有空闲时间 且 有下一个工作单元
    while (myReact.nextUnitOfWork && !shouldYield) {
        myReact.nextUnitOfWork = performUnitOfWork(myReact.nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }

    if (!myReact.nextUnitOfWork && myReact.wipRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop)
}