import React, { useEffect, useState } from 'react';

const InventoryList = ({ token }) => {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  const fetchInventory = () => {
    fetch('http://localhost:8000/api/inventory/', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setInventory(data))
      .catch(err => {
        console.error(err);
        setError('Failed to fetch inventory');
      });
  };

  useEffect(() => {
    fetchInventory();
  }, [token]);

  const handleAddProduct = e => {
    e.preventDefault();

    if (!itemName) {
      alert('Item name is required');
      return;
    }

    fetch('http://localhost:8000/api/inventory/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        item_name: itemName,
        quantity: quantity,
      }),
    })
      .then(res => {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",res);
        if (!res.ok) {
          throw new Error('Failed to add product');
        }
        return res.json();
      })
      .then(data => {
        // Clear inputs
        setItemName('');
        setQuantity(1);
        // Refresh inventory list
        fetchInventory();
      })
      .catch(err => {
        console.error(err);
        alert('Error adding product');
      });
  };

  return (
    <div>
      <h2>Your Inventory</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {inventory.map(item => (
          <li key={item.id}>{item.item_name} - Quantity: {item.quantity}</li>
        ))}
      </ul>

      <h3>Add Product</h3>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value) || 1)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default InventoryList;
