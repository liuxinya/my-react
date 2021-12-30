import { myReact } from "./react"

// const reRenderByDiff = (e: any) => {
//     console.log(123);
//     testJsx(e.target.value);
// }
// function TestB() {
//     return (
//         <div className="test">999</div>
//     )
// }
function Test(props: {a: string}) {
    return (
        <div className="test">{props.a}</div>
    )
}

// /** @jsx myReact.createElement */
// export const testJsx = (value: string) => {
//     console.log(333)
//     const [testData, setTestData] = myReact.useState(1);
//     const a = (
//         <div>
//             <span>spnaspan</span>
//             <div className="test"><p className="test1">1</p></div>
//             <a href="www.baidu.com">23123</a>
//             <input type="text" onInput={reRenderByDiff} value={value} id='1' />
//             <div className="iput-val" id='2'>{value}</div>
//             <Test a='哈哈哈哈' />
//             <button onClick={() => setTestData(d => d + 1)}>点击变化</button>
//             {testData}
//         </div>
//     )
//     myReact.render(a, document.getElementById('container'))
// }

// testJsx('11');

// console.log(1, testJsx())




/** @jsx myReact.createElement */
function Counter() {
    const [state, setState] = myReact.useState(1)
    const [state1, setState1] = myReact.useState('1')
    const [state2, setState2] =  myReact.useState(true)
    return (
      <div>
            <button onClick={() => setState(c => c + 1)}>点击</button>
            Count: {state}
            <br/>
            <button onClick={() => setState1(c => c + 1)}>点击</button>
            Count2: <Test a={state1} />
            <button onClick={() => setState2(c => !c)}>点击展示</button>
            {
                state2 && (
                    <Test a={state1} />
                )
            }
      </div>
    )
}
const element = <Counter />
const container = document.getElementById("container")
myReact.render(element, container)
