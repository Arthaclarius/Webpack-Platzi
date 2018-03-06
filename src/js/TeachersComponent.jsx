import React, { Component } from 'react'
import '../css/teachers.scss'
import '../css/teachers.styl'
import '../css/Teachers.less'

export class Teacher extends Component {
  render() {
    return (
      <li><a className="Teacher" href={this.props.url}>{this.props.children}</a></li>
    )
  }
}

export class Teachers extends Component {
  render() {
    return (
      <ul className="Teachers">
        {
          this.props.teachers.map((val, key) => {
            return (
              <Teacher key={key} url={val.twitter}>{val.name}</Teacher>
            )
          })
        }
      </ul>
    )
  }
}