import {useState,useEffect} from 'react'
import LayoutTemp from '../../components/layout/LayoutTemp'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from "react-hot-toast"
import {Select} from "antd"
import { useAuth } from '../../context/Auth'
import { useNavigate } from 'react-router-dom'
// we can create a drop down menu 
const {Option} = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const[categories,setCategories]=useState([]);
  const[name,setName] =useState("");
  const[description,setDescription] =useState("");
  const[price,setPrice] =useState("");
  const[quantity,setQuantity] =useState("");
  const[shipping,setShipping] =useState("");
  const[category,setCategory] =useState("");
  const[photo,setPhoto] =useState("");
  const{auth,setAuth}=useAuth()
  // get all categories
  const getAllCategories = async()=>{
    try{
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
    
    }
    catch(error){
console.log(error);
toast.error("something went wrong while getting category");
    }
  }
  useEffect(()=>{
    getAllCategories();
 },
 []);
 const handleCreate = async(e)=>{
   e.preventDefault()
   const productData = new FormData();
productData.append("name", name);
productData.append("description", description);
productData.append("price", price);
productData.append("quantity", quantity);
productData.append("photo", photo);
productData.append("category", category);

try {
  const response = await fetch("http://localhost:9090/api/v1/product/create-product", {
    method: "POST",
    body: productData, // FormData is sent directly without JSON.stringify
    headers: {
      // "Content-Type": "multipart/form-data" is not needed for FormData in fetch
      "Authorization": `Bearer ${auth?.token}`   
    },
  });

  const data = await response.json();

  if (data?.success) {
    toast.success("Product Created Successfully");
    navigate("/dashboard/admin/products");
  } else {
    toast.error(data?.message);
  }
} catch (error) {
  console.error("Error creating product:", error);
  toast.error("Something went wrong while creating the product.");
}
 }
  return (
    <LayoutTemp title = {"Dashboard-CreateProduct"}> 
      <div className="container-fluid m-3 p-3">
        <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
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