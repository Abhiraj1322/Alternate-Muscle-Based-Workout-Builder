import { Outlet, Link } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 bg-[#1c1c1e]">
        <FaSearch className="text-xl" />
        <h1 className="text-xl font-bold">ALTERNATE</h1>
        <FaUser className="text-xl" />
      </nav>
      
      <div className="flex justify-center gap-6 py-4 bg-[#121212]">
        <Link to="/" className="hover:underline">Homepage</Link>
        <Link to="/explore" className="hover:underline">Explore</Link>
        <Link to="/myworkout" className="hover:underline">My Workout</Link>
      </div>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;