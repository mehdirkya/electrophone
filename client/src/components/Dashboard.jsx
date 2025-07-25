import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  // Fetch produits au chargement
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  // Ajouter un produit (simple)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert("Remplis le nom et prix");

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    const newProduct = await res.json();
    setProducts((prev) => [...prev, newProduct]);
    setForm({ name: "", price: "", description: "" });
  };

  // Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Produits</h1>

      {/* Formulaire ajout */}
      <form onSubmit={handleAdd} className="mb-8 flex gap-4">
        <input
          type="text"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded flex-grow"
        />
        <input
          type="number"
          placeholder="Prix"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded w-24"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded flex-grow"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Ajouter
        </button>
      </form>

      {/* Liste produits */}
      <ul className="space-y-4">
        {products.map(({ _id, name, price, description }) => (
          <li
            key={_id}
            className="flex justify-between items-center border rounded p-4 shadow-sm"
          >
            <div>
              <h2 className="font-semibold">{name}</h2>
              <p className="text-sm text-gray-600">{description}</p>
              <p className="text-blue-600 font-bold">{price} €</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => alert("Modification à implémenter")}
                className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
