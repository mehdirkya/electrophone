import React, { useState } from 'react';
import axios from 'axios';

const iconOptions = [
  "batteryicon.png", "connecticon.png", "coresicon.png", "cputicon.png", "featuresicon.png",
  "frontcameraicon.png", "gpuicon.png", "healthicon.png", "maincameraicon.png", "militaryicon.png",
  "osicon.png", "performance.png", "ramicon.png", "Screensize.png", "sensoricon.png", "soundicon.png",
  "storage.png", "stylusicon.png", "watericon.png", "weighticon.png"
];

const categories = ["Smartphones", "Smartwatches", "Consoles", "Tablets", "Headphones"];

const ProductForm = ({ token }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    category: '',
    image: null,
    inStock: true,
    newArrival: false,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const [specs, setSpecs] = useState(
    Array.from({ length: 6 }, () => ({ label: '', value: '', icon: `/icons/${iconOptions[0]}` }))
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSpecChange = (index, field, value) => {
    setSpecs((prevSpecs) => {
      const updated = [...prevSpecs];
      updated[index] = {
        ...updated[index],
        [field]: field === 'icon' ? `/icons/${value}` : value,
      };
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', formData.image);
    data.append('name', formData.name);
    data.append('brand', formData.brand);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('inStock', formData.inStock);
    data.append('newArrival', formData.newArrival);
    data.append('specs', JSON.stringify(specs));

    try {
      await axios.post('http://localhost:5000/api/admin/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Product added!');
      setFormData({
        name: '',
        brand: '',
        price: '',
        description: '',
        category: '',
        image: null,
        inStock: true,
        newArrival: false,
      });
      setPreviewImage(null);
      setSpecs(Array.from({ length: 6 }, () => ({ label: '', value: '', icon: `/icons/${iconOptions[0]}` })));
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">Add Product</h2>

      {/* Basic Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="input" required />
        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="input" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="input" required />
        <select name="category" value={formData.category} onChange={handleChange} className="input" required>
          <option value="">Select Category</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full input resize-none" rows={3} />

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
          In Stock
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="newArrival" checked={formData.newArrival} onChange={handleChange} />
          New Arrival
        </label>
      </div>

      {/* Image Upload */}
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" required />
        {previewImage && <img src={previewImage} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded-md" />}
      </div>

      {/* Specs Input */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Specifications (6 required)</h3>
        {specs.map((spec, index) => (
          <div key={index} className="flex gap-2 mb-3 items-center">
            <input
              type="text"
              placeholder="Label"
              value={spec.label}
              onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
              className="input w-1/3"
              required
            />
            <input
              type="text"
              placeholder="Value"
              value={spec.value}
              onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
              className="input w-1/3"
              required
            />
            <select
              value={spec.icon.replace('/icons/', '')}
              onChange={(e) => handleSpecChange(index, 'icon', e.target.value)}
              className="input w-1/3"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Live Specs Preview */}
      <div>
        <h4 className="text-md font-medium mt-6 mb-2">Live Spec Preview:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {specs.map((spec, idx) => (
            <div key={idx} className="flex items-center gap-2 border p-2 rounded">
              <img src={spec.icon} alt="icon" className="w-6 h-6" />
              <span className="font-semibold">{spec.label}:</span>
              <span>{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-black text-white px-6 py-2 rounded w-full">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
