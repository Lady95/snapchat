import React from 'react'; 
import {StyleSheet, Text, View, Button,  AsyncStorage} from 'react-native';
import Swiper from 'react-native-swiper';
import AllUsers from './AllUsers';
import CameraScreen from './CameraScreen';
import ViewImageScreen from './ViewImageScreen';

const styles = StyleSheet.create({
    slideDefault: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center', 
      alignItems:'center', 
      justifyContent:'center',
      backgroundColor : "#9DD6E8" 
    },

    text:{
        color: 'white', 
        fontSize:30, 
        fontWeight: 'bold'
    }
  });

export default class HomeScreen extends React.Component{
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.state = {
            token : '',
        }

        this._getData();
    }
    _getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken');
            this.setState({token: value})
        } catch (error) {
            console.log(error)
        }
    }; 
    
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        
        return (
        
           <Swiper
              showsPagination={false}
              loop={false}
              index={1}
              scrollEnabled={this.state.outerScrollEnabled}>

                <AllUsers tokenUser = {this.state.token} />

                <View style={{flex: 1}}>
                    <CameraScreen navigation = {this.props.navigation.navigate}/>
                </View>

                <View style={styles.slideDefault}>
                  <Text> Memories </Text>
                </View>   
                <View style={styles.slideDefault}>
                    <Text style={styles.text}>Stories</Text>
                    <Button style={styles.button}
                        onPress={this._onPressButton}
                        title="Deconnect"
                        onPress={this._signOutAsync}
                    />
                </View>
           </Swiper> 
        
        );
    }
}
