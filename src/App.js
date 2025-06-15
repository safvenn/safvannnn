import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Success from './pages/Success';
import EditProduct from './pages/admin/EditProduct';
import AddProduct from './pages/admin/AddProduct';
import UserProfile from './pages/UserProfile';
import Header from './pages/Header';
import './styles.css';
import  Payment  from './pages/Payment'
import ThemeToggle from './components/ThemeToggle';
import ProductsList from './pages/admin/productsList';
import UsersPage from './pages/admin/UsersPage';
import OrdersPage from './pages/admin/OrdersPage';
function App() {
  return (
    <BrowserRouter>
        {/* Add a header or top bar with the theme toggle */}
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
        background: "#f5f5f5"
      }}>
        <ThemeToggle />
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        
        
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<Success />} />
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/admin/add-product" element={<AddProduct />} />
<Route path="/admin/edit-product/:id" element={<EditProduct />} />
<Route path="/admin/productsList" element={<ProductsList />} />
<Route path="/profile" element={<UserProfile />} />
<Route path="/admin/userspage" element={<UsersPage />} />
<Route path="/admin/orderspage" element={<OrdersPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;