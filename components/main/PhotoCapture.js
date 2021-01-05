import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
// import Icon from 'react-native-vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PhotoCapture({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

      if (galleryStatus.status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const resetImage = async () => {
    if (image) {
      setImage(null);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // specify which types of media you want user to be able to select
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topicInfo}>
        <Text style={styles.topicTitle}>Challenge Topic: Portraits</Text>
        <Text style={styles.topicDescription}>
          What will you submit for this challenge?
        </Text>
      </View>
      <>
        <View style={styles.cameraContainer}>
          {!image ? (
            <Camera
              ref={(ref) => setCamera(ref)}
              style={styles.cameraArea}
              type={type}
              ratio={'1:1'}
            />
          ) : (
            <Image source={{ uri: image }} style={{ flex: 1 }} />
          )}
        </View>
        <View style={styles.cameraOptionsRow}>
          <Icon.Button
            // flip camera
            name="undo"
            size={30}
            style={styles.cameraBtn}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <Icon.Button
            // take photo
            name="camera"
            size={30}
            style={styles.cameraBtn}
            onPress={() => takePhoto()}
          />
          <Icon.Button
            // Access gallery
            name="folder-open"
            size={30}
            style={styles.cameraBtn}
            onPress={() => pickImage()}
          />
        </View>
      </>
      <Button
        title="Submit"
        style={styles.submitBtn}
        onPress={() => navigation.navigate('Save', { image })}
      ></Button>
      <Button
        title="Retake photograph"
        style={styles.submitBtn}
        onPress={() => resetImage()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 0,
  },
  cameraArea: {
    flex: 1,
    aspectRatio: 1,
  },
  topicTitle: {
    color: 'darkgrey',
  },
  topicDescription: {
    // flex: 1,
    // textAlign: 'center',
  },
  topicDescription: {
    // flex: 1,
    // textAlign: 'center',
    paddingTop: 5,
    fontSize: 18,
  },
  topicInfo: {
    backgroundColor: '#FFF7',
    padding: 20,
  },
  cameraOptionsRow: {
    backgroundColor: 'black',
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'center',
  },
  cameraBtn: {
    backgroundColor: 'black',
  },
  submitBtn: {
    paddingTop: 20,
    fontSize: 50,
  },
});
