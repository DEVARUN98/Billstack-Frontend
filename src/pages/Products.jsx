import React, { useState } from "react";

export default function Products({ products, setProducts }) {
  const [prod, setProd] = useState({ name: "", price: "", qty: "" });

  // 🔹 Add new product
  const addProduct = () => {
    if (!prod.name.trim() || !prod.price || !prod.qty) {
      alert("Please fill all product details!");
      return;
    }

    // Check for duplicates (same name)
    const exists = products.some(
      (p) => p.name.toLowerCase() === prod.name.toLowerCase()
    );
    if (exists) {
      alert("Product already exists!");
      return;
    }

    setProducts([...products, prod]);
    setProd({ name: "", price: "", qty: "" });
  };

  return (
    <div className="page">
      <h2>Products / Services</h2>

      {/* Product Input Section */}
      <div className="form-row">
        <input
          type="text"
          placeholder="Product Name"
          value={prod.name}
          onChange={(e) => setProd({ ...prod, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={prod.price}
          onChange={(e) => setProd({ ...prod, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={prod.qty}
          onChange={(e) => setProd({ ...prod, qty: e.target.value })}
        />
        <button onClick={addProduct}>Add</button>
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>Product / Service</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>₹ {p.price}</td>
                <td>{p.qty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", color: "#888" }}>
                No products added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
