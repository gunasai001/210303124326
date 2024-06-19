import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4NzgyNDY1LCJpYXQiOjE3MTg3ODIxNjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRjOTUxNTFlLTFmYmItNGQ4Ny1hYjkzLTNiYTg4OGRkYzAzMCIsInN1YiI6IjIxMDMwMzEyNDMyNkBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJQYXJ1bCBVbml2ZXJzaXR5IiwiY2xpZW50SUQiOiJkYzk1MTUxZS0xZmJiLTRkODctYWI5My0zYmE4ODhkZGMwMzAiLCJjbGllbnRTZWNyZXQiOiJLWW9Eb0p0TU9WcWFob2NwIiwib3duZXJOYW1lIjoiQ2hpbnRhbGEgR3VuYSBTYWkiLCJvd25lckVtYWlsIjoiMjEwMzAzMTI0MzI2QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsInJvbGxObyI6IjIxMDMwMzEyNDMyNiJ9.h-Lw2_D0sPTX3VyUiQBUlphb0Vo-hkbkVWD5x_zDnJM';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'AMZ',
    company: '',
  });
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://20.244.56.144/test/categories/:${filters.company}/categories/:${filters.category}/products?top=10`, {
          params: {
            category: filters.category,
            company: filters.company,
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [filters, sortBy, sortOrder, currentPage]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">
          Category:
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1"
        />

        {/* Add other filter inputs */}
      </div>

      <div className="mb-4">
        <label htmlFor="sortBy" className="mr-2">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">Select</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="discount">Discount</option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="ml-2 border border-gray-300 rounded px-2 py-1"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={`https://picsum.photos/200/200?random=${product.id}`} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600">Company: {product.company}</p>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Price: {product.price}</p>
            <p className="text-gray-600">Rating: {product.rating}</p>
            <p className="text-gray-600">Discount: {product.discount}</p>
            <p className="text-gray-600">Availability: {product.availability}</p>
            <Link to={`/products/${product.id}`} className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={products.length < productsPerPage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;