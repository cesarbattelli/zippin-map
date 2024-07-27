import React, { useState, useEffect } from "react";
import { IDelivery, IDriver } from "../../interfaces/common";
import { useAssignmentStore } from "../../stores/assignments.store";
import useDataStore from "../../stores/data.store";

interface IAssignmentModalProps {
  delivery: IDelivery;
  onClose: () => void;
}

const AssignmentModal: React.FC<IAssignmentModalProps> = ({
  delivery,
  onClose,
}) => {
  const drivers = useDataStore((state) => state.drivers) as IDriver[];
  const isAssigned = useAssignmentStore((state) => state.isAssigned);
  const setAssignment = useAssignmentStore((state) => state.setAssignment);

  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  useEffect(() => {
    const assigned = isAssigned(delivery.id);

    if (assigned) {
      setSelectedDriverId(assigned.driver.id);
    }
  }, [delivery.id, drivers, isAssigned]);

  const handleAssign = () => {
    if (selectedDriverId !== null) {
      const driver = drivers.find((x) => x.id === selectedDriverId);

      if (driver) {
        setAssignment(delivery, driver);
      }
      onClose();
    } else {
      alert("Por favor, selecciona un chofer.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Asignar Pedido</h2>
        <p>
          <strong>ID:</strong> {delivery.id}
        </p>
        <p>
          <strong>Negocio:</strong> {delivery.title}
        </p>
        <p>
          <strong>Descripción:</strong> {delivery.description}
        </p>
        <p>
          <strong>Ubicación:</strong> {delivery.lat}, {delivery.lng}
        </p>
        <div className="mt-4">
          <label htmlFor="driver" className="block font-bold mb-2">
            Seleccionar Chofer:
          </label>
          <select
            id="driver"
            className="w-full p-2 border rounded"
            value={selectedDriverId ?? ""}
            onChange={(e) => setSelectedDriverId(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecciona un chofer
            </option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.firstName} {driver.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAssign}
          >
            Asignar
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
