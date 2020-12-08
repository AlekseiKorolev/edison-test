import React, { memo } from "react";

import { PieChart } from "react-minimal-pie-chart";

import "./diagram.scss";

const toChartFormat = data => {
  return data.map(part => {
    return { title: part[0], value: part[1], color: part[2] };
  });
};

const labelFormat = str => {
  if (str.length > 15) {
    return str.slice(0, 15) + "...";
  }
  return str;
};

const Diagram = ({ inner, outer }) => {
  return (
    <div className="diagramContainer">
      <PieChart
        viewBoxSize={[100, 100]}
        data={toChartFormat(outer)}
        radius={38}
        lineWidth={20}
        segmentsShift="1"
        label={({ dataEntry }) => labelFormat(dataEntry.title)}
        labelStyle={{
          fontSize: "0.3em",
          fill: "#000"
        }}
        labelPosition={119}
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

export default memo(Diagram);
