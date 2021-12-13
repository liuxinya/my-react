import { myReact } from "./react"

/** @jsx myReact.createElement */
export const testJsx = () => (
    <div>
        <span>spnaspan</span>
        <div className="test"><p className="test1">1</p></div>
        <a href="">23123</a>
        999
    </div>
)

// console.log(1, testJsx())
myReact.render(testJsx(), document.getElementById('container'))
