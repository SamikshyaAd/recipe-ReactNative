import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, ScrollView, StyleSheet, Alert, Picker} from 'react-native';
import * as Animatable from 'react-native-animatable';
import  {Icon, Input, Button, CheckBox} from 'react-native-elements';
import {Notifications} from 'expo';
import { postGeneralFeedback } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return{
       
    }
}
const mapDispatchToProps = dispatch => ({
    postGeneralFeedback :(firstname, lastname, telnum, email, agree, contactType, message) =>
   {dispatch(postGeneralFeedback(firstname, lastname, telnum, email, agree, contactType, message))}
});


class Feedback extends Component {
    constructor(props){
        super(props);
        this.state = {
        firstname:'',
        lastname:'',
        telnum:'',
        email:'',
        agree:false,
        contactType:'email',
        message:''

        }
    }
    static navigationOptions={
        title:'Feedback Form'
    };
    resetForm(){
       this.setState({
        firstname:'',
        lastname:'',
        telnum:'',
        email:'',
        agree:false,
        contactType:'email',
        message:''
        }); 
    }
    handleSubmit(){
        var message= this.state.message
        console.log(this.state.firstname, this.state.lastname,this.state.telnum, this.state.email,
         this.state.agree, this.state.contactType, this.state.message);
         Alert.alert(
            'Submit Feedback?',
           message,
            [
                                    {
                                        text : 'Cancel',
                                        onPress : () => this.resetForm(),
                                        style : 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            this.presentLocalNotification(this.state.message);
                                            this.props.postGeneralFeedback (this.state.firstname, this.state.lastname,
                                            this.state.telnum, this.state.email, this.state.agree, this.state.contactType, 
                                            this.state.message)
                                            this.resetForm();
                                        }
                                    }
                                ],
                                {cancelable:false}
        );
    }
     async presentLocalNotification(message) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'User Feedback',
            body: 'Message '+ message + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }
    render(){
        return(
            <ScrollView>
                <Animatable.View animation="zoomInUp" duration={2000}>
                <View style={styles.formRow}>
                        <Input
                            placeholder= 'firstname'
                            value={this.state.firstname}
                            style={styles.formItem}
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({firstname: nativeEvent.text})}
                        />
                  </View>
                  <View style={styles.formRow}>
                        <Input
                            placeholder= 'lastname'
                            value={this.state.lastname}
                            style={styles.formItem}
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({lastname: nativeEvent.text})}
                        />
                  </View>
                  <View style={styles.formRow}>
                        <Input
                            placeholder= 'telnum'
                            value={this.state.telnum}
                            keyboardType="numeric"
                            style={styles.formItem}
                            leftIcon={
                                <Icon
                                    name='phone'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({telnum: nativeEvent.text})}
                        />
                  </View>
                  <View style={styles.formRow}>
                        <Input
                            placeholder= 'email'
                            value={this.state.email}
                            keyboardType="email-address"
                            style={styles.formItem}
                            leftIcon={
                                <Icon
                                    name='envelope'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({email: nativeEvent.text})}
                        />
                  </View>
                  <View style={styles.formRow}>
                        <Input
                            placeholder= 'message'
                            value={this.state.message}
                            style={styles.formItem}
                            leftIcon={
                                <Icon
                                    name='comment'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({message: nativeEvent.text})}
                        />
                  </View>
                  <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Contact Type</Text>
                         <Picker
                            style={styles.formItem}
                            selectedValue={this.state.contactType}
                            onValueChange={(itemValue, itemIndex)=> this.setState({contactType:itemValue})}
                                >
                            <Picker.Item label='email' value='email'/>
                            <Picker.Item label='phone' value='phone'/>  
                        </Picker>
                  </View>
                  <View style={styles.formRow}>
                        <CheckBox title="May we contact you?"
                            center
                            checked={this.state.agree}
                            onPress={() => this.setState({agree: !this.state.agree})}
                            containerStyle={styles.formCheckbox}
                            />
                  </View>
                   <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleSubmit()}
                            title="Submit"
                            icon={
                                <Icon
                                    name='plus'
                                    type='font-awesome'            
                                    size={24}
                                    color= 'white'
                                />
                            }
                            buttonStyle={{
                                backgroundColor: "#512DA8"
                            }}
                        />
                        <Button
                            onPress={() => this.resetForm()}
                            title="CANCEL"
                            color="#a9a9a9"
                             icon={
                                <Icon
                                    name='close'
                                    type='font-awesome'            
                                    size={24}
                                    color= 'white'
                                />
                            }
                            buttonStyle={{
                                backgroundColor: "#a9a9a9"
                            }}
                            />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}
const styles=StyleSheet.create ({
            
            formRow: {
            alignItems:'center',
            justifyContent:'center',
            flex:1,
            flexDirection:'row',
            margin:20
        },
        formLabel: {
            fontSize:18,
            flex:2,
            padding:5
        },
        formItem: {
            flex:1
        },
        formCheckbox: {
            margin: 20,
            backgroundColor: null
        },
 });
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);