/**
 * imports
 */
import React, {Component, ReactNode} from 'react';
import {NavigableAppContainer} from './app/navigation/NavigableAppContainer.tsx';
/**
 * Props
 */
interface Props {}

/**
 * State
 */
interface State {}

/**
 * App Screen
 */
export default class App extends Component<Props, State> {
  /**
   * Constructor
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    console.log('Constructor::Firing');

    this.state = {};
  } // End of contructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('App::DidMount');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('App::Unmount');
  } // End of componentWillUnmount

  /**
   * Render Main
   *
   * @returns ReactNode
   */
  public render(): ReactNode {
    console.log('App::Render::Firing');

    return (
      <>
        <NavigableAppContainer />
      </>
    );
  } // End of render()
} // End of class()
// End of file
