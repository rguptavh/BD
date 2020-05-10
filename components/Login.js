import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Image } from 'react-native';

const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class AppContainer extends React.Component {
  state = {
    username: '',
    password: '',
    project:  '',
  }

render() {
  const onPress = () => {
    if (this.state.username != "" && this.state.password != "" && this.state.project != ""){
    global.uname = this.state.username
    global.project = this.state.project
    this.props.navigation.replace('Barcode')
    }
    else{
      alert("Please Fill All Fields")
    }
  }
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
  <View style = {styles.container}>
    <View style = {{flex:1, alignItems:'center', justifyContent:'center',}}>
      <View style = {{width: entireScreenHeight*1/3*0.8*0.85*670/372, height:'80%', marginTop:'15%'}}>
        <Image style = {{width:'100%', height:'100%'}} source={require('../assets/bd.png')} resizeMode='contain'></Image>
      </View>
    </View>
    <View style={{ flex: 1.5, width: '90%', alignItems: 'flex-end', justifyContent:'center' }}>
      <View style={{ width: '100%', height: '80%', alignItems: 'flex-end', justifyContent:'center' }}>
        <View style={{
          width: '100%',
          flex: 1.5,
          borderColor: '#3C5984',
          borderWidth: 2,
          borderRadius: 20,
        }}>
          <TextInput
            style={{ fontSize: 18 * rem, width: '95%', height: '100%', marginLeft: '5%'}}
            autoCapitalize='none'
            autoCompleteType='off'
            placeholder="Username"
            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
            onChangeText={(value) => this.setState({ username: value })}
            value={this.state.username}

          /></View>
        <View style={{ width: '100%', flex: 0.4 }}></View>
        <View style={{
          width: '100%',
          flex: 1.5,
          borderColor: '#3C5984',
          borderWidth: 2,
          borderRadius: 20
        }}>
          <TextInput
            style={{ fontSize: 18 * rem, width: '95%', height: '100%', marginLeft: '5%'}}
            autoCapitalize='none'
            autoCompleteType='off'
            placeholder="Password"
            onChangeText={(value) => this.setState({ password: value })}
            value={this.state.password}
            secureTextEntry={true}

          />
        </View>
        <View style={{ width: '100%', flex: 0.4 }}></View>
        <View style={{
          width: '100%',
          flex: 1.5,
          borderColor: '#3C5984',
          borderWidth: 2,
          borderRadius: 20,
        }}>
          <TextInput
            style={{ fontSize: 18 * rem, width: '95%', height: '100%', marginLeft: '5%'}}
            autoCapitalize='none'
            autoCompleteType='off'
            placeholder="Project ID"
            keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
            onChangeText={(value) => this.setState({ project: value })}
            value={this.state.project}

          /></View>

      </View>
    </View>
    <View style = {{flex:1,alignItems:'center', width:'100%'}}>
      <TouchableOpacity style = {{height:'40%', width:'70%', backgroundColor:'#00b5ec', borderRadius:20, alignItems:'center', justifyContent:'center'}} onPress={onPress}>
        <Text style = {{color:'white', fontWeight:'bold', fontSize:Math.min(25*rem,45*wid)}}>Login</Text>
      </TouchableOpacity>
    </View>
    </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
  );
}
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    // left: 0, top: 0, position: 'absolute'

  },
});