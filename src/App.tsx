import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <Navbar />
      <Hero />
      <Services />
    </div>
  )
}
