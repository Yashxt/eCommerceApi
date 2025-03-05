import PropTypes from "prop-types";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

//  PropTypes for validation
CategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired, // handleSubmit must be a function
  value: PropTypes.string.isRequired, // value must be a string
  setValue: PropTypes.func.isRequired, // setValue must be a function
};

export default CategoryForm;
