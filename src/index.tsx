import { myReact } from "./react"

const reRenderByDiff = (e: any) => {
    console.log(123);
    testJsx(e.target.value);
}
function TestB() {
    return (
        <div className="test">999</div>
    )
}
function Test(props: {a: string}) {
    return (
        <div className="test"><TestB /></div>
    )
}

/** @jsx myReact.createElement */
export const testJsx = (value: string) => {
    const a = (
        <div>
            <span>spnaspan</span>
            <div className="test"><p className="test1">1</p></div>
            <a href="www.baidu.com">23123</a>
            <input type="text" onInput={reRenderByDiff} value={value} id='1' />
            <div className="iput-val" id='2'>{value}</div>
            <Test a='哈哈哈哈' />
        </div>
    )
    myReact.render(a, document.getElementById('container'))
}

testJsx('11');

// console.log(1, testJsx())
