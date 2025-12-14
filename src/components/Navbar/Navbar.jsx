import React, { useState } from "react";
import Logo from "../../assets/logo.png";

const navbarLinks = [
  {
    id: 1,
    title: "Inicio",
    Link: "/",
  },
  {
    id: 2,
    title: "Nosotros",
    Link: "#",
  },
  {
    id: 3,
    title: "Contacto",
    Link: "#",
  },
  {
    id: 4,
    title: "Soporte",
    Link: "#",
  },
];

const navbarRedes = [
  {
    id: 1,
    title: "Instagram",
    Link: "https://www.instagram.com/blind_zz/",
    icon: "bi bi-instagram",
  },

  {
    id: 2,
    title: "Tiktok",
    Link: "https://www.tiktok.com/@blindowl07",
    icon: "bi bi-tiktok",
  },

  {
    id: 3,
    title: "Linkedin",
    Link: "https://www.linkedin.com/in/bryan-quispe-palma-a9701231a/",
    icon: "bi bi-linkedin",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="fixed top-0 left-0 bg-purple-900/30 w-full  backdrop-blur-md z-50">
      <section className="flex justify-between items-center sm:px-12 sm:py-6 px-4 py-3">
        <figure>
          <img src={Logo} alt="Imagen descriptiva" className="w-[100px]" />
        </figure>

        <button onClick={toggleMenu} className="md:hidden text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {/* Nav Desktop */}
        <nav className="hidden md:block">
          <ul className="flex sm:sp-x-8 space-x-4">
            {navbarLinks.map((link) => (
              <li key="{link.id}">
                <a
                  className="text-white sm:text-lg text-sm hover:text-sky-200 transition-transform hover:scale-110 transform inline-block duration-300"
                  href={link.Link}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Nav Redes Sociales */}
        <aside className="hidden md:block">
          <ul className="flex space-x-4">
            {navbarRedes.map((link) => (
              <li key="{link.id}">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform duration-300 transform hover:scale-125"
                  href={link.Link}
                >
                  <i
                    className={`${link.icon} sm:text-2xl text-lg text-white hover:text-sky-200 transition-all
                    sm:text-2xl
                    text-lg
                    text-white
                    hover:text-sky-200
                    transition-all
                    duration-300`}
                  ></i>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
      {/* Menu mobile */}

      <div
        className={`md:hidden absolute w-full bg-purple-950 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col px-4 py-2">
          {navbarLinks.map((link) => (
            <li className="py-2 text-center" key="{link.id}">
              <a
                className="text-white hover:text-sky-200
                "
                href={link.Link}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <ul className="flex space-x-4 px-4 py-2 border-t border-purple-700 justify-center">
          {navbarRedes.map((link) => (
            <li key="{link.id}">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                href={link.Link}
                onClick={() => setIsOpen(false)}
              >
                <i
                  className={`${link.icon} text-lg text-white hover:text-sky-200`}
                ></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
