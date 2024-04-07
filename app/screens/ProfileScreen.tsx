import { StackNavigationProp } from '@react-navigation/stack';
import {Component, ReactNode} from 'react';
import {Button, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
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
  colorScheme: string | null | undefined;
  details: {
    firstName: string;
    lastName: string;
    age: number | null | undefined;
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
    const { details } = this.props.route.params;
    console.log(details.age);
    return (
      <>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor={'transparent'}></StatusBar>
        <SafeAreaView style={styles.safeAreaContainer}>
          <KeyboardAvoidingView style={styles.mainContainer}>
            <Text style={styles.mainText}>
              Nice to meet you {details.firstName} {details.lastName}{`\n`}
              You are {details.age} years old!
              {/* TODO: uncomment line 71 when InfoScreen.tsx line 82 is handles*/}
              {/* {details.age > 24 ? 'You are older than 24' : 'You are 24 or younger'}  */}
            </Text>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
  },
  mainContainer: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: 20,
    backgroundColor: '#87ceeb',
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    margin: 10,
  },
});
