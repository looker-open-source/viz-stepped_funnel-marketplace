import React, { useEffect } from 'react';
import styled from "styled-components";
var Inspector = require('react-json-inspector');

const VizWrapper = styled.div`
  font-family: "Open Sans", "Noto Sans JP", "Noto Sans", "Noto Sans CJK KR", Helvetica, Arial, sans-serif;
  color: #3a4245;
  height: 100%;
  margin-top: 10px;
  padding-left: 15px;
  z-index: -100;
  .json-inspector,
.json-inspector__selection {
    font: 14px/1.4 Consolas, monospace;
}
.json-inspector__leaf {
    padding-left: 10px;
}
.json-inspector__line {
    display: block;
    position: relative;
    cursor: default;
}
.json-inspector__line:after {
    content: '';
    position: absolute;
    top: 0;
    left: -200px;
    right: -50px;
    bottom: 0;
    z-index: -2;
    pointer-events: none;
}
.json-inspector__line:hover:after {
    background: rgba(0, 0, 0, 0.06);
}
.json-inspector__leaf_composite > .json-inspector__line {
    cursor: pointer;
}
.json-inspector__radio,
.json-inspector__flatpath {
    display: none;
}
.json-inspector__value {
    margin-left: 5px;
}
.json-inspector__search {
    min-width: 300px;
    margin: 0 10px 10px 0;
    padding: 2px;
}
.json-inspector__key {
    color: #505050;
}
.json-inspector__value_helper,
.json-inspector__value_null,
.json-inspector__not-found {
    color: #b0b0b0;
}
.json-inspector__value_string {
    color: #798953;
}
.json-inspector__value_boolean {
    color: #75b5aa;
}
.json-inspector__value_number {
    color: #d28445;
}
.json-inspector__hl {
    background: #ff0;
    box-shadow: 0 -1px 0 2px #ff0;
    border-radius: 2px;
}
.json-inspector__show-original {
    display: inline-block;
    padding: 0 6px;
    color: #666;
    cursor: pointer;
}
.json-inspector__show-original:hover {
    color: #111;
}
.json-inspector__show-original:before {
    content: '⥂';
}
.json-inspector__show-original:hover:after {
    content: ' expand'
}
`;

const JsonViewer = (props: any) => {
	return <VizWrapper>
    <Inspector data={ props.data } />
  </VizWrapper>
}

export default JsonViewer
