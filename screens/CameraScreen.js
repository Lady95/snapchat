import React, { Component } from "react"; 
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, 
    AsyncStorage
} from "react-native";

import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
 

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class CameraScreen extends Component {
    constructor(props){
        super(props); 
    }
    camera = null
    state = {
        captures: [],
        capturing: null,
        hasCameraPermission : null, 
        type: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off
    };

    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
        
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
        this.props.navigation('ViewImageScreen', {image : photoData})

    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
       
    };


    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({ hasCameraPermission: status === 'granted' && audio.status === 'granted' });
    }

    render() {
        const {hasCameraPermission, flashMode, type, capturing, captures} = this.state
        if(hasCameraPermission === null ){
            return <View />
        }else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;

        } else {
            return (
                
                <View style = {{flex: 1}}>
                
                    <Camera style={{flex: 1,  justifyContent: 'space-between' }} type={type} flashMode={flashMode} ref={camera => this.camera = camera}>
                    
                        <Header searchBar rounded style={{
                            marginTop: 25, backgroundColor: 'transparent',
                            left: 0, top:0, right: 0, zIndex: 100, alignItems: 'center'
                            
                        }}>
                            <View style={{flexDirection: 'row', flex: 4}}>
                                <Ionicons name="logo-snapchat" size={32} color="white"  />

                                <Item style={{backgroundColor: 'transparent'}}>
                                <Icon name="ios-search" style={{color:'white', fontSize: 24, fontWeight:'bold'}}/>
                                <Input
                                    placeholder="Search"
                                    placeholderTextColor="white"
                                    color="white"
                                />
                                </Item>
                            </View>
                            

                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                                    <Ionicons
                                        onPress ={()=> {
                                            this.setState({
                                                flashMode: this.state.flashMode === Camera.Constants.FlashMode.on ?
                                                Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.on
                                            })
                                        }}
                                    
                                    
                                        name={flashMode === Camera.Constants.FlashMode.on ? "md-flash" : 'md-flash-off'}
                                        color="white"
                                        size={30}
                                    />
                                    <Icon
                                        onPress={() => {
                                            this.setState({
                                                type: this.state.type === Camera.Constants.Type.back ?
                                                    Camera.Constants.Type.front :
                                                    Camera.Constants.Type.back
                                            })
                                        }}
                                        name="reverse-camera" style={{ color: 'white', fontWeight: 'bold' }} />
                            </View>
                        </Header>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name="message-reply"
                                style={{ color: 'white', fontSize: 36 }}
                            ></MaterialCommunityIcons>

                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name="circle-outline"
                                    style={{ color: 'white', fontSize: 100 }}
                                    onPressIn= {()=> this.handleCaptureIn()}
                                    onPressOut = { ()=> this.handleCaptureOut()}
                                    onLongPress={ ()=> this.handleLongCapture()}
                                    onPress = {() => this.handleShortCapture()}

                                ></MaterialCommunityIcons>

                                <Icon name="ios-images" style={{ color: 'white', fontSize: 36 }} />
                            </View>
                            <MaterialCommunityIcons name="google-circles-communities"
                                style={{ color: 'white', fontSize: 36 }}
                            ></MaterialCommunityIcons>
                        </View>
                    
                    </Camera>
                    
                </View>
                
            );
        }
    }
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        alignItems:'center', 
        justifyContent: 'center'
    }
})