import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <Navbar />
      <Hero />
    </div>
  )
}
