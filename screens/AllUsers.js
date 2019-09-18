import React,{PureComponent} from 'react';
import API from '../API';
import {Button} from 'react-native'; 

import {
    View, 
    Text,
    AsyncStorage, 
    FlatList,
    StyleSheet
}from "react-native";

export default class AllUsers extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            users: null 
        }

        this._getData();
    }

    _getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userToken');
            API.all(value)
            .then((res)=> { 
                this.setState({users: res.data.data })
                // console.log(res.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    render(){
        return (
            <View style={styles.container}>
                
                <FlatList data={this.state.users}
                renderItem={
                     ({item}) => 
                     <View>
                     <Text style={styles.item}>{item.email}</Text>
                     <Button
                        title="Send"
                     
                     />
                     </View>
                }
                 keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22,
     backgroundColor: 'white'
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      color: 'black',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      marginTop: 30,
    },
})