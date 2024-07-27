import { useState } from "react";
import { IDriver } from "../../interfaces/common";
import { useAssignmentStore } from "../../stores/assignments.store";
import useDriversStore from "../../stores/data.store";
import DriverItem from "../DriverItem/DriverItem";

function DriverList() {
  const drivers = useDriversStore((state) => state.drivers);
  const assignments = useAssignmentStore((state) => state.assignments);
  const deleteAssignment = useAssignmentStore(
    (state) => state.deleteAssignment,
  );

  const [expandedDriverId, setExpandedDriverId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleAccordion = (driverId: number) => {
    setExpandedDriverId(expandedDriverId === driverId ? null : driverId);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    deleteAssignment(assignmentId);
  };

  return (
    <>
      {!isVisible && (
        <div
          className="fixed right-10 top-[12%] cursor-pointer rounded-md bg-slate-900 p-5 px-4 py-2 text-white opacity-80 shadow-2xl shadow-black"
          onClick={toggleVisibility}
        >
          <span>Mostrar choferes</span>
        </div>
      )}
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } absolute left-1/2 top-[10%] w-[90%] -translate-x-1/2 transform rounded-md bg-slate-900 p-5 text-white opacity-80 shadow-2xl shadow-black lg:left-auto lg:right-10 lg:w-1/4 lg:transform-none`}
      >
        <div className="flex justify-between">
          <h1 className="mb-4 text-xl font-bold">Choferes</h1>
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
            {drivers.map((driver: IDriver) => {
              const assignmentsDriver = assignments.filter(
                (x) => x.driver.id === driver.id,
              );

              return (
                <DriverItem
                  key={driver.id}
                  driver={driver}
                  assignmentsDriver={assignmentsDriver}
                  expandedDriverId={expandedDriverId}
                  toggleAccordion={toggleAccordion}
                  onDeleteAssignment={handleDeleteAssignment}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DriverList;
