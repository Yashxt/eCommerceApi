
import LayoutTemp from '../components/layout/LayoutTemp'
 
 const About = () => {
   return (
    <LayoutTemp title = {"About us - Ecommerce App"}>
          <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/Image/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
     </LayoutTemp>
   )
 }
 
 export default About