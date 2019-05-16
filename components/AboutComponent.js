import React , {Component} from 'react';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import * as Animatable from 'react-native-animatable';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {Card} from 'react-native-elements';
import  {ListItem} from 'react-native-elements';

const mapStateToProps = state => {
    return{
        founders: state.founders
    }
}
const About_Info = {
    p1:'Recipe website is made by Samikshya Adhikari. Samikshya is a computer engineer who loves to make different'+
    'variety of foods i.e Nepali, American, Indian and many more. She came up with an idea to share her recipes to'+
    'the world by developing a recipe website where people from around the world can learn her recipe and cook healthy'+
    'and delicious food. ',
    p2 : {
        a :'About Us',
        a1 : 'Started: April, 2019',
        a2 : 'Variety of recipes: Nepalies, Indian, American & more'
    },

    p3 :"We envison a world where anyone, anywhere can cook healthy and delicious food by accessing world's best recipe."
}

function History(){
    return(
        <Card
        title='Our Story'
        titleStyle={{ backgroundColor: 'Olive', padding: 10}}
        >
        <Text style={{paddingBottom: 10}}>{About_Info.p1}</Text>
        <Text style={{paddingBottom: 10}}>{About_Info.p2.a}</Text>
        <Text >{About_Info.p2.a1}</Text>
        <Text style={{paddingBottom: 10}}>{About_Info.p2.a2}</Text>
        <Text style={{paddingBottom: 10}}>{About_Info.p3}</Text>
    </Card>
    );  
}
function DisplayFounders({founders}){
    const renderFounders = ({item, index})=> {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source:{uri:baseUrl+item.image}}}
                    rightTitle={item.designation}
                />
            );
        }
       
    if (founders!=null){ 
        return(
            <Card
                title='About Our Founder'
                titleStyle={{ backgroundColor: 'Olive', padding: 10}}>
                <FlatList
                data={founders}
                renderItem={renderFounders}
                keyExtractor={item=>item.id.toString()}
                />
            </Card>
        );
    }
    else {
        return(
            <View></View>
        );
    }  
}
class About extends Component {
   
    static navigationOptions={
        title:'About Us'
    };
    render(){
        if(this.props.founders.isLoading){
            return(
                <ScrollView>
                    <History/>
                    <Card title='About Our Founder'>
                        <Loading/>
                    </Card>
                </ScrollView>
            );
        }
        else if(this.props.founders.errMess){
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                        <History/>
                        <Card title='About Our Founder'>
                            <Text>{this.props.founders.errMess}</Text>
                        </Card>
                    </Animatable.View> 
               </ScrollView> 
            );
        }
        else{
             return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History/>
                    <DisplayFounders founders={this.props.founders.founders}/> 
                </Animatable.View> 
            </ScrollView>    
        );
        } 
    }
}
export default connect(mapStateToProps)(About);