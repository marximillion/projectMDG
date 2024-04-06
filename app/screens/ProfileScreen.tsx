import { StackNavigationProp } from '@react-navigation/stack';
import {Component, ReactNode} from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import { StackParamList } from '../navigation/StackParamList';
import { RouteProp } from '@react-navigation/native';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Profile'>
  route: RouteProp<StackParamList, 'Profile'>
}

export interface ProfileProps {
  details: {
    firstName: string;
    lastName: string;
    age: number;
  }
}

/**
 * State
 */
interface State {}

export default class ProfileScreen extends Component<Props, State> {
  /**
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    console.log('ProfileScreen::Constructor::Firing');
    // console.log(this.props.user);

    this.state = {};
  } // End of contructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('ProfileScreen::OnMount::Firing');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('ProfileScreen::UnMount::Firing');
  } // End of componentWillMount()

  public render(): ReactNode {
    console.log('ProfileScreen::Render::Firing');

    return (
      <>
        <Text>Success to ProfileScreen</Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    margin: 10,
  },
});
