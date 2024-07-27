import { useState } from "react";
import { IDriver } from "../../interfaces/common";
import { useAssignmentStore } from "../../stores/assignments.store";
import useDriversStore from "../../stores/data.store";
import Avatar from "../Avatar/Avatar";

function Drivers() {
  const drivers = useDriversStore((state) => state.drivers);
  const assignments = useAssignmentStore((state) => state.assignments);

  const [expandedDriverId, setExpandedDriverId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleAccordion = (driverId: number) => {
    setExpandedDriverId(expandedDriverId === driverId ? null : driverId);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {!isVisible && (
        <div
          className="fixed top-[12%] right-10   px-4 py-2   bg-slate-900 p-5 opacity-80 rounded-md shadow-2xl shadow-black text-white cursor-pointer"
          onClick={toggleVisibility}
        >
          <span>Mostrar choferes</span>
        </div>
      )}
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } absolute top-[10%] left-1/2 transform -translate-x-1/2  lg:left-auto lg:transform-none lg:right-10 lg:w-1/4 h-3/4 w-[90%] bg-slate-900 p-5 opacity-80 rounded-md shadow-2xl shadow-black text-white`}
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-bold mb-4">Choferes</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-8 cursor-pointer"
            onClick={toggleVisibility}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <div>
          <ul>
            {drivers.map((driver: IDriver, index: number) => {
              const assignmentsDriver = assignments.filter(
                (x) => x.driver.id === driver.id
              );

              return (
                <li key={driver.id} className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar url={driver.avatar} />
                      <div className="ml-4">
                        <p className="font-bold">{`${driver.firstName} ${driver.lastName}`}</p>

                        {assignmentsDriver && assignmentsDriver.length > 0 ? (
                          <p>Entregas asignadas: {assignmentsDriver.length}</p>
                        ) : (
                          <p>Sin entregas asignadas</p>
                        )}
                      </div>
                    </div>
                    <div className="text-yellow-400">
                      {"★".repeat(driver.reputation) +
                        "☆".repeat(5 - driver.reputation)}
                    </div>
                    {assignmentsDriver && assignmentsDriver.length > 0 && (
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
                        {assignmentsDriver?.map((assignment, index) => (
                          <li key={index}>{assignment.delivery.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Drivers;
