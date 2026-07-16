import logo from "@/assets/images/logo.png";
import social from "@/assets/images/social.png";
import payment from "@/assets/images/payment.png";
export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] text-gray-600 px-4 pt-10 lg:px-24 lg:pt-16 mt-10 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-200">
        <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-5 lg:mr-8">
          <div className="flex items-center">
            <img src={logo} className="h-6 sm:h-8" alt="LDC Logo" />
          </div>
          <p className="text-sm leading-relaxed text-gray-500">
            We have clothes that suits your style and which you're proud to
            wear. From women to men.
          </p>
          <img src={social} alt="Social Media" className="w-40 h-auto" />
        </div>

        <div className="flex flex-col gap-4">
          <h4 className=" font-medium tracking-widest text-black uppercase text-sm">
            Company
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
            <li>
              <a href="#" className="hover:text-black transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Career
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-medium tracking-widest text-black uppercase text-sm">
            Help
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
            <li>
              <a href="#" className="hover:text-black transition">
                Customer Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Delivery Details
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* FAQ Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium tracking-widest text-black uppercase text-sm">
            FAQ
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
            <li>
              <a href="#" className="hover:text-black transition">
                Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Manage Deliveries
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Payments
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
          <h4 className="font-medium tracking-widest text-black uppercase text-sm">
            Resources
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
            <li>
              <a href="#" className="hover:text-black transition">
                Free eBook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Development Tutorial
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                How to - Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black transition">
                Youtube Playlist
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 flex flex-col gap-4 sm:flex-row justify-between items-center text-xs text-gray-400">
        <p className="text-center sm:text-left">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
        <img src={payment} alt="Payment Methods" className="w-60 h-auto" />
      </div>
    </footer>
  );
}
