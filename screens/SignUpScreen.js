import React, { Component } from 'react';
import { 
  TextInput,
  Text, 
  Alert,  
  Button, 
  StyleSheet, 
  View, 
  Image, 
  Dimensions,
} from 'react-native';

import API from '../API'; 

const {width: WIDTH} = Dimensions.get("window")
export default class SignUpScreen extends Component {
  constructor(props){
    super(props); 
    this.state = {
      email: '',
      password:'',
      success : ''
    }
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

  submit() {
    let collection ={}
    collection.email=this.state.email
    collection.password=this.state.password

    col = JSON.stringify({
      email:this.state.email,
      password: this.state.password
    })

    API.signup(collection)
    .then(res => {
      console.log(res.data)

      if(res.data !== " ") {
        success = "Register success"
        setState({success: success})
      }
    })
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Image
          style={{width: 80, height: 80, marginLeft: 130, marginTop: -60}}
          source={require('../assets/images/snap-home.png')}
        />

        <Text style={styles.title}>Sign Up</Text>

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

            <View style={styles.buttonContainer}>
              <Button style={styles.button}
                onPress={()=>this.submit()}
                title="Register"
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
    marginBottom : 30,
    backgroundColor:"red",
    color:'white', 
    justifyContent:'center',
    alignItems: 'center',
    height: 40

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
    marginLeft: 150,
    marginBottom: 5 
  }
});