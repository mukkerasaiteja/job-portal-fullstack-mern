import { Link } from "react-router-dom";
import { LuGithub } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-foreground mt-16">
      <div
        className="
          max-w-7xl mx-auto px-6 py-10 
          grid grid-cols-1 md:grid-cols-3 gap-10 
          text-center md:text-left
        "
      >
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-semibold">
            Job<span className="text-[#F83002]">Portal</span>
          </h2>
          <p className="text-sm mt-2 text-muted-foreground max-w-xs">
            Helping you find the right job and build your career.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#F83002] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="hover:text-[#F83002] transition-colors"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="hover:text-[#F83002] transition-colors"
              >
                Browse
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-[#F83002] transition-colors"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-lg mb-3">Connect</h3>
          <div className="flex items-center gap-4">
            <Link
              to="https://github.com/mukkerasaiteja"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
            >
              <LuGithub className="size-5" />
            </Link>

            <Link
              to="https://x.com/mukkerasaiteja"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
            >
              <FaXTwitter className="size-5" />
            </Link>

            <Link
              to="https://www.linkedin.com/in/sai-teja-mukkera-14a608149/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
            >
              <FaLinkedin className="size-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom credits */}
      <div className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        Made with ❤️ by{" "}
        <span className="text-primary font-medium">Sai Teja</span>
      </div>
    </footer>
  );
}

export default Footer;
