import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default LeftRightAlign = ({left, right, leftStyle, rightStyle, onPressLeft, onPressRight}) =>
  <View style={{flexDirection: 'row', marginVertical: 10}}>
    <TouchableOpacity style={{flex: 1}} onPress={onPressLeft} activeOpacity={onPressLeft ? 0.2 : 1}>
      <Text style={[{textAlign: 'left'}, leftStyle]}>{left}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{flex: 1}} onPress={onPressRight} activeOpacity={onPressRight ? 0.2 : 1}>
      <Text style={[{textAlign: 'right'}, rightStyle]}>{right}</Text>
    </TouchableOpacity>
  </View>
