import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  componentDidUpdate() {
    var data = this.props.data;

    var margin = { top: 20, right: 10, bottom: 50, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_data = data.map(item => item.total_bill);
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);
    container.selectAll(".x_axis_g").data([0]).join("g").attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

    var y_data = data.map(item => item.tip);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join("g").attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));


      container.selectAll(".x_label").data([0]).join("text").attr("class", "x_label")
      .attr("x", w / 2).attr("y", h + margin.bottom-20).attr("text-anchor", "middle")
      .text("Total Bill").style("font-weight", "bold").attr("fill", "black");

    container.selectAll(".y_label").data([0]).join("text").attr("class", "y_label")
      .attr("x", -h / 2).attr("y", -margin.left + 15).attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle").text("Tip").style("font-weight", "bold").attr("fill", "black");

    container.selectAll(".chart_title").data([0]).join("text").attr("class", "chart_title")
      .attr("x", w / 2).attr("y", h-230 ).attr("text-anchor", "middle")
      .style("font-size", "16px").text("Total Bill vs Tip").style("font-weight", "bold").attr("fill", "black");
      
      
    container.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) { return x_scale(d.total_bill); })
      .attr("cy", function (d) { return y_scale(d.tip); })
      .attr("r", 5)
      .style("fill", "#69b3a2")
      .on("mousemove", (event, d) => {
        d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
        d3.select(".tooltip").html(`Total Bill: ${d.total_bill}<br>Tip: ${d.tip}`)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => d3.select(".tooltip").transition().duration(200).style("opacity", 0));
  }

  render() {
    return <svg className="child1_svg"><g></g></svg>;
  }
}

export default Child1;