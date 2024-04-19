
export const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <p className="text-sm">&copy; 2024 Nombre de la Empresa. Todos los derechos reservados.</p>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-pink-500 transition duration-300">Acerca de</a></li>
          <li><a href="#" className="hover:text-pink-500 transition duration-300">Servicios</a></li>
          <li><a href="#" className="hover:text-pink-500 transition duration-300">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};
