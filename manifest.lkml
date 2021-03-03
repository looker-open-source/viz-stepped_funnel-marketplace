project_name: "viz-stepped_funnel-marketplace"

constant: VIS_LABEL {
  value: "Stepped Funnel"
  export: override_optional
}

constant: VIS_ID {
  value: "stepped_funnel-marketplace"
  export:  override_optional
}

visualization: {
  id: "@{VIS_ID}"
  file: "dist/bundle.js"
  label: "@{VIS_LABEL}"
}
