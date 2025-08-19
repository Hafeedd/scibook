import { useNavigate } from "react-router";

const PATHS = [
  { path: "/products", name: "products" },
  { path: "/inventory", name: "inventory" },
  { path: "/customers", name: "customers" },
];

export const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="h-screen text-white bg-gray-800 w-[250px] pt-4">
      <div className="w-full text-center shadow-[0px_8px_5px_-5px_rgba(0,0,0,0.2)] pb-4">
        <span className="text-3xl">SCI BOOKS</span>
      </div>

      <div className="flex flex-col ps-4   pt-10 pe-4 gap-5">
        {PATHS.map((data, ind) => {
          return (
            <div
              onClick={() => handleNavigate(data.path)}
              className="p-3 bg-gray-200 text-gray-900 font-semibold rounded cursor-pointer"
            >
              <span className="text-xl uppercase">{data.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
