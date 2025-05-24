
import {Link} from "react-router-dom"
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8s.01 2.444.048 3.297c.04.852.174 1.433.372 1.942.203.507.47.95.923 1.417.453.453.896.72 1.417.923.508.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.372a3.9 3.9 0 0 0 1.417-.923c.453-.453.72-.896.923-1.417.198-.508.333-1.09.372-1.942.03-3.297.048-3.555.048-5.297s-.01-2.445-.048-3.298c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24 0.42c-.508-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 1.577c2.115 0 2.378.01 3.218.048.796.037 1.248.163 1.57.298a2.536 2.536 0 0 1 .917.653 2.536 2.536 0 0 1 .653.917c.135.322.261.774.298 1.57.038.84.048 1.103.048 3.218s-.01 2.378-.048 3.218c-.037.796-.163 1.248-.298 1.57a2.536 2.536 0 0 1-.653.917 2.536 2.536 0 0 1-.917.653c-.322.135-.774.261-1.57.298-.84.038-1.103.048-3.218.048s-2.378-.01-3.218-.048c-.796-.037-1.248-.163-1.57-.298a2.536 2.536 0 0 1-.917-.653 2.536 2.536 0 0 1-.653-.917c-.135-.322-.261-.774-.298-1.57-.038-.84-.048-1.103-.048-3.218s.01-2.378.048-3.218c.037-.796.163-1.248.298-1.57a2.536 2.536 0 0 1 .653-.917 2.536 2.536 0 0 1 .917-.653c.322-.135.774-.261 1.57-.298.84-.038 1.103-.048 3.218-.048zm0 3.704a4.323 4.323 0 1 0 0 8.646 4.323 4.323 0 0 0 0-8.646zm0 1.577a2.746 2.746 0 1 1 0 5.492 2.746 2.746 0 0 1 0-5.492zm4.561-3.791a1.019 1.019 0 1 0 0 2.038 1.019 1.019 0 0 0 0-2.038z"/>
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.5V16c3.824-.604 6.75-3.934 6.75-7.951"/>
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q0-.232-.006-.464A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.025 4.343A3.3 3.3 0 0 1 .64 6.572v.048a3.29 3.29 0 0 0 2.625 3.221 3.29 3.29 0 0 1-.876.123 3.49 3.49 0 0 1-.65-.064 3.285 3.285 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.528a6.7 6.7 0 0 1-.78-.045 9.32 9.32 0 0 0 5.026 1.459"/>
    </svg>
);

const Footer = () => {
  return (
     <footer className="bg-light  text-dark pt-5 pb-3"> {/* bg-dark for dark background, text-white for text color, pt-5 pb-3 for padding */}
            <div className="container">
                <div className="row justify-content-center"> {/* justify-content-center to center columns if they don't fill width */}

                    {/* About Column */}
                    <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 text-start"> {/* Responsive column sizing, mb for margin-bottom */}
                        <h5 className="mb-3 fw-bold">About</h5> {/* mb-3 for margin-bottom, fw-bold for bold font */}
                        <ul className="list-unstyled"> {/* list-unstyled removes bullet points */}
                            <li><Link to="/about" className="text-black-50 text-decoration-none hover-white">About Us</Link></li> {/* text-white-50 for lighter text, text-decoration-none for no underline */}
                            <li><Link to="/careers" className="text-black-50 text-decoration-none hover-white">Careers</Link></li>
                            <li><Link to="/press" className="text-black-50 text-decoration-none hover-white">Press</Link></li>
                        </ul>
                    </div>

                    {/* Help Column */}
                    <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 text-start">
                        <h5 className="mb-3 fw-bold">Help</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/shipping" className="text-black-50 text-decoration-none hover-white">Shipping</Link></li>
                            <li><Link to="/returns" className="text-black-50 text-decoration-none hover-white">Returns</Link></li>
                            <li><Link to="/contact" className="text-black-50 text-decoration-none hover-white">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 text-start">
                        <h5 className="mb-3 fw-bold">Legal</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/privacy" className="text-black-50 text-decoration-none hover-white">Privacy</Link></li>
                            <li><Link to="/terms" className="text-black-50 text-decoration-none hover-white">Terms</Link></li>
                            <li><Link to="/accessibility" className="text-black-50 text-decoration-none hover-white">Accessibility</Link></li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 text-start">
                        <h5 className="mb-3 fw-bold">Social</h5>
                        <div className="d-flex justify-content-start"> {/* d-flex for horizontal alignment of icons */}
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <InstagramIcon />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FacebookIcon />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>

                </div> {/* End of row */}

                <hr className="my-4 border-secondary" /> {/* Horizontal line, my-4 for margin-y, border-secondary for lighter color */}

                {/* Copyright */}
                <div className="row">
                    <div className="col-12 text-center text-white-50"> {/* text-center to center, text-white-50 for lighter text */}
                        <p className="mb-0">&copy; 2024 SSENSE. All rights reserved.</p>
                    </div>
                </div>

            </div> {/* End of container */}
        </footer>
  )
}

export default Footer