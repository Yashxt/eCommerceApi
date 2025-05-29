import LayoutTemp from '../../components/layout/LayoutTemp';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/Auth';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [categoryPhoto, setCategoryPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const { auth } = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  // Generate preview for photo
  useEffect(() => {
    if (categoryPhoto) {
      const url = URL.createObjectURL(categoryPhoto);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPhotoPreview(null);
    }
  }, [categoryPhoto]);

  // Handle create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (categoryPhoto) {
        formData.append('photo', categoryPhoto);
      }

      const response = await fetch('http://localhost:9090/api/v1/category/create-category', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data?.success) {
        toast.success(`${name} is created`);
        setName('');
        setCategoryPhoto(null);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in input form');
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/v1/category/get-category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong while getting categories');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:9090/api/v1/category/update-category/${selected._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({ name: updatedName }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong while updating');
    }
  };

  const handleDelete = async (pId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1/category/delete-category/${pId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Category is deleted');
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong while deleting');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <LayoutTemp title="Dashboard - CreateCategory">
      <div className="container-fluid m-3 p-3">
        <h1>All Users</h1>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                photo={categoryPhoto}
                setPhoto={setCategoryPhoto}
                photoPreviewUrl={photoPreview}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn btn-danger ms-2" onClick={() => handleDelete(c._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </LayoutTemp>
  );
};

export default CreateCategory;
