import {Fiber} from './../interface';
import {createElement} from './createElement';
import {render} from './render';
import {workLoop} from './workLoop';

class MyReact {
    constructor() {
        // 启动工作单元循环
        requestIdleCallback(workLoop)
    }
    // 保存下一个工作单元
    private _nextUnitOfWork: Fiber = null;
    // 保存根节点
    private _wipRoot: Fiber = null;
    // 保存根节点更新前的 fiber tree
    private _currentRoot: Fiber = null;
    // 保存每次变动 需要删除的fiber集合
    private _deletions: Fiber[] = [];
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
    get deletions() {
        return this._deletions;
    }
    set deletions(delArr: Fiber[] ) {
        this._deletions = delArr;
    }
    get currentRoot() {
        return this._currentRoot;
    }
    set currentRoot(fiber: Fiber) {
        this._currentRoot = fiber;
    }
    get createElement() {
        return createElement;
    }
    get render() {
        return render;
    }
};


export const myReact = new MyReact();
