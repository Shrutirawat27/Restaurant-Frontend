import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminDishes() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({ name: "", description: "", price: "", special: false, category: "", });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
      fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/dishes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(res.data);
    } catch (err) {
      toast.error("Error fetching dishes");
    }
  };

  const handleAddOrUpdate = async () => {
    if (!newDish.name || !newDish.description || !newDish.price) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newDish.name);
    formData.append("description", newDish.description);
    formData.append("price", newDish.price);
    formData.append("special", newDish.special);
    formData.append("category", newDish.category);
    if (image) formData.append("image", image);

    setLoading(true);

    try {
      if (editId) {
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/dishes/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Dish updated!");
        const updatedDishes = dishes.map((d) => (d._id === editId ? res.data : d));
        setDishes(updatedDishes);
        setEditId(null);
      } else {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/dishes`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Dish added successfully!");
        setDishes([...dishes, res.data]);
      }

      setNewDish({ name: "", description: "", price: "", special: false });
      setImage(null);
    } catch (err) {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/dishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(dishes.filter((dish) => dish._id !== id));
      toast.success("Dish deleted");
    } catch (err) {
      toast.error("Error deleting dish");
    }
  };

  const handleEdit = (dish) => {
    setNewDish({
      name: dish.name,
      description: dish.description,
      price: dish.price,
      special: dish.special,
      category: dish.category || "",
    });
    setEditId(dish._id);
    setImage(null); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  const cancelEdit = () => {
    setEditId(null);
    setNewDish({ name: "", description: "", price: "", special: false });
    setImage(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#38ac2c]">Admin Dish Panel</h2>

      {/* Add Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4">{editId ? "Edit Dish" : "Add New Dish"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

{/* Dish Name */}
<input
  placeholder="Dish Name"
  className="border p-2 rounded"
  value={newDish.name}
  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
/>

{/* Description */}
<input
  placeholder="Description"
  className="border p-2 rounded"
  value={newDish.description}
  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
/>

{/* Price */}
<input
  placeholder="Price"
  className="border p-2 rounded"
  type="number"
  value={newDish.price}
  onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
/>

{/* Image Upload */}
{newDish.special && (
  <label className="flex items-center gap-4 cursor-pointer">
    <img
      className="w-20 h-20 object-cover border rounded"
      src={image ? URL.createObjectURL(image) : "/upload.png"}
      alt=""
    />
    <input
      type="file"
      hidden
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
    />
    <span className="text-gray-600">{image?.name || "Choose Image"}</span>
  </label>
)}

{/* Category Dropdown */}
{!newDish.special && (
  <select
    className="border p-2 rounded"
    value={newDish.category}
    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
  >
    <option value="">Select Category</option>
    <option value="Appetizers">Appetizers</option>
    <option value="Main Course">Main Course</option>
    <option value="Tandoori">Tandoori</option>
    <option value="Bread">Bread</option>
    <option value="Rice">Rice</option>
    <option value="Desserts">Desserts</option>
    <option value="Drinks">Drinks</option>
  </select>
)}

{/* Special Dish Checkbox */}
<label className="col-span-2 flex items-center gap-2 mt-2">
  <input
    type="checkbox"
    checked={newDish.special}
    onChange={(e) =>
      setNewDish({ ...newDish, special: e.target.checked, category: "" })
    }
  />
  <span>Add to Special Dishes (Home Page)</span>
</label>

        </div>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddOrUpdate}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Dish" : "Add Dish"}
          </button>
          {editId && (
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Dishes List */}
      <div className="grid md:grid-cols-2 gap-6">
        {dishes.length === 0 ? (
          <p>No dishes found.</p>
        ) : (
          dishes.map((dish) => (
            <div key={dish._id} className="border p-4 rounded shadow-sm bg-white">
              <img
                src={`${import.meta.env.VITE_REACT_APP_API_URL}${dish.imageUrl}`}
                alt={dish.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{dish.name}</h3>
              <p className="text-sm text-gray-600">{dish.description}</p>
              <p className="text-green-700 font-bold">${dish.price}</p>
              {dish.special && <p className="text-yellow-600 font-semibold">⭐ Special Dish</p>}
              <div className="flex gap-2 mt-3">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => handleEdit(dish)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(dish._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
