import React from 'react'; 
import {View, Image, ScrollView, Dimensions,StyleSheet, Text, TextInput, Button} from 'react-native';


const { width: winWidth } = Dimensions.get('window');
const { height: winheight } = Dimensions.get('window');

export default class ViewImageScreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            duration:'', 
            email:''
        }
    }

    updateValue(text, field) {
        if(field == "duration"){
          this.setState({
            duration: text
          })
        } else if(field == "email"){
            this.setState({
                duration: text
            })
        }
    }

    sendSnap(){

    }

    render() {
        const {params} = this.props.navigation.state
        if(params !== null){

            const uri = params.image.uri; 
            //console.log(params.image.uri); 
            return (
                <ScrollView >
                    <View style={styles.alignCenter}>
                        <Text style={{margin: 10}}> Previous Snap</Text>
                        <Image source={{uri : uri }} style={{height: winheight -200, width: winWidth - 100}}/>

                        <TextInput
                            style={{margin:10}}
                            placeholder={"duration"}
                            onChangeText={(text) => this.updateValue(text, 'duration')}
                        />

                        <TextInput
                            style={{margin:10}}
                            placeholder={" send to Email "}
                            onChangeText={(text) => this.updateValue(text, 'email')}
                        />
                        
                        <Button style={styles.button}
                            title="Send"
                            // onPress={() => this.props.navigation.push('SignUpScreen')}
                        />

                    </View>



                </ScrollView>
            );
        } else  {
            return(
                <View style={styles.alignCenter}>
                     <Text> no Image to send </Text>
                </View>
            );
        }
    } 
}  
    const styles = StyleSheet.create({
        alignCenter: {
            
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });