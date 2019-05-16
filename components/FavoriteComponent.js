import React , {Component} from 'react';
import  {View, FlatList, Text, Alert} from 'react-native';
import  {Tile, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import Swipeout from 'react-native-swipeout';
import {deleteFavorite} from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return{
        recipes: state.recipes,
        favorites:state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});
class Favorites extends Component{
    static navigationOptions = {
        title: 'My Favorites'
    }
    
        render(){
            const {navigate} = this.props.navigation;
            const renderRecipeItem = ({item, index}) => {
                 const rightButton = [
                    {
                        text:'Delete',
                        type: 'delete',
                        onPress:()=> {
                            Alert.alert(
                                'Delete Favorite?',
                                'Are you sure to proceed?',
                                [
                                    {
                                        text : 'Cancel',
                                        onPress : () => console.log(item.name+ 'Not deleted'),
                                        style : 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => this.props.deleteFavorite(item.id)

                                    }
                                ],
                                {cancelable:false}
                            );
                        }
                    }
              
                ];
                return (
                    <Swipeout right={rightButton} autoClose={true}>
                        <Animatable.View animation="fadeInRightBig" duration={2000}>                
                            <ListItem
                                key={index}
                                title={item.name}
                                subtitle={item.description}
                                hideChevron={true}
                                onPress={() => navigate('Recipedetail', { recipeId: item.id })}
                                leftAvatar={{ source: {uri: baseUrl + item.image}}}
                                />
                        </Animatable.View>
                    </Swipeout>
                );
         }
          if (this.props.recipes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.recipes.errMess) {
            return(
                <View>            
                    <Text>{this.props.recipes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.recipes.recipes.filter(recipe => this.props.favorites.some(el => el === recipe.id))}
                    renderItem={renderRecipeItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);