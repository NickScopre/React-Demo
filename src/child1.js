import React, { Component } from "react";
import * as d3 from "d3";
class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //console.log("componentDidMount (data is): ", this.props.data1);
    this.componentDidUpdate()
  }
  componentDidUpdate() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var data = this.props.data1;
    var temp_data = d3.flatRollup(
      data,
      (d) => d.x,
      (d) => d.y,
      (d) => d.cat
    );
    console.log("Temp Data:",temp_data); // Check the format of the data in the conosole


    console.log(data); // Check the format of the data in the conosole

    var container = d3
      .select(".Child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X axis
    var x_data = data.map((item) => item.cat);

    var y_data = {A:0, B:0, C:0};

    for(var i = 0; i < x_data.length; i++){
      if(x_data[i] === "A"){
        y_data.A++;
      }
      else if(x_data[i] === "B"){
        y_data.B++;
      }
      else{
        y_data.C++;
      }
    }


    console.log("Child1 x_data: ", x_data)
    var x_scale = d3
      .scaleBand()
      .domain(x_data)
      .range([margin.left, w])
      .padding(0.2);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));
    // Add Y axis
    //var y_data = data.map((item) => item.y);
    var y_scale = d3
      .scaleLinear()
      .domain([0, d3.max([y_data.A, y_data.B, y_data.C])])
      .range([h, 0]);

    container
      .selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y_scale));

    container
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_scale(d[0]);
      })
      .attr("y", function (d) {
        return y_scale(d[1]);
      })
      .attr("width", x_scale.bandwidth())
      .attr("height", function (d) {
        return h - y_scale(d[1]);
      })
      .attr("fill", "#69b3a2");
  }
  render() {
    return (
      <svg className="Child1_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}
export default Child1;