import "@babel/polyfill"
import React from "react"
import ReactDOM from "react-dom"
import { createGlobalStyle } from "styled-components"
import App from "./App"

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById("root")
)
