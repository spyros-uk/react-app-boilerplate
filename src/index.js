import "@babel/polyfill"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { injectGlobal } from "emotion"

injectGlobal`
  body {
    padding: 0;
    margin: 0;
  }
`

ReactDOM.render(<App />, document.getElementById("root"))
