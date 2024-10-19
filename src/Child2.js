import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data);
  }

  componentDidUpdate() {
    var data = this.props.data;

    var margin = { top: 50, right: 10, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const avgTips = d3.flatRollup(data, v => d3.mean(v, d => +d.tip), d => d.day);

    const xScale = d3.scaleBand().domain(avgTips.map(d => d[0])).range([0, w]).padding(0.2);

    container.selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(xScale));

    const yScale = d3.scaleLinear().domain([0, d3.max(avgTips, d => d[1])]).range([h, 0]);

    container.selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .call(d3.axisLeft(yScale));


    container.selectAll(".x_label").data([0]).join("text").attr("class", "x_label")
      .attr("x", w / 2).attr("y", h + margin.bottom - 20).attr("text-anchor", "middle")
      .text("Day").style("font-weight", "bold").attr("fill", "black");

    container.selectAll(".y_label").data([0]).join("text").attr("class", "y_label")
      .attr("x", -h / 2).attr("y", -margin.left + 15).attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle").text("Average Tip").style("font-weight", "bold").attr("fill", "black");

    container.selectAll(".chart_title").data([0]).join("text").attr("class", "chart_title")
      .attr("x", w / 2).attr("y", h-220 ).attr("text-anchor", "middle")
      .style("font-size", "16px").text("Average Tip by Day").style("font-weight", "bold").attr("fill", "black");


    container.selectAll("rect")
      .data(avgTips)
      .join("rect")
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => h - yScale(d[1]))
      .style("fill", "#69b3a2")
      .on("mousemove", (event, d) => {
        d3.select(".tooltip").transition().duration(200).style("opacity", 0.9);
        d3.select(".tooltip").html(`${d[0]}: ${d[1].toFixed(2)}`)
          .style("left", `${event.pageX}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => d3.select(".tooltip").transition().duration(200).style("opacity", 0));
  }

  render() {
    return <svg className="child2_svg"><g></g></svg>;
  }
}
export default Child2;