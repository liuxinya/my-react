import {NodeProps} from './../interface';
import {Fiber} from '../interface';

export function createDom (fiber: Fiber) {
    const dom = fiber.type === 'TEXT'
        ? document.createTextNode("")
        : document.createElement(fiber.type)

    const isProperty = (key: keyof NodeProps) => key !== "children"
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = fiber.props[name]
        })
    return dom
}