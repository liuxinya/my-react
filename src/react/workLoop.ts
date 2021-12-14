import {performUnitOfWork} from './performUnitOfWork';
import {myReact} from './index';

export function workLoop (deadline: IdleDeadline) {
    let shouldYield = false
    // 浏览器有空闲时间 且 有下一个工作单元
    while (myReact.nextUnitOfWork && !shouldYield) {
        myReact.nextUnitOfWork = performUnitOfWork(myReact.nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }

    requestIdleCallback(workLoop)
}