import React from 'react';
import { View } from 'react-native';

export const PlusIcon = () =>
  <View style={{ height: 15, width: 15, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{height: 1, width: 15, backgroundColor: '#000', position: 'absolute' }} />
    <View style={{height: 15, width: 1, backgroundColor: '#000', position: 'absolute' }} />
  </View>
