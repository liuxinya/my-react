import {createElement} from './createElement';
import {render} from './render';
import {Fiber} from '../interface';
import {workLoop} from './workLoop';

class MyReact {
    constructor() {
        // 启动工作单元循环
        requestIdleCallback(workLoop)
    }
    // 保存下一个工作单元
    private _nextUnitOfWork: Fiber = null;
    private _wipRoot: Fiber = null;
    // 保存根节点
    get nextUnitOfWork() {
        return this._nextUnitOfWork;
    }
    set nextUnitOfWork(fiber: Fiber) {
        this._nextUnitOfWork = fiber;
    };
    get wipRoot() {
        return this._wipRoot;
    }
    set wipRoot(fiber: Fiber) {
        this._wipRoot = fiber;
    }
    createElement = createElement;
    render = render;
};


export const myReact = new MyReact();
