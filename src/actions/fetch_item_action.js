import { FETCH_ITEM } from './types';

export const fetchItem = () => {
  const item = {
    name: 'OFM Essentials Racecar-Style Leather Gaming Chair, Red',
    price: 99.11,
    originalPrice: 102.96,
    quantity: 1,
    imageUrl: 'https://i5.walmartimages.com/asr/e73e1252-642c-4473-93ea-fd3b564a7027_1.3e81ea58fa3042452fe185129a4a865f.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
  }

  return {
    type: FETCH_ITEM,
    payload: item
  }
}
