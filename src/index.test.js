import React from "react"
import { mount } from "enzyme"

import App from "./App"

it("renders the App without crashing", () => {
  const app = mount(<App />)

  expect(app.exists()).toEqual(true)
})
