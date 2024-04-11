import {StackNavigationProp} from '@react-navigation/stack';
import {Component, ReactNode} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {StackParamList} from '../navigation/StackParamList';
import {RouteProp} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

/**
 * Props
 */
interface Props {
  navigation: StackNavigationProp<StackParamList, 'Info'>;
  route: RouteProp<StackParamList, 'Info'>;
}

export interface InfoProps {
  colorScheme: string | null | undefined;
}

/**
 * State
 */
interface State {
  details: {
    firstName: string;
    lastName: string;
    age: number | null | undefined;
  };
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
   * update the text displayed on text input box
   */
  private handleChangeText(value: string, identifier: string) {
    // trims the value for leading, trailing whitespaces, and any non-letter character except for ' 
    const trimmedValue = value.trim().replace(/[^a-zA-Z']/g, '') 
    // if length of string is greater than 20, it will get the characters for index 0 to 20
    // otherwise, it will return the entire string
    const finalValue = trimmedValue.length > 20 ? trimmedValue.substring(0, 20) : trimmedValue;
    switch (identifier) {
      case 'firstName':
        this.setState({
          details: {
            ...this.state.details, // creates a new object, copying the properties of 
            firstName: typeof value === 'string' ? finalValue.trim() : '',
          },
        });
        break;
        case 'lastName':
          this.setState({
            details: {
              ...this.state.details, // creates a new object, copying the properties of 
              lastName: typeof value === 'string' ? finalValue.trim() : '',
            },
          });
          break;
    }
  }

  /**
   * Action: Type
   * update the text displayed on numeric input box
   */
  private handleChangeNumber(value: string) {
    // Convert string value to number
    const intValue = parseInt(value);

    // Check if the input value is empty or a valid number with at most 3 digits and less than 117 (oldest person in the world)
    if (value === '' || (!isNaN(intValue) && /^[0-9]{1,3}$/.test(value) && intValue <= 117) ) {
      this.setState({
        details: { // nested object within the state
          ...this.state.details, // spreads the properties of current details state object 
          age: value === '' ? null : intValue, // assign null if empty, if not assign the value
        }
      });
    }
    else {
      Alert.alert("Stop lying you're not older than the oldest person in the world")
    }
    console.log(intValue)
  }

  /**
   * Action: Press
   * submit state values as props to the Profile screen
   * TODO: find out why it needs to be an arrow function?!?!?!?!
   */
  private handleSubmit = () => {
    const { firstName, lastName, age } = this.state.details;
    if (!firstName || !lastName || !age){
      Alert.alert("All fields are required");
    }
    else {
      this.props.navigation.navigate('Profile', {
        colorScheme: this.props.route.params.colorScheme,
        details: {
          firstName: firstName,
          lastName: lastName,
          age: age,
        }
      })
    }
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
    const {firstName, lastName, age} = this.state.details;
    const {colorScheme} = this.props.route.params;
    return (
      <>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor={'transparent'}></StatusBar>
        <SafeAreaView style={styles.safeAreaContainer}>
          <KeyboardAvoidingView style={styles.mainContainer}>
            {/* three text inputs for name year and age */}
            <Text style={styles.mainText}>First Name:</Text>
            <TextInput
              style={[styles.inputBox, {color: 'rgba(255, 255, 255, 0.5)'}]}
              onChangeText={firstName =>
                this.handleChangeText(firstName, 'firstName')
              }
              value={firstName}
              placeholder="What is your first name?"
              placeholderTextColor={'black'}
            />
            <Text style={styles.mainText}>Last Name:</Text>
            <TextInput
              style={[styles.inputBox, {color: 'black'}]}
              onChangeText={lastName => this.handleChangeText(lastName, 'lastName')}
              value={lastName}
              placeholder="What is your last name?"
              placeholderTextColor={'white'}
            />
            <Text style={styles.mainText}>Age:</Text>
            <TextInput
              style={[styles.inputBox, {color: 'white'}]}
              onChangeText={age => this.handleChangeNumber(age)}                                            
              value={age?.toString()}
              placeholder="How old are you?"
              placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
              keyboardType="numeric"
            />
            {/* submit button will pass the this.state.details and this.props.route.params from InfoScreen to ProfileProps in ProfileScreen  */}
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
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
    backgroundColor: '#87ceeb',
  },
  inputBox: {
    height: 50,
    width: '90%',
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
