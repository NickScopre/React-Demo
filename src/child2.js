import React, { Component } from "react";
import * as d3 from 'd3'

class Child2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDropdownValue: "A"
        }
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    componentDidMount() {
        console.log("Child2 props: ", this.props.data1);
        this.componentDidUpdate()
    }

    componentDidUpdate() {
        var data = this.props.data1

        var margin = { top: 10, right: 10, bottom: 30, left: 20 },
            w = 500 - margin.left - margin.right,
            h = 300 - margin.top - margin.bottom;

        var container = d3.select(".Child2_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".g_1")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // X-axis
        var x_data = data.map(item => item.x)
        console.log("Xdata: ", x_data)
        const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);
        console.log("Xscale: ", x_scale)
        container.selectAll(".x_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
            .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

        // Y-axis
        var y_data = data.map(item => item.y)
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
        container.selectAll(".y_axis_g").data([0]).join('g').attr("class", 'x_axis_g')
            .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));

        container.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", function (d) {
                return x_scale(d.x);
            })
            .attr("cy", function (d) {
                return y_scale(d.y);
            })
            .attr("r", 3)
            .style("fill", "#69b3a2")
    }

    handleDropdownChange(event) {
        const newDropdownValue = event.target.value;
        this.setState({ selectedDropdownValue: newDropdownValue });
      }

    render() {
        return <div className="container">
            <div className='dropdown'>
                Select Target:
                <select value={this.state.selectedDropdownValue} onChange={this.handleDropdownChange}>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                    {console.log("Selected Target Updated: ", this.state.selectedDropdownValue)}
                </select>
            </div>
            <svg className="Child2_svg">
                <g className="g_1"></g>
            </svg>
        </div>
    }
}

export default Child2