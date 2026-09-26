import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* BS Computer Science — UET Lahore (Ongoing) */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BS Computer Science</h4>
                <h5>University of Engineering and Technology (UET), Lahore</h5>
              </div>
            </div>
            <p>
              BS Computer Science student at the University of Engineering and
              Technology (UET), Lahore, developing a strong foundation in
              computer science, programming, algorithms, databases, and
              artificial intelligence.
            </p>
          </div>

          {/* NAVTTC Training — Machine Learning & Agentic AI */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>NAVTTC Training — Machine Learning &amp; Agentic AI</h4>
                <h5>TecStem Technology &amp; CyberPulse</h5>
              </div>
            </div>
            <p>
              Completed NAVTTC technical training at TecStem Technology and
              CyberPulse, focusing on Machine Learning and Agentic AI concepts
              and practical development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
