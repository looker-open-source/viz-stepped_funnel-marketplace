import * as React from 'react' 
import { useState, useEffect, FunctionComponent } from 'react'

type HelloWorldProps = {
  message: string
}

export const HelloWorld: FunctionComponent<HelloWorldProps> = (props: HelloWorldProps) => {
  const initialState: HelloWorldProps = { message: "Hello World"}
  const clearState = () => { setState({...initialState}) }

  const [{message}, setState] = useState<any>(initialState)

  useEffect(() => {
    clearState()
    draw(props)
  }, [props])

  //Main draw logic goes here
  function draw(props: HelloWorldProps) {
    setState({ message: props.message === "" ?  initialState.message : props.message })
    
  }

  return(<>{message}</>)
};

