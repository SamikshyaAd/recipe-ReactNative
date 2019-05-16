import React , {Component} from 'react';
import  {View, Text, ScrollView, FlatList, StyleSheet,Button, Modal, Alert, PanResponder, Share} from 'react-native';
import  {Card, Icon, Rating, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavorite, postFeedback } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return{
        recipes: state.recipes,
        feedbacks : state.feedbacks,
        favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (recipeId) => dispatch(postFavorite(recipeId)),
    postFeedback : (recipeId, rating, comment, author) =>
     dispatch(postFeedback(recipeId, rating, comment, author))
});

function RenderRecipe (props){
    const recipe = props.recipe;  
    handleViewRef = ref => this.view = ref;
    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if(dx < -200){
            return true;
        }
        else {
            return false;
        }
    };
    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if(dx > 200){
            props.toggleModal();
        }
         return true;
    };
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder : (e, gestureState) => {
            return true;
        },
        onPanResponderGrant : () => {this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanRespnderEnd : (e, gestureState) => {
            if(recognizeDrag(gestureState)){
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you want to add '+recipe.name + 'to your Favorite?',
                    [
                        {
                            text : 'Cancel',
                            onPress : () => console.log('Cancel pressed'),
                            style : 'cancel'
                        },
                        {
                            text : 'OK',
                            onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()} 
                        }
                    ],
                    {cancelable: false}
                );
                return true;
            }
            if(recognizeComment(gestureState)){
                 <Modal
                    animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Feedback</Text>
                    </View>
                    <View >
                        <Rating
                            name='rating'
                            type='star'
                            showRating
                            ratingColor='#3498db'
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 }}
                        />
                    </View>
                    <View style={styles.formLabel}>
                        <Input
                            placeholder= 'Author'
                            leftIcon={
                                <Icon
                                    name='user'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({author: nativeEvent.text})}
                        />
                    </View>
                    <View style={styles.formLabel}>
                        <Input 
                            placeholder= 'Comment'
                            leftIcon={
                                <Icon
                                    name='comment'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChange={({ nativeEvent }) => this.setState({comment: nativeEvent.text})}
                        />
                    </View>
                    <View style={styles.formLabel}>
                    <Button
                        onPress={() => {this.handleFeedback(recipeId, this.props.feedbacks.feedbacks.length);
                            this.resetForm();}}
                        title="SUBMIT"
                        color="#512DA8"
                        />
                </View>
                <View style={styles.formLabel}>
                    <Button
                        onPress={() => {this.resetForm();}}
                        title="CANCEL"
                        color="#a9a9a9"
                        />
                </View>
           </Modal>

            }
        }
    }); 
    const shareRecipe = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }              
    if(recipe!=null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
            ref={this.handleViewRef}
            {...panResponder.panHandlers}>
                <Card
                    featuredTitle={recipe.name}
                    image={{uri:baseUrl+recipe.image}}>
                    <Text style={{margin:10}}>
                        {recipe.description}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon style={styles.iconAlignment}
                            raised
                            reverse
                            name={props.favorite?'heart':'heart-o'}
                            type="font-awesome"
                            color='#f50'
                            onPress={()=> props.favorite?console.log('Already favorite!'):props.onPress()}/>
                        <Icon  style={styles.iconAlignment}
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color=' #512DA8'
                            onPress={() => props.toggleModal()}/>
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            style={styles.cardItem}
                            onPress={() => shareRecipe(recipe.name, recipe.description, baseUrl + recipe.image)} />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else{
        return(
            <View></View>
        );  
    }
}
function RenderFeedbacks(props){
    const feedbacks = props.feedbacks;
    const renderfeedbackItem = ({item , index}) => {
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating}</Text>
                <Text style={{fontSize:12}}>{'--'+item.author+', '+item.date}</Text>
            </View>
        );
    }
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                data={feedbacks}
                renderItem={renderfeedbackItem}
                keyExtractor={item=>item.id.toString()}/>
            </Card>
        </Animatable.View>
    );

}
class Recipedetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            rating:1,
            author:'',
            comment:''
        };
    }
    markFavorite(recipeId){
        this.props.postFavorite(recipeId);
    }
    static navigationOptions = {
        title: 'Recipe Details'
    }
    handleFeedback(recipeId, feedbackId){
        console.log("Comment is: " + feedbackId, recipeId, this.state.rating, this.state.comment, this.state.author)
        this.props.postFeedback(recipeId, this.state.rating, this.state.comment, this.state.author);
    }
    resetForm() {
        this.setState({
            rating: 1,
            author: '',
            comments: ''
        });
    }
    toggleModal(){
        this.setState({showModal:!this.state.showModal})
    }
    ratingCompleted=(rating) => {
        console.log("Rating is: " + rating);
        this.setState({rating:rating})
        
    }
    render(){
        const recipeId = this.props.navigation.getParam('recipeId','');
        return(
        <ScrollView>
            <RenderRecipe recipe={this.props.recipes.recipes[+recipeId]}
                favorite={this.props.favorites.some(el=> el===recipeId)}
                onPress={()=> this.markFavorite(recipeId)}
                toggleModal={() => this.toggleModal()}/>
            <RenderFeedbacks feedbacks={this.props.feedbacks.feedbacks.filter((feedback)=> feedback.recipeId===recipeId)}/>
            <Modal
                    animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Feedback</Text>
                    </View>
                    <View >
                        <Rating
                            name='rating'
                            type='star'
                            showRating
                            ratingColor='#3498db'
                            onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 10 }}
                        />
                    </View>
                    <View style={styles.formLabel}>
                        <Input
                            placeholder= 'Author'
                            leftIcon={
                                <Icon
                                    name='user'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />   
                           }
                           onChange={({ nativeEvent }) => this.setState({author: nativeEvent.text})}
                        />
                    </View>
                    <View style={styles.formLabel}>
                        <Input 
                            placeholder= 'Comment'
                            leftIcon={
                                <Icon
                                    name='comment'
                                    type='font-awesome'
                                    size={24}
                                    color='black'
                                />
                            }
                            onChange={({ nativeEvent }) => this.setState({comment: nativeEvent.text})}
                        />
                    </View>
                    <View style={styles.formLabel}>
                    <Button
                        onPress={() => {this.handleFeedback(recipeId, this.props.feedbacks.feedbacks.length);
                            this.resetForm();this.toggleModal();}}
                        title="SUBMIT"
                        color="#512DA8"
                        />
                </View>
                <View style={styles.formLabel}>
                    <Button
                        onPress={() => {this.resetForm();this.toggleModal();}}
                        title="CANCEL"
                        color="#a9a9a9"
                        />
                </View>
           </Modal>
        </ScrollView>
       );
    }  
}
const styles = StyleSheet.create({
    iconAlignment : {
            alignItems:'center',
            justifyContent:'center',
            margin:20
    },
     modal: {
            justifyContent: 'center',
            margin: 20
        },
        modalTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            backgroundColor: '#512DA8',
            textAlign: 'center',
            color: 'white',
            marginBottom: 20
        },
        formLabel: {
            fontSize:18,
            padding:5
        }

});
export default connect(mapStateToProps, mapDispatchToProps)(Recipedetail);