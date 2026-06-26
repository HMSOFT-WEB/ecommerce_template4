import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, User, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import './index.css';

// Import images directly so Vite bundles them correctly
import prod1 from './assets/prod1.png';
import prod2 from './assets/prod2.png';

// Ultra-High Quality 3D Luxury Crystal Pedestal
function LuxuryCrystal() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {/* Core Crystal Geometry */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.8, 2]} />
          <MeshTransmissionMaterial 
            backside
            backsideThickness={1}
            thickness={2}
            roughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.05}
            anisotropy={0.5}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationColor="#ffffff"
            attenuationDistance={1}
          />
        </mesh>
        
        {/* Inner Gold Core */}
        <mesh>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
        </mesh>

        {/* Orbiting Black Rings */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, Math.PI / 2, 0]}>
          <torusGeometry args={[2.8, 0.01, 16, 100]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0} />
        </mesh>
      </Float>
    </group>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <img src="./logo.png" alt="HMSOFT LUXE" onError={(e) => {
            e.target.style.display='none';
            e.target.insertAdjacentHTML('afterend', '<span style="font-family: \'Playfair Display\', serif; font-size: 1.5rem; font-weight: 600; letter-spacing: 0.05em;">HMSOFT</span>');
          }} />
        </div>
        
        <nav className="nav-links">
          <a href="#">New Arrivals</a>
          <a href="#">Women</a>
          <a href="#">Men</a>
          <a href="#">Beauty</a>
          <a href="#">Home</a>
        </nav>
        
        <div className="nav-icons">
          <button className="nav-icon-btn"><Search size={20} strokeWidth={1.5} /></button>
          <button className="nav-icon-btn"><User size={20} strokeWidth={1.5} /></button>
          <button className="nav-icon-btn"><ShoppingBag size={20} strokeWidth={1.5} /></button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-3d-bg">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} />
          <directionalLight position={[-10, 5, -10]} intensity={1} color="#d4af37" />
          <Environment preset="city" />
          
          <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0.1, 0, 0]} polar={[-Math.PI / 4, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <LuxuryCrystal />
          </PresentationControls>
          
          <ContactShadows position={[0, -3.5, 0]} opacity={0.8} scale={10} blur={2.5} far={4} color="#000000" />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          </EffectComposer>
        </Canvas>
      </div>
      
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Elevate Your Lifestyle
        </motion.h1>
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <button className="btn-primary">Shop New Arrivals</button>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const products = [
    { name: "Structured Wool Coat", price: "$450.00", image: prod1 },
    { name: "Silk Crepe Blouse", price: "$185.00", image: prod2 },
    { name: "Leather Crossbody", price: "$320.00", image: prod1 },
    { name: "Tailored Trousers", price: "$210.00", image: prod2 }
  ];

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2 className="section-title">New Arrivals</h2>
        <a href="#" className="view-all">View All</a>
      </div>
      
      <div className="product-grid">
        {products.map((product, idx) => (
          <motion.div 
            className="product-card" 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-price">{product.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CuratedCollection() {
  return (
    <section className="collection-banner">
      <div className="collection-image">
        <img src={prod1} alt="Editorial" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="collection-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The Summer Edit
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover curated silhouettes crafted from lightweight linen and breathable silks. Designed for effortless elegance under the sun.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="btn-secondary btn-white">Explore Collection</button>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">HMSOFT</div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-gray-dark)', marginTop: '0.5rem' }}>
            Curating the finest contemporary fashion and lifestyle essentials.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="ENTER YOUR EMAIL" />
            <button type="button">Subscribe <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }}/></button>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Stores</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Sustainability</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div>© 2026 HMSOFT. All rights reserved.</div>
        <div className="social-links">
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
          <a href="#">TikTok</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <CuratedCollection />
      </main>
      <Footer />
    </>
  );
}

export default App;
