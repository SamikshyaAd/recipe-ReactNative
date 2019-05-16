import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import  {View, FlatList, Text} from 'react-native';
import  {Tile} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        recipes : state.recipes
    }
}

class Recipe extends Component{
   static navigationOptions = {
        title : 'Recipe'
    };
    render(){
        const renderRecipeItem = ({item, index}) => {
            return(
                <Animatable.View animation="fadeInRightBig" duration={2000}>                
                    <Tile 
                        key={index}
                        title={item.name}
                        caption={item.description}
                        onPress={() => navigate('Recipedetail',{recipeId:item.id})}
                        imageSrc={{uri:baseUrl+item.image}}/>
               </Animatable.View>
            );
        }
        const {navigate} = this.props.navigation;
        if(this.props.recipes.isLoading){
                    return(
                        <Loading/>
                    );
                }
        else if(this.props.recipes.errMess){
                    return(
                        <View>
                            <Text>{this.props.recipes.errMess}</Text>
                        </View>  
                    );
       }
       else{
             return(
                <FlatList
                    data={this.props.recipes.recipes}
                    renderItem={renderRecipeItem}
                    keyExtractor={item=>item.id.toString()}
                />
            );
       }
    }
}     
export default connect (mapStateToProps)(Recipe);