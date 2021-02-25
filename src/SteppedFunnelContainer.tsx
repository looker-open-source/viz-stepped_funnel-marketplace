import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloWorld } from './HelloWorld'
import { handleErrors } from './utils'
import JsonViewer from './JsonViewer'

import {
  Cell,
  Link,
  LookerChartUtils,
  Looker,
  VisualizationDefinition,
  VisOption,
  VisOptions,
} from './types'

// Global values provided via the API
declare var looker: Looker
declare var LookerChart: LookerChartUtils

interface SteppedFunnelChart extends VisualizationDefinition {
  chart?: any
}

interface MarketplaceVizHelpers {
  toggleOption: (section: string, label: string, init: boolean, order?: number, parent?: string, parentObj?: any) => VisOption,
  stringOption: (section: string, label: string, init: string, order?: number, parent?: string, parentObj?: any) => VisOption,
}

const Vizzy: MarketplaceVizHelpers = {
  toggleOption(section: string, label: string, init: boolean, order?: number, parentKey?: string, parentObj?: any): VisOption {
    return {
      type: "boolean",
      label: label,
      default: init,
      section: section,
      order: parentKey ? parentObj.options[parentKey].order + 1 : order && order * 10
    }
  },
  stringOption(section: string, label: string, init: string, order?: number, parentKey?: string, parentObj?: any): VisOption {
    return {
      type: "string",
      label: label,
      default: init,
      section: section,
      order: parentKey ? parentObj.options[parentKey].order + 1 : order && order * 10
    }
  }
}

const vis: SteppedFunnelChart = {
  // initial options applied to viz
  options: {
    label_left_axis: Vizzy.toggleOption("Axes", "Label Left Axis", false, 1),
    label_right_axis: Vizzy.toggleOption("Axes", "Label Right Axis", false, 2)
  },
  // this happens exactly once
  create(element, config) {
    this.chart = ReactDOM.render(<JsonViewer className="vis" data={config}/>, element)
  },
  // this happens for every render n > 0
  updateAsync(data, element, config, queryResponse, details, doneRendering) {
    // save a copy of previous render's options
    let previousOptions: VisOptions = {}
    Object.assign(previousOptions, this.options)

    // add any dynamic options
    this.options.left_axis_label = config.label_left_axis && Vizzy.stringOption("Axes", "Left Axis Label", "", 0, "label_left_axis", vis)
    this.options.right_axis_label = config.label_right_axis && Vizzy.stringOption("Axes", "Right Axis Label", "", 0, "label_right_axis", vis)

    // register new options if options has changed since last render
    if (JSON.stringify(previousOptions) !== JSON.stringify(this.options)) {
      this.trigger && this.trigger('registerOptions', this.options)
    }

    // render chart
    this.chart = ReactDOM.render(<JsonViewer className="vis" data={config}/>, element)

    // tell Looker we're done rendering
    doneRendering();
  }
}


looker.plugins.visualizations.add(vis)
