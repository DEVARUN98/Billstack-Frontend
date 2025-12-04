import React, { useState } from "react";

export default function Products({ products = [], setProducts }) {
  const [prod, setProd] = useState({ name: "", price: "", qty: "" });

  const addProduct = async () => {
    if (!prod.name.trim() || !prod.price || !prod.qty) {
      alert("Please fill all product details!");
      return;
    }

    // Safe duplicate check
    const exists = products.some(
      (p) => p.product_name?.toLowerCase() === prod.name.toLowerCase()
    );
    if (exists) {
      alert("Product already exists!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/products/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: prod.name,
          price: Number(prod.price),
          product_quantity: Number(prod.qty),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Save failed:", res.status, errorText);
        alert(`Error: ${res.status}`);
        return;
      }

      const newProduct = await res.json();
      setProducts([...products, newProduct]);
      setProd({ name: "", price: "", qty: "" }); // reset form
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="page">
      <h2>Products / Services</h2>

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
        <button onClick={addProduct}>Add Product</button>
      </div>

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
            console.log("products", products),
            products.map((p) => (
              <tr key={p.id || p.product_name}>
                <td>{p.product_name}</td>
                <td>₹ {p.price}</td>
                <td>{p.product_quantity}</td>
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
