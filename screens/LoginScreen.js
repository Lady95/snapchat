import React, { Component } from 'react';
import { 
  TextInput,
  Text, 
  AsyncStorage,
  Alert, 
  Button, 
  StyleSheet, 
  View, 
  Image, 
  Dimensions,
  TouchableOpacity
} from 'react-native';
import API from '../API';

const {width: WIDTH} = Dimensions.get("window")
export default class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: navigation.state.params ? navigation.state.params.header : undefined
  });
  
  constructor(props){
    super(props); 
    this.state = {
      email: '',
      password:'',
      token: '',
      err: ''
    }
    this.props.navigation.setParams({ 
      header: null 
    });
  }

  updateValue(text, field) {
    if(field == "email"){
      this.setState({
        email: text
      })
    } else if (field == "password"){
      this.setState({
        password: text
      })
    }
  }

  message() {
    Alert.alert('Your Email or/and password incorrect'); 
  }

  submit() {
    let collection ={}
    collection.email=this.state.email
    collection.password=this.state.password

    console.log(collection); 

    API.login(this.state.email, this.state.password)
    .then(res => {
      this.setState({token : res.data.data.token})

      if(this.state.token !== " ") {
        this._signInAsync(); 
      } else {
        this.message(); 
      }
    })

  }


  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', this.state.token);
    this.props.navigation.navigate('App');
  };

  render() {
    
    return (
      <View style={styles.container}>
        <Image
          style={{width: 80, height: 80, marginLeft: 130, marginTop: -60}}
          source={require('../assets/images/snap-home.png')}
        />

        <Text style={styles.title}>Snapchat</Text>

        <View style={styles.buttons}>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            onChange={this.handleChange} 
            onChangeText={(text) => this.updateValue(text, 'email')}
          />

          <TextInput
            style={styles.input}
            placeholder={"Password"}
            onChangeText={(text) => this.updateValue(text, 'password')}
            secureTextEntry={true}
          />
              <TouchableOpacity style = {styles.button} onPress={()=>this.submit()}>
                <Text style={{ fontWeight:"bold",color:'white'}}>
                  Connect
                </Text>
              </TouchableOpacity>

            <View style={styles.buttonContainer}>
            
              <Button style={styles.button}
                title="Sign up"
                onPress={() => this.props.navigation.push('SignUpScreen')}
              />
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   backgroundColor: "#fdfe01"
  },
  buttonContainer: {
    margin: 20,
    
  },
  button: {
    margin : 20,
    backgroundColor:"red",
    justifyContent:'center',
    alignItems: 'center',
    height: 40,
    width : 200,

  },
  buttons :{
    marginTop: 25

  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    width: WIDTH - 55,
    height: 30,
    borderRadius: 45, 
    fontSize : 16,
    justifyContent: "center", 
    paddingLeft: 30,
    color : "black",
    backgroundColor :"white", 
    marginHorizontal:25,
    marginBottom: 23
  },
  title : {
    fontSize:20 , 
    fontWeight:"bold", 
    color: "black",  
    justifyContent: "center",
    marginLeft: 125,
    marginBottom: 5 
  }
});
