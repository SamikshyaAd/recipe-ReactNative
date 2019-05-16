import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        promotions : state.promotions
    }
}
function RenderItem (props)  {
    promotions =  props.promotions;

    const renderHomeItem = ({item, index}) => {
            return(                
                   <Card
                        featuredTitle={item.name}
                        featuredSubtitle={item.designation}
                        image={{uri:baseUrl+item.image}}>
                        <Text style={{margin:10}}>
                            {item.description}
                        </Text>
                    </Card>
            );
    }
    if(props.isLoading){
        return(
            <Loading/>
        );
    }
    else if(props.errMess){
        return(
             <View>
                <Text>{props.errMess}</Text>
             </View>
        );
    }
    else {
        if (promotions!=null){
            return(
                  <FlatList
                    data={promotions}
                    renderItem={renderHomeItem}
                    keyExtractor={item=>item.id.toString()}
                />
            );     
        }
        else {
            return(
                <View></View>
            );
        }
    }
}

class Home extends Component{
    constructor (props){
        super(props);
    }
    static navigationOptions = {
        title : 'Home'
    };
    render(){
        return(
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <RenderItem promotions = {this.props.promotions.promotions}
                        isLoading = {this.props.promotions.isLoading}
                        errMess = {this.props.promotions.errMess}
                        />
            </View>
        );
    }
}
export default connect (mapStateToProps) (Home);