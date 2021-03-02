import { select, values } from "d3"

// API Globals
export interface Looker {
  plugins: {
    visualizations: {
      add: (visualization: VisualizationDefinition) => void
    }
  }
}

export interface Chunk {
  label: string
  name?: string
  percent?: string
  value: number
  rendered: string | Cell | undefined
  links: Link[]
  percent_number?: number
  percent_rendered?: string
  percent_container?: number
}

export interface LookerChartUtils {
  Utils: {
    openDrillMenu: (options: { links: Link[], event: object }) => void
    openUrl: (url: string, event: object) => void
    textForCell: (cell: Cell) => string
    filterableValueForCell: (cell: Cell) => string
    htmlForCell: (cell: Cell, context?: string, fieldDefinitionForCell?: any, customHtml?: string) => string
  }
}

// Looker visualization types
export interface VisualizationDefinition {
  id?: string
  label?: string
  options: VisOptions
  addError?: (error: VisualizationError) => void
  clearErrors?: (errorName?: string) => void
  create: (element: HTMLElement, settings: VisConfig) => void
  trigger?: (event: string, config: object[] | VisOptions) => void
  update?: (data: VisData, element: HTMLElement, config: VisConfig, queryResponse: VisQueryResponse, details?: VisUpdateDetails) => void
  updateAsync?: (data: VisData, element: HTMLElement, config: VisConfig, queryResponse: VisQueryResponse, details: VisUpdateDetails | undefined, updateComplete: () => void) => void
  destroy?: () => void,
  toggleOption?: (section: string, label: string, init: boolean, parent?: string) => VisOption,
  stringOption?: (section: string, label: string, init: string, parent?: string) => VisOption,
}

export interface VisOptions { [optionName: string]: VisOption }

export interface VisOptionValue { [label: string]: string }

export interface VisQueryResponse {
  [key: string]: any
  data: VisData
  fields: {
    [key: string]: any[]
  }
  pivots: Pivot[]
}

export interface Pivot {
  key: string
  is_total: boolean
  data: { [key: string]: string }
  metadata: { [key: string]: { [key: string]: string } }
}

export interface Link {
  label: string
  type: string
  type_label: string
  url: string
}

export interface Cell {
  [key: string]: any
  value: any
  rendered?: string
  html?: string
  links?: Link[]
}

export interface FilterData {
  add: string
  field: string
  rendered: string
}

export interface PivotCell {
  [pivotKey: string]: Cell
}

export interface Row {
  [fieldName: string]: PivotCell | Cell
}

export type VisData = Row[]

export interface VisConfig {
  [key: string]: VisConfigValue
}

export interface SelectOption {
  [key: string]: string
}

export type VisConfigValue = any

export interface VisUpdateDetails {
  changed: {
    config?: string[]
    data?: boolean
    queryResponse?: boolean
    size?: boolean
  }
}

export interface VisOption {
  type: string,
  values?: VisOptionValue[],
  display?: string,
  default?: any,
  label: string,
  section?: string,
  placeholder?: string,
  display_size?: 'half' | 'third' | 'normal'
  order?: number
  min?: number
  max?: number
  step?: number
  required?: boolean
  supports?: string[]
}

export interface VisualizationError {
  group?: string
  message?: string
  title?: string
  retryable?: boolean
  warning?: boolean
}


export interface SteppedFunnelChart extends VisualizationDefinition {
  chart?: any
}

export interface MarketplaceVizHelpers {
  makeToggle: (section: string, label: string, init: boolean, order: number) => VisOption,
  makeString: (section: string, label: string, init: string, order: number) => VisOption,
  makeColor: (section: string, label: string, order: number) => VisOption,
  dependToggle: (section: string, label: string, init: boolean, parentKey: string, parentObj: any) => VisOption,
  dependSingleColor: (section: string, label: string, parentKey: string, parentObj: any) => VisOption,
  dependString: (section: string, label: string, init: string, parentKey: string, parentObj: any) => VisOption,
  makeNumber: (section: string, label: string, init: number, order: number) => VisOption
  makeList: (section: string, label: string, init: string, choices: SelectOption[], order: number) => VisOption,
  makeSmallList: (section: string, label: string, init: string, choices: SelectOption[], order: number) => VisOption,
}

export const Vizzy: MarketplaceVizHelpers = {
  makeToggle(section: string, label: string, init: boolean, order: number): VisOption {
    return {
      type: "boolean",
      label: label,
      default: init,
      section: section,
      order: order * 10
    }
  },
  dependToggle(section: string, label: string, init: boolean, parentKey: string, parentObj: any): VisOption {
    return {
      type: "boolean",
      label: label,
      default: init,
      section: section,
      order: parentObj.options[parentKey].order + 1
    }
  },
  makeString(section: string, label: string, init: string, order: number): VisOption {
    return {
      type: "string",
      label: label,
      default: init,
      section: section,
      order: order * 10
    }
  },
  makeNumber(section: string, label: string, init: number, order: number): VisOption {
    return {
      type: "number",
      label: label,
      default: init,
      section: section,
      order: order * 10
    }
  },
  dependString(section: string, label: string, init: string, parentKey: string, parentObj: any): VisOption {
    return {
      type: "string",
      label: label,
      default: init,
      section: section,
      order: parentObj.options[parentKey].order + 1
    }
  },
  makeColor(section: string, label: string, order: number): VisOption {
    return {
      type: "array",
      label: label,
      section: section,
      display: "colors",
      order: order * 10
    }
  },
  dependSingleColor(section: string, label: string, parentKey: string, parentObj: any): VisOption {
    return {
      type: "array",
      label: label,
      section: section,
      display: "color",
      order: parentObj.options[parentKey].order + 1,
      display_size: "half",
      default: ["#282828"],
    }
  },
  makeList(section: string, label: string, init: string, choices: SelectOption[], order: number,): VisOption {
    return {
      type: "string",
      label: label,
      default: init,
      display: "select",
      section: section,
      order: order * 10,
      values: choices
    }
  },
  makeSmallList(section: string, label: string, init: string, choices: SelectOption[], order: number,): VisOption {
    return {
      type: "string",
      label: label,
      default: init,
      display: "select",
      section: section,
      order: order * 10,
      values: choices,
      display_size: "third"
    }
  }
}
