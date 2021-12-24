import {NodeProps} from './../interface';
import {Fiber} from '../interface';

// 是否是children属性
const isProperty = (key: keyof NodeProps) => key !== "children"

// 看下旧的属性是否存在于新的fiber props上 不在就是删除了
const isGone = (prev: Fiber['props'], next: Fiber['props']) => (key: keyof NodeProps) => !(key in next)

// 看下新旧属性值是否一样
const isNew = (prev: Fiber['props'], next: Fiber['props']) => (key: keyof NodeProps) => prev[key] !== next[key]

// 是否是事件， 我没定义那多props的属性类型， 这里就直接用了string类型
const isEvent = (key: string) => key.startsWith("on")

export function createDom (fiber: Fiber) {
    console.log(fiber)
    const dom = fiber.type === 'TEXT'
        ? document.createTextNode("")
        : document.createElement(fiber.type)

        // Object.keys(fiber.props)
        // .filter(isProperty)
        // .forEach(name => {
        //     dom[name] = fiber.props[name]
        // })
        updateDom(dom, {}, fiber.props);
    return dom
}

export function updateDom(dom: Fiber['dom'], prevProps: Fiber['props'], nextProps: Fiber['props']) {
    // console.log(dom, prevProps, nextProps)
    // 遍历旧props，删除不在新props的旧属性
    Object.keys(prevProps)
        // 过滤掉 children 属性
        .filter(isProperty)
        // 过滤出来已经删除的
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = ""
        })

    // 遍历新属性，更新新属性
    Object.keys(nextProps)
        // 过滤掉 children 属性
        .filter(isProperty)
        // 过滤出来新加的属性
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name]
        })

    // 删除旧的或者有变化的事件
    Object.keys(prevProps)
        .filter(isEvent)
        // 不在新props上 或者 不是新的
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key as any))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.removeEventListener(
                eventType,
                prevProps[name]
            )
        })
    // 注册事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(
                eventType,
                nextProps[name]
            )
        })
}