import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloWorld } from './HelloWorld'
import { handleErrors } from './utils'
import JsonViewer from './JsonViewer'
import {FunnelChart} from './FunnelChart/FunnelChart'

import {
  Cell,
  Chunk,
  LookerChartUtils,
  Looker,
  VisualizationDefinition,
  VisOption,
  VisOptions,
  Link, SteppedFunnelChart, Vizzy, 
} from './types'

// Global values provided via the API
declare var looker: Looker
declare var LookerCharts: LookerChartUtils

const vis: SteppedFunnelChart = {
  // initial options applied to viz
  options: {
    label_left_axis: Vizzy.makeToggle("Axes", "Label Left Axis", false, 1),
    label_right_axis: Vizzy.makeToggle("Axes", "Label Right Axis", false, 2),
    bar_colors: Vizzy.makeColor("Bars", "Palette", 1),
    autosort: Vizzy.makeToggle("Bars", "Autosort", false, 2),
    // TODO: Implement below options, font_size semi-implemented in 
    font_size: Vizzy.makeNumber("Bars", "Font Size", 2),
    label_color: Vizzy.makeToggle("Labels", "Color Label", false, 2),
    bar_reverse_colors: Vizzy.makeToggle("Bars", "Reverse Colors", false, 2),
    bar_orientation: Vizzy.makeList("Labels", "Orientation", "automatic",
    [
      {"Automatic": "automatic"},
      {"Data in Rows": "data_in_rows"},
      {"Data in Columns": "data_in_columns"}
    ]
    2),
    label_position: Vizzy.makeList("Labels", "Label Position", "left", 
      [
        {"Left": "left"},
        {"Inline": "inline"},
        {"Right": "right"},
        {"Hidden": "hidden"}
      ]
    ,2),
    label_percent_type: Vizzy.makeList("Labels", "Percent Type", "percent_of_max", 
      [
        {"Percent of Max": "percent_of_max"},
        {"Percent of Prior Row": "percent_of_prior_row"}
      ]
    ,2),
    label_percent_position: Vizzy.makeList("Labels", "Percent Position", "inline", 
      [
        {"Left": "left"},
        {"Inline": "inline"},
        {"Right": "right"},
        {"Hidden": "hidden"}
      ]
    ,2),
    label_value_position: Vizzy.makeList("Labels", "Value Position","right",
      [
        {"Left": "left"},
        {"Inline": "inline"},
        {"Right": "right"},
        {"Hidden": "hidden"}
      ]
    ,2),
  },
  // this happens exactly once
  create(element, config) {
    this.chart = ReactDOM.render(<FunnelChart data={[]} config={config} element={element} openDrillMenu={LookerCharts.Utils.openDrillMenu}/>, element)
  },
  // this happens for every render n > 0
  updateAsync(data, element, config, queryResponse, details, doneRendering) {
    // save a copy of previous render's options
    let previousOptions: VisOptions = {}
    Object.assign(previousOptions, this.options)

    // add any dynamic options
    this.options.left_axis_label = config.label_left_axis && Vizzy.dependString("Axes", "Left Axis Label", "", "label_left_axis", vis)
    this.options.right_axis_label = config.label_right_axis && Vizzy.dependString("Axes", "Right Axis Label", "", "label_right_axis", vis)

    // register new options if options has changed since last render
    if (JSON.stringify(previousOptions) !== JSON.stringify(this.options)) {
      this.trigger && this.trigger('registerOptions', this.options)
    }

    let inputRow = data[0]
    let inputFields =  config.input_fields || queryResponse.fields.measure_like.map((f: any) => f.name)
    inputFields !== config.input_fields && this.trigger && this.trigger("updateConfig",  [{input_fields: config.input_fields}])
    let chunkedData: Chunk[] = inputFields.map((fieldName: string) => {
      let datum = inputRow[fieldName]
      let fieldQr = queryResponse.fields.measure_like.filter((f: any) => f.name === fieldName)[0]
      return {
        label: fieldQr.label_short,
        name: fieldName,
        value: datum.value,
        rendered: datum.rendered,
        links: datum.links as Link[]
      }
    })
    config.autosort && chunkedData.sort((a: Chunk, b: Chunk) => {
      return a.value > b.value ? -1 : 1
    })
    let maxValue = config.autosort ? chunkedData[0].value : Math.max(...chunkedData.map((c: Chunk)=>c.value))
    chunkedData = chunkedData.map((c: Chunk) => {
      return {
        ...c,
        percent: ((c.value / maxValue)*100).toString().substring(0, 4) + "%",
        percent_number: (c.value / maxValue)
      }
    })
    // render chart
    this.chart = ReactDOM.render(
      <FunnelChart 
        data={chunkedData} 
        config={config} 
        element={element} 
        openDrillMenu={LookerCharts.Utils.openDrillMenu}
      />, 
      element
    )

    // tell Looker we're done rendering
    doneRendering();
  }
}


looker.plugins.visualizations.add(vis)
