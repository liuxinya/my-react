import {VirtualDomObj} from '../interface';
import {myReact} from './index';

export function render(element: VirtualDomObj, container: HTMLElement) {
    myReact.wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        child: null,
        sibling: null,
        parent: null,
        type: null,
        alternate: myReact.currentRoot,
        effectTag: null,
    }
    // 初始化第一次 工作单元为根节点
    myReact.nextUnitOfWork = myReact.wipRoot;
    // 初始化需删除的fiber
    console.log('sdfjla;djklf', element)
    myReact.deletions = [];
}