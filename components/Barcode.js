import React from 'react'
import * as FileSystem from 'expo-file-system';
import { Text, View, StyleSheet, Button, Dimensions} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Sharing from 'expo-sharing';
import moment from 'moment';

let datas = [["Date", "Operator Name", "Project Number", "Equipment ID", "Expiration Date", "Expired?"]]
const entireScreenHeight = Dimensions.get('window').height;
const rem = entireScreenHeight / 380;
const entireScreenWidth = Dimensions.get('window').width;
const wid = entireScreenWidth / 380;
export default class AppContainer extends React.Component {
  state = {
    scanned: false,
    hasPermission: null,
  }
  export = async () => {
    let csvContent = "";
    console.log(JSON.stringify(datas))
    datas.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var date = "" + moment().format('MMMM Do YYYY, h:mm:ss A');
    console.log(date)
    let fileUri = FileSystem.documentDirectory + encodeURI("Data - " + date +  ".csv")
    console.log(fileUri)
    await FileSystem.writeAsStringAsync(fileUri, csvContent);
    Sharing.shareAsync(fileUri)
  }
  async componentDidMount() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' })
  }
  render() {
    const handleBarCodeScanned = ({ type, data }) => {
      var items = data.split(" ");
      console.log(moment().diff(moment(items[1], 'MM-DD-YYYY'), 'days'))
      datas.push([moment().format('MM-DD-YYYY'), global.uname, global.project, items[0], items[1], moment().isSameOrAfter(moment(items[1], 'MM-DD-YYYY')) ? 'Yes' : 'No'])
      this.setState({ scanned: true })
      alert('Scanned!');
    };

    if (this.state.hasPermission === null) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
          <Text style = {{fontSize:wid*15}}>Requesting Camera Permissions</Text>
        </View>
      );
    }
    if (this.state.hasPermission === false) {
      alert("Please Enable Camera Permissions")
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
          <Text style = {{fontSize:wid*15}}>No access to camera</Text>
        </View>
      );
    }
    return (

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {this.state.scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
        <Button title={'Tap to Export Data'} onPress={() => this.export()} />
        <View style={{ height: '2%' }}></View>
      </View>
    );
  }
}