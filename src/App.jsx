import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, User, ArrowRight } from 'lucide-react';
import * as THREE from 'three';
import './index.css';

// Elegant 3D Glass Pedestal / Abstract Shapes
function GlassSculpture() {
  const groupRef = useRef();
  
  // Create beautiful frosted/fluted glass material
  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.95, // Glass effect
    thickness: 2,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }), []);

  // Matte black accent material
  const matteMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.8,
    metalness: 0.2
  }), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Central Glass Pedestal */}
        <mesh position={[0, 0, 0]} material={glassMaterial}>
          <cylinderGeometry args={[1.5, 1.5, 4, 32]} />
        </mesh>
        
        {/* Floating Ring Accent */}
        <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 4, 0, 0]} material={matteMaterial}>
          <torusGeometry args={[2.2, 0.05, 16, 64]} />
        </mesh>
        
        {/* Floating Sphere Inside */}
        <mesh position={[0, 0, 0]} material={matteMaterial}>
          <sphereGeometry args={[0.5, 32, 32]} />
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
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, 5, -10]} intensity={0.5} color="#d4af37" />
          <Environment preset="studio" />
          
          <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0.1, 0, 0]} polar={[-Math.PI / 4, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
            <GlassSculpture />
          </PresentationControls>
          
          <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000000" />
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
    { name: "Structured Wool Coat", price: "$450.00" },
    { name: "Silk Crepe Blouse", price: "$185.00" },
    { name: "Leather Crossbody", price: "$320.00" },
    { name: "Tailored Trousers", price: "$210.00" }
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
        {/* Placeholder for editorial image */}
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
