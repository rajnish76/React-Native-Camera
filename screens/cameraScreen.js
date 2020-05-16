import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

const cameraScreen = ({navigation}) => {
  let cameraRef = useRef(null);
  const [camType, setCam] = useState(RNCamera.Constants.Type.back);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.on);

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      if (camType === RNCamera.Constants.Type.front) {
        setCam(RNCamera.Constants.Type.back);
      }
      navigation.navigate('images', {uri: data.uri});
    }
  };

  const flipCamera = () => {
    if (camType === RNCamera.Constants.Type.back) {
      setCam(RNCamera.Constants.Type.front);
    } else {
      setCam(RNCamera.Constants.Type.back);
    }
  };

  const toggleFlash = () => {
    console.log(flash);
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={camType}
        flashMode={flash}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => toggleFlash()}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> FLASH </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => flipCamera()} style={styles.capture}>
            <Text style={{fontSize: 14}}> FLIP-CAM </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default cameraScreen;
