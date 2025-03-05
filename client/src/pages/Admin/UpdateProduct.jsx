import {useState,useEffect} from 'react'
import LayoutTemp from '../../components/layout/LayoutTemp'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from "react-hot-toast"
import {Select} from "antd"
import { useAuth } from '../../context/Auth'
import { useNavigate,useParams } from 'react-router-dom'
// we can create a drop down menu 
const {Option} = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const[categories,setCategories]=useState([]);
  const[name,setName] =useState("");
  const[description,setDescription] =useState("");
  const[price,setPrice] =useState("");
  const[quantity,setQuantity] =useState("");
  const[shipping,setShipping] =useState("");
  const[category,setCategory] =useState("");
  const[photo,setPhoto] =useState("");
  const{auth,setAuth}=useAuth()
  const [id, setId] = useState("");
  // get all categories
  const getSingleProduct = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/v1/product/get-product/${params.slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth?.token}`  
        },
      });
  
      const data = await response.json();
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);
  
  // Get all categories
  const getAllCategory = async () => {
    try {
      const response = await fetch("http://localhost:9090/api/v1/category/get-category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth?.token}`  
        },
      });
  
      const data = await response.json();
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  
  useEffect(() => {
    getAllCategory();
  }, []);
  
  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const response = await fetch(`http://localhost:9090/api/v1/product/update-product/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${auth?.token}`, // Pass JWT token
        },
        body: productData, // FormData automatically sets the Content-Type
      });
      
  
      const data = await response.json();
  
      if (data?.success) {
         toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products", { replace: true });
        ;
      } else {
       toast.error(data?.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  // Delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product?");
      if (!answer) return;
  
      const response = await fetch(`http://localhost:9090/api/v1/product/delete-product/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth?.token}`,
        },
      });
  
      const data = await response.json();
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  return (
    <LayoutTemp title = {"Dashboard-CreateProduct"}> 
   <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:9090/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</LayoutTemp>
  )
}

export default CreateProduct