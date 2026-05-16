import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FloatingContact from './components/FloatingContact'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <Navbar />
      <Hero />
      <Services />
      <FloatingContact />
    </div>
  )
}
