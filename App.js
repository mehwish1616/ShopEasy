import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TextInput,
  StyleSheet, Button, Alert, SafeAreaView,
  Modal, ScrollView, Switch, TouchableOpacity
} from 'react-native';

const products = [
  {
    id: '1',
    name: 'Blue T-Shirt',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'White Sneakers',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1600180758890-6f00f6b36f4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Smart Watch',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1598300057696-6ef3b29b1186?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Leather Wallet',
    price: 900,
    image: 'https://images.unsplash.com/photo-1598032893560-0a659ad2a395?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Black Hoodie',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1551854838-212c50b4b43f?auto=format&fit=crop&w=800&q=80'
  }
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkStyles : lightStyles;

  const addToWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      Alert.alert('Already in wishlist!');
    } else {
      setWishlist([...wishlist, product.id]);
      Alert.alert('Added to wishlist!');
    }
  };

  const submitReview = () => {
    if (reviewText.trim() === '') return;
    const updated = { ...reviews };
    if (!updated[selectedProduct.id]) updated[selectedProduct.id] = [];
    updated[selectedProduct.id].push(reviewText);
    setReviews(updated);
    setReviewText('');
    Alert.alert('Review submitted!');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedProduct(item)} style={theme.card}>
      <Image source={{ uri: item.image }} style={theme.image} />
      <Text style={theme.name}>{item.name}</Text>
      <Text style={theme.price}>Rs. {item.price}</Text>
      <Button title="💖 Wishlist" onPress={() => addToWishlist(item)} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={theme.container}>
      <View style={theme.header}>
        <Text style={theme.heading}>🛍️ ShopEasy</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={theme.text}>🌙</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={theme.list}
      />

      <Modal visible={!!selectedProduct} animationType="slide">
        <ScrollView style={theme.container}>
          {selectedProduct && (
            <>
              <Image source={{ uri: selectedProduct.image }} style={theme.imageLarge} />
              <Text style={theme.name}>{selectedProduct.name}</Text>
              <Text style={theme.price}>Rs. {selectedProduct.price}</Text>

              <Text style={theme.subHeading}>Write a Review:</Text>
              <TextInput
                value={reviewText}
                onChangeText={setReviewText}
                style={theme.input}
                placeholder="Type your review"
                placeholderTextColor={darkMode ? '#ccc' : '#888'}
              />
              <Button title="Submit Review" onPress={submitReview} />

              <Text style={theme.subHeading}>Reviews:</Text>
              {(reviews[selectedProduct.id] || []).map((rev, idx) => (
                <Text key={idx} style={theme.text}>• {rev}</Text>
              ))}

              <Button title="Close" onPress={() => setSelectedProduct(null)} color="crimson" />
            </>
          )}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

const lightStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  heading: { fontSize: 22, fontWeight: 'bold' },
  input: {
    backgroundColor: '#fff', margin: 10, padding: 10,
    borderRadius: 8, borderColor: '#ccc', borderWidth: 1
  },
  list: { paddingHorizontal: 10 },
  card: {
    backgroundColor: '#fff', padding: 15,
    borderRadius: 10, marginBottom: 10
  },
  image: { height: 150, borderRadius: 10 },
  imageLarge: { height: 250, margin: 10, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: '600', marginVertical: 5 },
  price: { fontSize: 16, color: 'green', marginBottom: 5 },
  subHeading: { fontSize: 16, margin: 10, fontWeight: 'bold' },
  text: { fontSize: 14, marginHorizontal: 10 },
});

const darkStyles = {
  ...lightStyles,
  container: { ...lightStyles.container, backgroundColor: '#1a1a1a' },
  heading: { ...lightStyles.heading, color: '#fff' },
  card: { ...lightStyles.card, backgroundColor: '#333' },
  name: { ...lightStyles.name, color: '#fff' },
  price: { ...lightStyles.price, color: '#ccc' },
  subHeading: { ...lightStyles.subHeading, color: '#fff' },
  input: { ...lightStyles.input, backgroundColor: '#333', color: '#fff', borderColor: '#666' },
  text: { ...lightStyles.text, color: '#ccc' },
};
