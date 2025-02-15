import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers';
import axios from 'axios';
import './Products.css';
import CustomButton from '../ReusuableComponents/CustomButton';

const Products = () => {
  const [allProducts, setAllProducts] = useState([]); // Fetch and store all products
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.searchTerm);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const dispatch = useDispatch();

  // Fetch all products once on mount and when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : 'https://fakestoreapi.com/products';
        const response = await axios.get(url);
        setAllProducts(response.data); // Store fetched products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Refetch when category changes

  // Filter products client-side using BOTH category and search term
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        padding: '20px'
      }}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="card-products">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <div className="product-rating">
              <span className="rating-stars">{'★'.repeat(Math.round(product.rating.rate))}</span>
              ({product.rating.count} reviews)
            </div>
            <div className="mt-3">
              <CustomButton
                text="Add to Cart"
                onClick={() => handleAddToCart(product)}
                backgroundColor="#e72744"
                width="100%"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;