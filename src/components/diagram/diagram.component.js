import React from "react";

import { PieChart } from "react-minimal-pie-chart";

import "./diagram.scss";

const toChartFormat = data => {
  return data.map(part => {
    return { title: part[0], value: part[1], color: part[2] };
  });
};

const Diagram = ({ inner, outer }) => {
  return (
    <div className="diagramContainer">
      <PieChart
        viewBoxSize={[100, 100]}
        data={toChartFormat(outer)}
        radius={45}
        lineWidth={25}
        segmentsShift="1"
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: "0.4em",
          fill: "#000000"
        }}
        labelPosition={105}
        className="outer"
      />
      <PieChart
        data={toChartFormat(inner)}
        radius={25}
        segmentsShift="1"
        className="inner"
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          fontSize: "0.3em",
          fill: "#ffffff"
        }}
        labelPosition={50}
      />
    </div>
  );
};

export default Diagram;
