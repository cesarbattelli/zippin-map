import { useState } from "react";
import { IDriver } from "../../interfaces/common";
import Avatar from "../Avatar/Avatar";

function Drivers() {
  const drivers: IDriver[] = [
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      reputation: 4,
      avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=JuanP",
    },
    {
      id: 2,

      firstName: "María",
      lastName: "García",
      reputation: 5,
      avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=MariaG",
      orders: ["Pedido 1", "Pedido 2"],
    },
    {
      id: 3,

      firstName: "Carlos",
      lastName: "Sánchez",
      reputation: 3,
      avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=CarlosS",
      orders: ["Pedido 1", "Pedido 2"],
    },
    {
      id: 4,

      firstName: "Ana",
      lastName: "Martínez",
      reputation: 4,
      avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=AnaM",
      orders: ["Pedido 1", "Pedido 2"],
    },
    {
      id: 5,

      firstName: "Luis",
      lastName: "Rodríguez",
      reputation: 2,
      avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=LuisR",
      orders: ["Pedido 1", "Pedido 2"],
    },
  ];

  const [expandedDriverId, setExpandedDriverId] = useState<number | null>(null);

  const toggleAccordion = (driverId: number) => {
    setExpandedDriverId(expandedDriverId === driverId ? null : driverId);
  };

  return (
    <div className="absolute top-48 right-10 w-1/4 h-3/4  bg-slate-900 p-5 opacity-80 rounded-md shadow-2xl shadow-black text-white">
      <h1 className="text-xl font-bold mb-4">Choferes</h1>

      <div>
        <ul>
          {drivers.map((driver: IDriver, index: number) => (
            <li key={driver.id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar url={driver.avatar} />
                  <div className="ml-4">
                    <p className="font-bold">{`${driver.firstName} ${driver.lastName}`}</p>

                    {driver.orders && driver.orders.length > 0 ? (
                      <p>Entregas asignados: {driver.orders.length}</p>
                    ) : (
                      <p>Sin entregas asignadas</p>
                    )}
                  </div>
                </div>
                <div className="text-yellow-400">
                  {"★".repeat(driver.reputation) +
                    "☆".repeat(5 - driver.reputation)}
                </div>
                {driver.orders && driver.orders.length > 0 && (
                  <button
                    className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => toggleAccordion(driver.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 4a8 8 0 00-6.32 12.906l-3.138 3.138a1 1 0 101.414 1.414l3.137-3.137A8 8 0 108 4zm0 2a6 6 0 110 12 6 6 0 010-12z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {expandedDriverId === driver.id && (
                <div className="mt-4 bg-gray-800 p-3 rounded-md">
                  <h2 className="font-bold mb-2">Pedidos Asignados:</h2>
                  <ul>
                    {driver.orders?.map((order, index) => (
                      <li key={index}>{order}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Drivers;
