import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloWorld } from './HelloWorld'
import { handleErrors } from './utils'

import {
  Cell,
  Link,
  LookerChartUtils,
  Looker,
  VisualizationDefinition
} from './types'

// Global values provided via the API
declare var looker: Looker
declare var LookerChart: LookerChartUtils

interface HelloWorldChart extends VisualizationDefinition {
  chart?: any
}

const vis: HelloWorldChart = {
  options: {
    text: {
      type:"string",
      label:"Text to display"
    }
  },

  create(element, config){
    this.chart = ReactDOM.render(<div className="vis"></div>, element)
  },

  updateAsync(data, element, config, queryResponse, details, doneRendering) {
    this.chart = ReactDOM.render(<HelloWorld message={config.text}/>, element)

    doneRendering();
  }
}


looker.plugins.visualizations.add(vis)