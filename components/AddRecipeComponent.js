import React , {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Alert, Picker, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import  {Icon, Input, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postRecipe } from '../redux/ActionCreators';
import {Camera, Permissions, ImagePicker, Asset, ImageManipulator, Notifications} from 'expo';



const mapStateToProps = state => {
    return{
        
    }
}
const mapDispatchToProps = dispatch => ({
    postRecipe :(name, image, category, ingredients, direction, description) =>
   {dispatch(postRecipe(name, image, category, ingredients, direction, description))}
});

class AddRecipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            image:'',
            category:'main',
            ingredients:'',
            direction:'',
            description:'',
            imageUrl: baseUrl + 'images/logo.png',
        }
    }
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }
    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
        if ( cameraRollPermission.status === 'granted'){
            let selectedImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.ALL,
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!selectedImage.cancelled) {
                    console.log(selectedImage);
                    this.processImage(selectedImage.uri);
                }
        }  
    }
    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });

    }
    static navigationOptions={
        title:'Add Recipe'
    }
    resetForm(){
       this.setState({
            name:'',
            image:'',
            category:'main',
            ingredients:'',
            direction:'',
            description:'',
            imageUrl: baseUrl + 'images/logo.png',
        }); 
    }
    handleSubmit(){
        var recipeName= this.state.name
        console.log(this.state.name,this.state.imageUrl, this.state.category,this.state.ingredients,
                    this.state.direction, this.state.description);
         Alert.alert(
            'You added a new recipe?',
           recipeName,
            [
                                    {
                                        text : 'Cancel',
                                        onPress : () => this.resetForm(),
                                        style : 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            this.presentLocalNotification(this.state.name);
                                            this.props.postRecipe( this.state.name,this.state.imageUrl, this.state.category,this.state.ingredients,
                                                                   this.state.direction, this.state.description);
                                            this.resetForm();
                                        }

                                    }
                                ],
                                {cancelable:false}
        );
    }
     async presentLocalNotification(recipeName) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Added Recipe',
            body: 'Recipe name '+ recipeName + ' requested',
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
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        style={styles.formButton}
                        />
                    <Button
                        title="Gallery"
                        onPress={this.getImageFromGallery}
                        style={styles.formButton}
                        />
                </View>
                    <View style={styles.formRow}>
                        <Input
                            placeholder= 'Name'
                            value={this.state.name}
                            leftIcon={
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={( { nativeEvent } ) => this.setState({name: nativeEvent.text})}
                        />
                    </View>
                     <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Category</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.category}
                            onValueChange={(itemValue, itemIndex)=> this.setState({category:itemValue})}
                                >
                            <Picker.Item label='main' value='main'/>
                            <Picker.Item label='appetizer' value='appetizer'/>
                            
                        </Picker>
                  </View>
                    <View style={styles.formRow}>
                        <Input
                            placeholder= 'Ingredients'
                            value={this.state.ingredients}
                            leftIcon={
                                <Icon
                                    name='cutlery'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({ingredients: nativeEvent.text})}
                        />
                    </View>
                     <View style={styles.formRow}>
                        <Input
                            placeholder= 'Direction'
                            value={this.state.direction}
                            leftIcon={
                                <Icon
                                    name='list'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({direction: nativeEvent.text})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Input
                            placeholder= 'Description'
                            value={this.state.description}
                            leftIcon={
                                <Icon
                                    name='list'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({description: nativeEvent.text})}
                        />
                     </View>
                     <View style={styles.formButton}>
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
                    </View>
                    <View style={styles.formLabel}>
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
            imageContainer: {
                flex: 1,
                flexDirection: 'row',
                margin: 20
            },
            image: {
                margin: 10,
                width: 80,
                height: 60
            },
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
       formButton: {
        margin: 20
    }

 });

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);