// import Navbar from '@components/Navbar'
import Signup from '@pages/Signup'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App