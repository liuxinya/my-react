import {Fiber} from './../interface';
import {createElement} from './createElement';
import {render} from './render';
import {useState} from './useState';
import {workLoop} from './workLoop';

class MyReact {
    constructor() {
        // 启动工作单元循环
        requestIdleCallback(workLoop)
    }
    // 保存当前hooks索引
    private _hookIndex: number = 0;
    // 保存当前工作单元
    private _wipFiber: Fiber = null;
    // 保存下一个工作单元
    private _nextUnitOfWork: Fiber = null;
    // 保存根节点
    private _wipRoot: Fiber = null;
    // 保存根节点更新前的 fiber tree
    private _currentRoot: Fiber = null;
    // 保存每次变动 需要删除的fiber集合
    private _deletions: Fiber[] = [];

    get wipFiber() {
        return this._wipFiber;
    }
    set wipFiber(fiber: Fiber) {
        this._wipFiber = fiber;
    }
    get hookIndex() {
        return this._hookIndex;
    }
    set hookIndex(index: number) {
        this._hookIndex = index;
    }
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
    get useState() {
        return useState;
    }
};


export const myReact = new MyReact();
