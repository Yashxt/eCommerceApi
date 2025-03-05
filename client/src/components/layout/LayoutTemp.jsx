import Headder from "./Headder";
import Footer from "./Footer";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";
import {Toaster } from "react-hot-toast"
const LayoutTemp = ({children,title,description,keyword,author}) => {
  return (
    <div>
            <Helmet>
                <meta charSet="utf-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keyword} />
  <meta name="author" content={author} />
   <title>{title}</title>
            </Helmet>
      <Headder />
      <main style={{ minHeight: "70vh" }}>
        <Toaster/>
        {children}</main>
      <Footer />
    </div>
  );
};
LayoutTemp.defaultProps = {
  title :"Ecommerce App",
  description:"mern stack project",
  keyword:"mern,react,node,mongodb",
  author:"Yash Joshi"
}
LayoutTemp.propTypes = {
  children: PropTypes.node, // Validate children as a valid React node
};
export default LayoutTemp;
