import React , {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';


const Address_Info = {
    a1:' 5134 South Harper Avenue ',
    a2:'Chicago, IL, 60615',
    tel:'Tel: +852 1234 5678',
    fax:'Fax: +852 8765 4321',
    email:'Email:srecipe@food.net'
}
function RenderContact(props){
    return(
         <Card
            title='Contact Information'
            titleStyle={{ padding: 10}}>
            <Text style={{paddingBottom: 10}}>{Address_Info.a1}</Text>
            <Text style={{paddingBottom: 10}}>{Address_Info.a2}</Text>
            <Text style={{paddingBottom: 10}}>{Address_Info.tel}</Text>
            <Text style={{paddingBottom: 10}}>{Address_Info.fax}</Text>
            <Text style={{paddingBottom: 10}}>{Address_Info.email}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10}}>
                <Button
                    title="Send Email"
                    buttonStyle={{backgroundColor: "#512DA8"}}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={props.sendMail}
                />
                <Button
                    title="Skype"
                    buttonStyle={{backgroundColor: "#512DA8"}}
                    icon={<Icon name='skype' type='font-awesome' color='white' />}
                    onPress={props.sendMail}
                />
            </View>
       </Card>
    );  
}
class Contact extends Component {
    static navigationOptions={
        title:'Contact Us'
    };
     sendMail() {
            MailComposer.composeAsync({
            recipients: ['samikshyaadhikari234@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    render(){
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <RenderContact sendMail = {this.sendMail}/>
                </Animatable.View>
            </ScrollView>   
       );
    }
}
export default Contact;