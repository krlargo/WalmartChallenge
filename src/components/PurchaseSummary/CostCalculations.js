import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LeftRightAlign from '../common';

export default class CostCalculations extends Component {
  render() {
    const { subtotal, pickupSavings, zipcode, fees, total } = this.props;

    return (
      <View>
        <LeftRightAlign
          left='Subtotal'
          right={`$${subtotal}`}
          leftStyle={styles.text}
          rightStyle={styles.calculationValueText}
        />
        <LeftRightAlign
          left='Pickup savings'
          right={`-$${pickupSavings}`}
          leftStyle={styles.pickupSavingsLabelText}
          rightStyle={styles.pickupSavingsValueText}
          onPressLeft={() => this.setState({showPickupSavings: !this.state.showPickupSavings})}
        />
        {this.renderPickupSavingsTooltip()}
        <LeftRightAlign
          left={`Est. taxes & fees\n(Based on ${zipcode})`}
          right={`$${fees}`}
          leftStyle={styles.text}
          rightStyle={styles.calculationValueText}
        />
        <LeftRightAlign
          left='Est. total'
          right={`$${total}`}
          leftStyle={styles.totalLabelText}
          rightStyle={styles.totalValueText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  calculationValueText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  pickupSavingsLabelText: {
    fontSize: 20,
    textDecorationLine: 'underline'
  },
  pickupSavingsValueText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f00'
  },
  totalLabelText: {
    fontWeight: 'bold',
    fontSize: 30
  },
  totalValueText: {
    fontWeight: 'bold',
    fontSize: 35
  }
})
