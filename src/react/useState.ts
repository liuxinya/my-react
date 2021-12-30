import {Hook} from './../interface';
import {myReact} from './index';

type Action<T> = Hook<T>['queue'][0];
export function useState<T>(initial: T): [T, (p: Action<T>) => void] {
    const oldHook = myReact?.wipFiber?.alternate?.hooks?.[myReact.hookIndex];
    const hook: Hook<T> = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    }
    // 从旧的钩子队列中获取所有动作，然后将它们一一应用到新的钩子状态
    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => {
        hook.state = action(hook.state)
    })
    const setState = (action: Hook<T>['queue'][0]) => {
        // 将set动作推进同一个队列数组，等函数组件重新执行，执行动作并set到当前状态
        hook.queue.push(action)
        // 更新的关键在于构建下一个工作单元
        myReact.wipRoot = {
            ...myReact.currentRoot,
            dom: myReact.currentRoot.dom,
            props: myReact.currentRoot.props,
            alternate: myReact.currentRoot,
        }
        myReact.nextUnitOfWork = myReact.wipRoot;
        // 每次构建根节点工作单元时，需重置删除队列
        myReact.deletions = []
    }
    // 记录所有hook
    myReact.wipFiber.hooks.push(hook)
    myReact.hookIndex++
    return [
        hook.state,
        setState,
    ]
}