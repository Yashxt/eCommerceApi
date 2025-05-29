import React from 'react';
import PropTypes from 'prop-types';

const CategoryForm = ({ handleSubmit, value, setValue, photo, setPhoto, photoPreviewUrl }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Category Name Input Field */}
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>

        {/* Photo Input Field */}
        {setPhoto && (
          <div className="mb-3">
            <label htmlFor="categoryPhoto" className="form-label">Category Photo</label>
            <input
              type="file"
              className="form-control"
              id="categoryPhoto"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPhoto(e.target.files[0]);
                } else {
                  setPhoto(null);
                }
              }}
            />
          </div>
        )}

        {/* Image Preview */}
        {photoPreviewUrl && (
          <div className="mb-3">
            <img
              src={photoPreviewUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: '200px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '5px',
              }}
              className="img-thumbnail"
            />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  photo: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  setPhoto: PropTypes.func,
  photoPreviewUrl: PropTypes.string,
};

export default CategoryForm;
