import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-600 via-pink-600 to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-3 flex items-center gap-2">
           
             Bludly
          </h2>
          <p className="text-sm opacity-90">
            Connecting blood donors with those in need.  
            One donation can save multiple lives.
          </p>

          <div className="flex gap-4 mt-5">
            <a className="hover:text-black transition"><FaFacebookF /></a>
            <a className="hover:text-black transition"><FaTwitter /></a>
            <a className="hover:text-black transition"><FaInstagram /></a>
            <a className="hover:text-black transition"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/donation-requests" className="hover:underline">Donation Requests</Link></li>
            <li><Link to="/fundings" className="hover:underline">Fundings</Link></li>
            <li><Link to="/blogs" className="hover:underline">Blogs</Link></li>
          </ul>
        </div>

        {/* Important */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Important</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
          <p className="text-sm mb-4 opacity-90">
            Get blood donation updates & life-saving news.
          </p>

          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-transparent text-white placeholder-white border border-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-white hover:text-red-600 transition px-4 py-2 rounded font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/30 text-center py-4 text-sm">
        © {new Date().getFullYear()} Bludly. Made with{" "}
        <FaHeart className="inline text-pink-200" /> for humanity.
      </div>
    </footer>
  );
};

export default Footer;
