import { Outlet } from 'react-router-dom';
import image from '../../src/assets/laptopimage.png'
import './Login.css';

// Section Component with Testimonial
function Section() {
  return (
    <div className="testimonial-section" style={{ backgroundImage: `url(${image})` }}>
      {/* Nucleus Logo */}
      <div className="logo-container"> 
        <svg className="logo-svg" viewBox="0 0 32 32">
          <circle cx="8" cy="8" r="3.5" fill="white" />
          <circle cx="24" cy="8" r="3.5" fill="white" />
          <circle cx="8" cy="24" r="3.5" fill="white" />
          <circle cx="24" cy="24" r="3.5" fill="white" />
        </svg>
        <span className="logo-text">Pothole-Detection</span>
      </div>

      {/* Testimonial at bottom */}
      <div className="testimonial-container">
        <p className="testimonial-text">
          "Simply detect all the things that you want in at road."
        </p>
        <p className="author-name">Prime team</p>
        <p className="author-title">Team of the feature and innovation</p>
      </div>
    </div>
  );
}

// Main Layout Component
export default function Login() {
  return (
    <>
      <section className='Bigcontainer'>
        <div className="LoginContainer">
          <Section />
          <Outlet />
        </div>
      </section>
    </>
  );
}