import { IDriver, IAssignment } from "../../interfaces/common";
import Avatar from "../Avatar/Avatar";

interface DriverItemProps {
  driver: IDriver;
  assignmentsDriver: IAssignment[];
  expandedDriverId: number | null;
  toggleAccordion: (driverId: number) => void;
  onDeleteAssignment: (assignmentId: string) => void;
}

const DriverItem: React.FC<DriverItemProps> = ({
  driver,
  assignmentsDriver,
  expandedDriverId,
  toggleAccordion,
  onDeleteAssignment,
}) => {
  return (
    <li key={driver.id} className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar url={driver.avatar} />
          <div className="ml-4">
            <p className="font-bold">{`${driver.firstName} ${driver.lastName}`}</p>

            <div className="text-yellow-400">
              {"★".repeat(driver.reputation) +
                "☆".repeat(5 - driver.reputation)}
            </div>

            {assignmentsDriver && assignmentsDriver.length > 0 ? (
              <p>Entregas asignadas: {assignmentsDriver.length}</p>
            ) : (
              <p>Sin entregas asignadas</p>
            )}
          </div>
        </div>
        {assignmentsDriver && assignmentsDriver.length > 0 && (
          <div onClick={() => toggleAccordion(driver.id)}>
            {expandedDriverId === driver.id ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {expandedDriverId === driver.id &&
        assignmentsDriver &&
        assignmentsDriver.length > 0 && (
          <div className="mt-4 rounded-md bg-gray-800 p-3">
            <h2 className="mb-2 font-bold">Pedidos Asignados:</h2>
            <ul>
              {assignmentsDriver?.map((assignment, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <span>- {assignment.delivery.title}</span>
                    <button onClick={() => onDeleteAssignment(assignment.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="red"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
};

export default DriverItem;
