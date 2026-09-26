import "./styles/About.css";
import { PROFILE_DATA } from "../data/profileData";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">{PROFILE_DATA.about}</p>
      </div>
    </div>
  );
};

export default About;
