import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { LeftRightAlign, Separator } from '../common';
import { PlusIcon, MinusIcon } from '../../assets';
import { fetchItem } from '../../actions';

class PurchaseSummary extends React.Component {
  constructor() {
    super();

    this.state = {
      showPickupSavings: false,
      showItemDetails: false,
      showPromoCode: false,
      promoCode: '',
      discount: 0,
      subtotal: 85.37,
      pickupSavings: 3.85,
      fees: 8.92,
      zipcode: 94085,
      total: 108.03,
    }
  }

  componentDidMount() {
    this.props.fetchItem();
  }

  renderCostCalculations = () => {
    const { subtotal, pickupSavings, fees, zipcode, total, discount } = this.state
console.log(discount)
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
          right={`$${(total*(1-discount)).toFixed(2)}`}
          leftStyle={styles.totalLabelText}
          rightStyle={styles.totalValueText}
        />
      </View>
    )
  }

  renderPickupSavingsTooltip = () =>
    this.state.showPickupSavings ?
    <View style={{position: 'absolute', marginTop: 100, zIndex: 1}}>
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipText}>
          Picking up your order in the store helps cut costs and we pass the savings onto you.
        </Text>
      </View>
      <View style={[styles.tooltipContainerArrow, {marginLeft: 35}]} />
    </View> :
    <View />

  renderItemDetails = () => {
    const show = this.state.showItemDetails;
    const {item} = this.props;

    return (
      <View>
        {this.renderExpanderLabel('showItemDetails', show, 'See item details', 'Hide item details')}
        {
          show ?
          <View style={styles.itemDetailsContainer}>
            <Image style={styles.itemImage} source={{uri: item.imageUrl}}/>
            <View style={{flex: 2}}>
              <Text style={styles.itemNameText}>{item.name}</Text>
              <LeftRightAlign
                left={`$${item.price}\n$${item.originalPrice}`}
                right={`Qty: ${item.quantity}`}
                leftStyle={styles.calculationValueText }
                rightStyle={styles.text}
              />
            </View>
          </View> :
          <View />
        }
      </View>
    )
  }

  applyPromoCode = () => {
    // Apply promo code
    if(this.state.promoCode === 'DISCOUNT') {
      this.setState({discount: 0.1});
    }
  }

  renderPromoCode = () => {
    const show = this.state.showPromoCode;

    return (
      <View>
        {this.renderExpanderLabel('showPromoCode', show, 'Apply promo code', 'Hide promo code')}
        {
          show ?
          <View>
            <Text style={styles.promoLabelText}>Promo code</Text>
            <View flexDirection='row'>
              <TextInput style={styles.promoCodeInput} onChangeText={promoCode => this.setState({promoCode})}/>
              <TouchableOpacity onPress={this.applyPromoCode} style={styles.buttonContainer}>
                <Text style={{fontWeight: 'bold'}}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View> :
          <View />
        }
      </View>
    )
  }

  renderExpanderLabel = (stateKey, expand, showText, hideText) =>
    <TouchableOpacity
      onPress={() => this.setState({[stateKey]: !expand})}
      style={{flexDirection: 'row', alignItems: 'center'}}
    >
      { <Text style={[styles.text, styles.expanderLabelText]}>
        {`${expand ? hideText : showText}`}
        </Text> }
      { expand ? <MinusIcon /> : <PlusIcon /> }
    </TouchableOpacity>

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.setState({showPickupSavings: false})}
        activeOpacity={1}
      >
        <View style={styles.box}>
          {this.renderCostCalculations()}
          <Separator />
          {this.renderItemDetails()}
          <Separator />
          {this.renderPromoCode()}
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({item}) => {
  return { item };
};

export default connect(mapStateToProps, {fetchItem})(PurchaseSummary);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingTop: 100
  },
  box: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 10
  },
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
  tooltipContainer: {
    width: 220,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tooltipContainerArrow: {
    height: 30,
    width: 30,
    marginTop: -15,
    position: 'absolute',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderTopLeftRadius: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    transform: [{ rotate: '45deg' }]
  },
  tooltipText: {
    fontSize: 15
  },
  totalLabelText: {
    fontWeight: 'bold',
    fontSize: 30
  },
  totalValueText: {
    fontWeight: 'bold',
    fontSize: 35
  },
  expanderLabelText: {
    textDecorationLine: 'underline',
    marginRight: 10,
    marginVertical: 10,
    lineHeight: 20
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  itemImage: {
    resizeMode: 'contain',
    flex: 1
  },
  itemNameText: {
    fontSize: 30
  },
  itemPriceText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  itemOriginalPriceText: {
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'line-through'
  },
  promoLabelText: {
    fontWeight: 'bold',
    color: '#999',
    paddingLeft: 10,
    marginTop: 10
  },
  promoCodeInput: {
    height: 30,
    flex: 1,
    marginTop: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc'
  },
  buttonText: {
    fontWeight: 'bold'
  },
  buttonContainer: {
    height: 30,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginLeft: 10
  }
});
