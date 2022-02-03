import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const toast = (message) => {
  return (
    <View>
      <Text>{`${message}`}</Text>
    </View>
  );
};

export default toast;

const styles = StyleSheet.create({});
