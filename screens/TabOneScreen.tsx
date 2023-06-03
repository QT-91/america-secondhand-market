import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, Alert, StyleSheet } from 'react-native';
import api, { dbURL } from '../hooks/api'

import { ProductItem } from '@/shared/types';


const productsSampleData: ProductItem[] = [
  {
    id: 1,
    title: 'Item 1',
    images: [
      { id: 0, title: 'Image 1', file: 'https://via.placeholder.com/150' },
      { id: 1, title: 'Image 2', file: 'https://via.placeholder.com/150' },
    ],
    description: 'description',
    price: 1000,
    category: 'category',
    seller_info: 'seller_info',
    location: 'location',
    created_date: '2023-06-03T15:02:34.880Z',
    status: 'status',
  },
  {
    id: 2,
    title: 'Item 2',
    images: [
      { id: 0, title: 'Image 1', file: 'https://via.placeholder.com/150' },
      { id: 1, title: 'Image 2', file: 'https://via.placeholder.com/150' },
    ],
    description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
    price: 1000,
    category: 'category',
    seller_info: 'seller_info',
    location: 'location',
    created_date: '2023-06-03T15:02:34.880Z',
    status: 'status',
  },
  {
    id: 3,
    title: 'Item 3',
    images: [
      { id: 0, title: 'Image 1', file: 'https://via.placeholder.com/150' },
      { id: 1, title: 'Image 2', file: 'https://via.placeholder.com/150' },
    ],
    description: 'description',
    price: 1000,
    category: 'category',
    seller_info: 'seller_info',
    location: 'location',
    created_date: '2023-06-03T15:02:34.880Z',
    status: 'status',
  },
  {
    id: 4,
    title: 'Item 4',
    images: [
      { id: 0, title: 'Image 1', file: 'https://via.placeholder.com/150' },
      { id: 1, title: 'Image 2', file: 'https://via.placeholder.com/150' },
    ],
    description: 'description',
    price: 1000,
    category: 'category',
    seller_info: 'seller_info',
    location: 'location',
    created_date: '2023-06-03T15:02:34.880Z',
    status: 'status',
  },
  // More items...
];

const ProductItemView = ({ item }: { item: ProductItem }) => (
  <View style={styles.itemContainer}>
    <View style={{ maxWidth: '66%' }}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
      <Text style={styles.priceText}>{item.price}$</Text>
    </View>
    <View>
      {item.images.length > 0 && (
        <Image source={{ uri: dbURL + item.images[0].image.file }} style={styles.imageStyle} />
      )}
    </View>
  </View>
);

const ProductListScreen = () => {
  const [products, setProducts] = React.useState<ProductItem[]>([])

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await api.get('product/');
      setProducts(res.data);
    } catch (error) {
      createAlert(error)
    }
  };

  const createAlert = (error: any) => {
    Alert.alert('Error', error.message, [
      {
        text: 'Send Feedback',
        style: 'default',
        onPress: () => console.log('Send Feedback pressed'),
      },
      {
        text: 'Close',
        style: 'cancel',
      },
    ]);
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductItemView item={item} />}
      keyExtractor={item => String(item.id)}
    />
  )
};

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 1,
    borderRadius: 10,
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  priceText: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ProductListScreen;
