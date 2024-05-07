import React, { Component } from "react";
import "./App.css"
import Child1 from "./child1.js"
import Child2 from "./child2.js"
import * as d3 from 'd3'
import sample from './SampleDataset.csv'

class App extends Component {
  constructor(props) {
    super(props)
    // data is initialized as an empty array
    this.state = { data: [] }
  }
  componentDidMount() {
    // self contains the reference to the class (App) as 
    // "this" would reference the most recent function 
    var self = this;

    d3.csv(sample, function (d) {
      return {
        x: parseInt(d.x),
        y: parseInt(d.y),
        cat: d.category
      }
    }).then(function (csv_data) {
      self.setState({ data: csv_data })
    })
      .catch(function (err) {
        console.log(err)
      })

  }

  // render is called whenever a state variable is updated
  render() {
    const { data } = this.state;
    if (data.length === 0) {
      return <div>Loading...</div>;
    }
    return <div className="parent">
      <div className="child1">
        <Child1 data1={this.state.data}></Child1>
      </div>
      <div className="child2">
        <Child2 data1={this.state.data}></Child2>
      </div>
    </div>
  }
}

export default App