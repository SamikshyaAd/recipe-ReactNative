import React , {Component} from 'react';
import Home from './HomeComponent';
import Recipe from './RecipeComponent';
import Recipedetail from './RecipedetailComponent';
import Contact from './ContactComponent';
import Favorites from './FavoriteComponent';
import About from './AboutComponent';
import Login from './LoginComponent';
import AddRecipe from './AddRecipeComponent';
import Feedback from './FeedbackComponent';
import {View, Text, Platform, Image, StyleSheet, ScrollView, NetInfo, ToastAndroid} from 'react-native';
import {createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchPromos, fetchRecipes, fetchFeedbacks, fetchFounders} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
    }
}
const mapDispatchToProps = dispatch => ({
  fetchPromos: () => dispatch(fetchPromos()),
  fetchRecipes: () => dispatch(fetchRecipes()),
  fetchFeedbacks: () => dispatch(fetchFeedbacks()),
  fetchFounders: () => dispatch(fetchFounders())
});
const RecipeNavigator = createStackNavigator({
    Recipe:{screen:Recipe,
        navigationOptions:({navigation})=> ({
            headerLeft:<Icon name='menu' size={24} color='white'
            onPress={()=> navigation.toggleDrawer()}/>
        })
    },
    Recipedetail:{screen:Recipedetail}
},{
    initialRouteName:'Recipe',
    navigationOptions:{
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home:{screen:Home}
},{
    navigationOptions: ({navigation})=>({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name='menu' size={24} color='white'
            onPress={()=> navigation.toggleDrawer()}/>
    })
});
const AboutNavigator = createStackNavigator({
    About:{screen:About}
},{
    navigationOptions: ({navigation})=> ({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name='menu' size={24} color='white'
            onPress={()=> navigation.toggleDrawer()}/>
    })
});
const ContactNavigator = createStackNavigator({
    Contact:{screen:Contact}
},{
    navigationOptions: ({navigation})=> ({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name='menu' size={24} color='white'
            onPress={()=> navigation.toggleDrawer()}/>
    })
});
const FavoritesNavigator = createStackNavigator({
    Favorites:{screen:Favorites}
},{
    navigationOptions: ({navigation})=> ({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name='menu' size={24} color='white'
            onPress={()=> navigation.toggleDrawer()}/>
    })
});
const LoginNavigator = createStackNavigator({
      Login: { screen: Login }
    }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      title: 'Login',
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} 
        onPress={ () => navigation.toggleDrawer() } />    
    })
  });
  const AddRecipeNavigator = createStackNavigator({
    AddRecipe:{screen:AddRecipe}
},{
    navigationOptions: ({navigation})=> ({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name='menu' size={24} color='white'
            onPress={()=> navigation.toggleDrawer()}/>
    })
});
const FeedbackNavigator = createStackNavigator({
    Feedback:{screen:Feedback}
},{
    navigationOptions: ({navigation})=>({
        headerStyle:{
            backgroundColor:'#512DA8'
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:<Icon name='menu' size={24} color='white'
            onPress={()=> navigation.toggleDrawer()}/>
    })
});
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top:'always', horizontal:'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')}
                    style={styles.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>Recipe</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
     Login: { 
      screen: LoginNavigator,
      navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon
          name='sign-in'
          type='font-awesome'            
          size={24}
          iconStyle={{ color: tintColor }}
        />
      ),
    }
  },
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            title:'Home',
            darwerLable:'Home',
            drawerIcon:({tintColor}) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About:{
        screen:AboutNavigator,
        navigationOptions:{
            title:'About Us',
            darwerLable:'About Us',
            drawerIcon:({tintColor}) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
     Recipe:{
        screen:RecipeNavigator,
        navigationOptions:{
            title:'Recipe',
            darwerLable:'Recipe',
            drawerIcon:({tintColor}) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
     Contact:{
        screen:ContactNavigator,
        navigationOptions:{
            title:'Contact Us',
            darwerLable:'Contact Us',
            drawerIcon:({tintColor}) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Favorites:{
        screen:FavoritesNavigator,
        navigationOptions:{
            title:'My Favorites',
            darwerLable:'My Favorites',
            drawerIcon:({tintColor}) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    AddRecipe:{
        screen:AddRecipeNavigator,
        navigationOptions:{
            title:'Add Recipe',
            darwerLable:'Add Recipe',
            drawerIcon:({tintColor}) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Feedback:{
        screen:FeedbackNavigator,
        navigationOptions:{
            title:'Feedback',
            darwerLable:'Feedback',
            drawerIcon:({tintColor}) => (
                <Icon
                    name='comment'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    }
},   
{
    initialRouteName: 'Home',
    drawerBackgroundColor:'#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});
class Main extends Component{
    componentDidMount() {
    this.props.fetchPromos();
    this.props.fetchRecipes();
    this.props.fetchFeedbacks();
    this.props.fetchFounders();

    NetInfo.getConnectionInfo()
        .then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
   }
    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
        case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
        case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
        case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
        case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
        default:
            break;
        }
    }
    render(){
        return(
            <View style={{flex:1, paddingTop:Platform.OS==='ios'?0:Expo.Constants.statusBarHeight}}>
                <MainNavigator />
            </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);