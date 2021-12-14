import {NodeProps} from './../interface';
import {VirtualDomObj} from '../interface';
import {myReact} from './index';

export function render(element: VirtualDomObj, container: HTMLElement) {
    myReact.nextUnitOfWork = {
        dom: container,
        props: {
            children: [element]
        },
        child: null,
        sibling: null,
        parent: null,
        type: null,
    }
}