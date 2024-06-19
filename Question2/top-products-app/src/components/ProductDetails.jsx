import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/categories/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div className="container mx-auto my-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="bg-white rounded-lg shadow-md p-4">
        
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600">Company: {product.company}</p>
        <p className="text-gray-600">Category: {product.category}</p>
        <p className="text-gray-600">Price: {product.price}</p>
        <p className="text-gray-600">Rating: {product.rating}</p>
        <p className="text-gray-600">Discount: {product.discount}</p>
        <p className="text-gray-600">Availability: {product.availability}</p>
      </div>
    </div>
  );
};

export default ProductDetails;