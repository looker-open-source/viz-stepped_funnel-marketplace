import * as React from "react";
import * as ReactDOM from "react-dom";
import {FunnelChart} from './FunnelChart/FunnelChart'
import {ComponentsProvider} from "@looker/components"
import {getRendered} from "./utils"
import {
  Chunk,
  LookerChartUtils,
  Looker,
  VisOptions,
  Link, 
  SteppedFunnelChart, 
  Vizzy, 
  VisConfig,
} from './types'
import { prepareTurtlesQuery, TURTLES } from "./turtles";

// Global values provided via the API
declare var looker: Looker
declare var LookerCharts: LookerChartUtils

const vis: SteppedFunnelChart = {
  // initial options applied to viz
  options: {
    // AXES
    label_left_axis: Vizzy.makeToggle("Axes", "Label Left Axis", false, 1),
    label_right_axis: Vizzy.makeToggle("Axes", "Label Right Axis", false, 2),

    // BARS
    bar_colors: Vizzy.makeColor("Bars", "Palette", 1),
    autosort: Vizzy.makeToggle("Bars", "Autosort", false, 2),
    font_size: Vizzy.makeNumber("Bars", "Font Size", 2, 3),

    // LABELS
    // TODO: decide on deprecating this
    // label_color: Vizzy.makeToggle("Labels", "Color Label", false, 1),
    bar_orientation: Vizzy.makeList("Labels", "Orientation", "automatic",
    [
      {"Automatic": "automatic"},
      {"Data in Rows": "data_in_rows"},
      {"Data in Columns": "data_in_columns"}
    ],
    2),
    percent_type: Vizzy.makeList("Labels", "Percent Type", "percent_of_max", 
      [
        {"Percent of Max": "percent_of_max"},
        {"Percent of Prior": "percent_of_prior"}
      ]
    ,
    3),
    label_position: Vizzy.makeSmallList("Labels", "Label", "left", 
      [
        {"Left": "left"},
        {"Inline": "inline"},
        {"Right": "right"},
        {"Hidden": "hidden"}
      ]
    ,
    4),
    percent_position: Vizzy.makeSmallList("Labels", "Percent", "inline", 
      [
        {"Left": "left"},
        {"Inline": "inline"},
        {"Right": "right"},
        {"Hidden": "hidden"}
      ]
    ,
    5),
    value_position: Vizzy.makeSmallList("Labels", "Value","right",
      [
        {"Left": "left"},
        {"Inline": "inline"},
        {"Right": "right"},
        {"Hidden": "hidden"}
      ]
    ,
    6),
  },
  // this happens exactly once
  create(element, config) {
    // DO NOTHING
  },
  // this happens for every render n > 0
  updateAsync(data, element, config, queryResponse, details, doneRendering) {
    // save a copy of previous render's options
    let previousOptions: VisOptions = {}
    Object.assign(previousOptions, this.options)

    // add any dynamic options
    this.options.left_axis_label = config.label_left_axis && Vizzy.dependString("Axes", "Left Axis Label", "", "label_left_axis", vis)
    this.options.right_axis_label = config.label_right_axis && Vizzy.dependString("Axes", "Right Axis Label", "", "label_right_axis", vis)
    this.options.bar_reverse_colors = Vizzy.dependToggle("Bars", "Reverse Colors", false, "bar_colors", vis)
    // TODO: decide on deprecating this
    // this.options.label_color_code = config.label_color && Vizzy.dependSingleColor("Labels", "", "label_color", vis)

    // register new options if options has changed since last render
    if (JSON.stringify(previousOptions) !== JSON.stringify(this.options)) {
      this.trigger && this.trigger('registerOptions', this.options)
    }

    let inputRow = data[0]
    let turtleQuery = Object.keys(inputRow).find(e => e.startsWith(TURTLES))
    let inputFields =  config.input_fields || queryResponse.fields.measure_like.map((f: any) => f.name)
    inputFields !== config.input_fields && this.trigger && this.trigger("updateConfig",  [{input_fields: config.input_fields}])
    let chunkedData: Chunk[] = inputFields.filter((e: string) => !e.startsWith(TURTLES)).map((fieldName: string) => {
      let datum = inputRow[fieldName]
      let fieldQr = queryResponse.fields.measure_like.filter((f: any) => f.name === fieldName)[0]
      return {
        label: fieldQr.label_short,
        name: fieldName,
        value: datum.value,
        value_rendered: datum.rendered,
        links: datum.links as Link[] || [],
        ...(turtleQuery && {turtle: prepareTurtlesQuery(inputRow, fieldName, turtleQuery, queryResponse)})
      }
    })
    config.autosort && chunkedData.sort((a: Chunk, b: Chunk) => {
      return a.value > b.value ? -1 : 1
    })
    let maxValue = config.autosort ? chunkedData[0].value : Math.max(...chunkedData.map((c: Chunk)=>c.value))
    let priorRowCalc = config.percent_type === "percent_of_prior" && chunkedData.map((c: Chunk, i: number) => {
      let indexBefore =  i > 0 ? i - 1 : 0
      let denom = chunkedData[indexBefore].value
      return (c.value / denom)
    })
    chunkedData = chunkedData.map((c: Chunk, i: number) => {
      return {
        ...c,
        percent_rendered: ((priorRowCalc && priorRowCalc[i] || c.value / maxValue)*100).toString().substring(0, 4) + "%",
        percent_number: (priorRowCalc && priorRowCalc[i] || (c.value / maxValue)),
        percent_container: (priorRowCalc && (priorRowCalc[i] / Math.max(...priorRowCalc))) || (c.value / maxValue),
      }
    })
    chunkedData = chunkedData.map((c: Chunk, i: number) => {
      return {
        ...c,
        left_rendered: getRendered(config, c, "left"),
        inline_rendered: getRendered(config, c, "inline"),
        right_rendered: getRendered(config, c, "right"),
        tooltip_rendered: `${c.label}: ${c.value_rendered} (${c.percent_rendered})`
      }
    })
    // render chart
    this.chart = ReactDOM.render(
      <ComponentsProvider>
        <FunnelChart 
          data={chunkedData} 
          config={config} 
          element={element} 
          openDrillMenu={LookerCharts.Utils.openDrillMenu}
        />
      </ComponentsProvider>,
      element
    )

    // tell Looker we're done rendering
    doneRendering();
  }
}


looker.plugins.visualizations.add(vis)
