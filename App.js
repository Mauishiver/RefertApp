import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permesso fotocamera negato');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Fai una foto al referto" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 300, height: 400, marginTop: 20 }}
        />
      )}
      <Text style={{ marginTop: 20 }}>Qui appariranno i dati estratti</Text>
    </View>
  );
}
