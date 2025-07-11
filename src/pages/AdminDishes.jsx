import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDishes() {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    special: false,
    category: "",
  });
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
    } catch {
      toast.error("Error fetching dishes");
    }
  };

  const handleAddOrUpdate = async () => {
    const { name, description, price, special, category } = newDish;

    if (!name || !description || !price) {
      return toast.error("All fields are required.");
    }
    if (!special && !category) {
      return toast.error("Category is required for normal dishes.");
    }
    if (special && !image && !editId) {
      return toast.error("Image is required for special dishes.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("special", special);
    formData.append("category", special ? "" : category); 
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      let res;
      if (editId) {
        res = await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/dishes/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Dish updated!");
        setDishes(dishes.map((d) => (d._id === editId ? res.data : d)));
        setEditId(null);
      } else {
        res = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/api/admin/dishes`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Dish added!");
        setDishes([...dishes, res.data]);
      }

      setNewDish({ name: "", description: "", price: "", special: false, category: "" });
      setImage(null);
    } catch {
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
    } catch {
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
    setNewDish({ name: "", description: "", price: "", special: false, category: "" });
    setImage(null);
  };

  const renderSpecialDishCard = (dish) => (
    <div key={dish._id} className="border p-4 rounded shadow-sm bg-white flex justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <img
          src={dish.imageUrl || "/upload.png"}
          alt={dish.name}
          className="w-20 h-20 object-cover rounded border"
        />
        <div>
          <h3 className="text-lg font-bold">{dish.name}</h3>
          <p className="text-sm text-gray-600">{dish.description}</p>
          <p className="text-green-700 font-bold mt-1">${dish.price}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => handleEdit(dish)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
        <button onClick={() => handleDelete(dish._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );

  const renderMenuDishCard = (dish) => (
    <div key={dish._id} className="border p-4 rounded shadow-sm bg-white flex justify-between items-center gap-4">
      <div>
        <h3 className="text-lg font-bold">{dish.name}</h3>
        <p className="text-sm text-gray-600">{dish.description}</p>
        <p className="text-green-700 font-bold mt-1">${dish.price}</p>
        {dish.category && (
          <p className="text-sm mt-1">Category: <strong>{dish.category}</strong></p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => handleEdit(dish)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
        <button onClick={() => handleDelete(dish._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );

  const specialDishes = dishes.filter((dish) => dish.special);
  const normalDishes = dishes.filter((dish) => !dish.special);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#38ac2c]">Admin Dish Panel</h2>

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4">{editId ? "Edit Dish" : "Add New Dish"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Dish Name"
            className="border p-2 rounded"
            value={newDish.name}
            onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
          />
          <input
            placeholder="Description"
            className="border p-2 rounded"
            value={newDish.description}
            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          />
          <input
            placeholder="Price"
            type="number"
            className="border p-2 rounded"
            value={newDish.price}
            onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
          />
          {newDish.special ? (
            <label className="flex items-center gap-4 cursor-pointer">
              <img
                className="w-20 h-20 object-cover border rounded"
                src={image ? URL.createObjectURL(image) : "/upload.png"}
                alt=""
              />
              <input hidden type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              <span className="text-gray-600">{image?.name || "Choose Image"}</span>
            </label>
          ) : (
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
          <label className="col-span-2 flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={newDish.special}
              onChange={(e) => setNewDish({ ...newDish, special: e.target.checked, category: "" })}
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

      {/* Dishes Lists */}
      {specialDishes.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Special Dishes</h3>
          <div className="grid gap-4">{specialDishes.map(renderSpecialDishCard)}</div>
        </div>
      )}

      {normalDishes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Menu Dishes</h3>
          <div className="grid gap-4">{normalDishes.map(renderMenuDishCard)}</div>
        </div>
      )}
    </div>
  );
}
