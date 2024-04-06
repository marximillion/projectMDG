import { StackNavigationProp } from '@react-navigation/stack';
import {Component, ReactNode} from 'react';
import {Alert, Dimensions, ImageBackground, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { StackParamList } from '../navigation/StackParamList';
import { RouteProp } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Info'>
  route: RouteProp<StackParamList, 'Info'>
}

export interface InfoProps {
}

/**
 * State
 */
interface State {
  details: {
    firstName: string;
    lastName: string;
    age: number | null | undefined;
  }
  // submittedData: null
}

export default class InfoScreen extends Component<Props, State> {
  /**
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    console.log('InfoScreen::Constructor::Firing');

    this.state = {
      details: {
        firstName: '',
        lastName: '',
        age: null,
      },
      // submittedData: null
    };
  } // End of contructor()

  /**
   * on Mount
   */
  public componentDidMount(): void {
    console.log('InfoScreen::OnMount::Firing');
  } // End of componentDidMount()

  /**
   * on UnMount
   */
  public componentWillUnmount(): void {
    console.log('InfoScreen::UnMount::Firing');
  } // End of componentWillMount()

  /******************************************************************************/
  /****************************** ACTION METHODS ********************************/
  /******************************************************************************/

  /**
   * Action: Type
   * update the text displayed on the input box
   */
  private handleChange(value: string | number, identifier: string) {
    switch (identifier) {
      case 'firstName':
        this.setState({ details: { ...this.state.details, firstName: typeof value === 'string' ? value : '' }});
        break;
      case 'lastName':
        this.setState({ details: { ...this.state.details, lastName: typeof value === 'string' ? value : '' }});
        break;
      case 'age':
        this.setState({ details: { ...this.state.details, age: typeof value === 'number' ? value : null }})
    }
  }

  /**
   * Action: Press
   * submit the text that the user typed
   */
  private handleSubmit() {
    const { firstName, lastName, age } = this.state.details;
    // const submittedData: SubmittedData = { firstName, lastName, age };
    // this.setState({ submittedData });
    // if (!firstName || !lastName || !age) {
    //   Alert.alert('Missing Fields', 'Please fill in all three fields before submitting.');
    //   return;
    // }
  }

  /******************************************************************************/
  /**************************** NAVIGATION METHODS ******************************/
  /******************************************************************************/

  /******************************************************************************/
  /****************************** RENDER METHODS ********************************/
  /******************************************************************************/

  public render(): ReactNode {
    console.log('InfoScreen::Render::Firing');
    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;
    const { firstName, lastName, age } = this.state.details;
    return (
      <>
        <StatusBar barStyle={"dark-content"}  translucent backgroundColor={"transparent"}></StatusBar>
        <SafeAreaView style={styles.safeAreaContainer}>
          <KeyboardAvoidingView style={styles.mainContainer}>
            {/* three text inputs for name year and age, if i can figure it out can also incorporate use of Camera */}
            <Text style={styles.mainText}>
              First Name:
            </Text>
            <TextInput
              style={[styles.inputBox, {color: 'rgba(255, 255, 255, 0.5)'}]}
              onChangeText={(firstName) => this.handleChange(firstName, 'firstName')}
              value={firstName}
              placeholder='What is your first name?'
              placeholderTextColor={'black'}
            />
            <Text style={styles.mainText}>
              Last Name:
            </Text>
            <TextInput
              style={[styles.inputBox, {color: 'black'}]}
              onChangeText={(lastName) => this.handleChange(lastName, 'lastName')}
              value={lastName}
              placeholder='What is your last name?'
              placeholderTextColor={'white'}
            />
            <Text style={styles.mainText}>
              Age: 
            </Text>
            <TextInput
              style={[styles.inputBox, {color: 'white'}]}
              onChangeText={(age) => this.handleChange(age, 'age')}
              value={age?.toString()}
              placeholder='How old are you?'
              placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
              keyboardType='numeric'
            />
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                <Text style={styles.buttonText}>
                Submit
                </Text>
            </TouchableOpacity>
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
    backgroundColor: "#87ceeb",
  },
  inputBox: {
    height: 50,
    width: '90%' ,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(111, 122, 255, 0.5)',
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  mainText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    margin: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 105, 180, 0.05)', // Pinkish color with 60% transparency
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow effect
    width: 300,
    height: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
