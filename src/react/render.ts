import {NodeProps} from './../interface';
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
    }
    myReact.nextUnitOfWork = myReact.wipRoot;
}