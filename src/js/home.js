import '../css/styles.css'
import {
  render
} from "react-dom"
import React from 'react'
import {
  delayMessage,
  firstMessage
} from './message'
import dataTeachers from '../data/teachers.json'
import { Teachers } from "./TeachersComponent.jsx"
import undeadTimeFreeze from '../assets/undeadTimeFreeze.jpg'

//document.body.style.background = `url(${undeadTimeFreeze}) no-repeat center center fixed`
//document.body.style.color = "white"

console.log(dataTeachers)

//delayMessage()
document.write(firstMessage)

const appReactEl = document.createElement("div")
appReactEl.setAttribute("id", "app-react")
document.body.appendChild(appReactEl)
render(<Teachers teachers={dataTeachers.teachers}></Teachers>, document.getElementById("app-react"))