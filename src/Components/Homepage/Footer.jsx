import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-heading font-black tracking-tighter text-red-600">
            Bludly.
          </h2>
          <p className="text-base leading-relaxed text-base-content/70 font-body">
            Connecting blood donors with those in need. One donation can save
            multiple lives. Join our community of lifesavers.
          </p>

          <div className="flex gap-4">
            {[
              {
                icon: <FaFacebookF />,
                link: "https://www.facebook.com/mohammadshaharearhossainjony/",
              },
              { icon: <FaTwitter />, link: "https://x.com/shaharear_jony" },
              {
                icon: <FaInstagram />,
                link: "https://www.instagram.com/mohammadshaharearhossainjony/",
              },
              {
                icon: <FaLinkedinIn />,
                link: "https://www.linkedin.com/in/shaharearhossainjony",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-base-200 dark:bg-zinc-800 text-base-content/70 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading font-bold text-lg text-base-content mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm font-body">
            <li>
              <Link
                to="/"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/donation-requests"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                Donation Requests
              </Link>
            </li>
            <li>
              <Link
                to="/create-payment-checkout"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                Fundings
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-heading font-bold text-lg text-base-content mb-6">
            Support
          </h3>
          <ul className="space-y-3 text-sm font-body">
            <li>
              <Link
                to="/about"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-base-content/60 hover:text-red-600 transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-heading font-bold text-lg text-base-content mb-6">
            Stay Updated
          </h3>
          <p className="text-sm mb-6 text-base-content/70 font-body leading-relaxed">
            Get blood donation updates and news directly to your inbox.
          </p>

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) =>{
               e.preventDefault()
               e.target.reset()
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-xl bg-base-200 dark:bg-zinc-800 border-transparent text-base-content placeholder:text-base-content/40 focus:ring-2 focus:ring-red-600/20 focus:border-red-600 outline-none transition-all text-sm"
              required
            />
            <button
              onClick={() =>
              {
                Swal.fire({
                  title: "Good job!",
                  text: "You subscribed for Newsletter!",
                  icon: "success",
                })
                
              }
              }
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white transition-all px-4 py-3 rounded-xl font-bold shadow-lg shadow-red-500/10 active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-100 dark:border-white/5 py-8 text-center">
        <p className="text-sm font-body text-base-content/50 flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-red-600">Bludly</span>. Developed by{" "}
          <a
            className="underline hover:text-blue-600"
            href={"https://shaharear-portfolio.vercel.app/"}
            target="_blank"
          >
            Shaharear Hossain
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
