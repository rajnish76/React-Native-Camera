import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const images = ({navigation}) => {
  const uri = navigation.getParam('uri');
  return <Image source={{uri: uri}} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
  },
});

export default images;
