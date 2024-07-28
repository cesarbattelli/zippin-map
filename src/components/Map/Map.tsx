import React, { useState, useEffect } from "react";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { IDelivery } from "../../interfaces/common";
import useDataStore from "../../stores/data.store";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import { useAssignmentStore } from "../../stores/assignments.store";
import Avatar from "../Avatar/Avatar";
import DeliveryFilter from "../DeliveryFilter/DeliveryFilter";

const MapComponent: React.FC = () => {
  const DEFAULT_CENTER: google.maps.LatLngLiteral = {
    lat: -32.349718,
    lng: -64.997999,
  };
  const deliveries = useDataStore((state) => state.deliveries);
  const assignments = useAssignmentStore((state) => state.assignments);
  const isAssigned = useAssignmentStore((state) => state.isAssigned);
  const [filter, setFilter] = useState<string>("all");

  const [selectedDelivery, setSelectedDelivery] = useState<IDelivery | null>(
    null,
  );
  const [filteredDeliveries, setFilteredDeliveries] = useState<IDelivery[]>([]);

  const handleOrderClick = (delivery: IDelivery) => {
    setSelectedDelivery(delivery);
  };

  const closeModal = () => {
    setSelectedDelivery(null);
  };

  useEffect(() => {
    const updatedFilteredDeliveries = deliveries.filter((delivery) => {
      const assignmentInfo = isAssigned(delivery.id);
      if (filter === "all") return true;
      if (filter === "pending" && !assignmentInfo) return true;
      if (filter === "assigned" && assignmentInfo) return true;
      return false;
    });
    setFilteredDeliveries(updatedFilteredDeliveries);
  }, [deliveries, filter, assignments, isAssigned]);

  return (
    <>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="test-zippin"
      >
        {filteredDeliveries.map((delivery) => {
          const assignmentInfo = isAssigned(delivery.id);

          const bgColor = assignmentInfo
            ? "#" + assignmentInfo.driver.color
            : "#808080";

          return (
            <AdvancedMarker
              key={delivery.id}
              position={{ lat: delivery.lat, lng: delivery.lng }}
              clickable={true}
              onClick={() => handleOrderClick(delivery)}
            >
              <div
                className="relative rounded-lg p-4 text-white"
                style={{ backgroundColor: bgColor }}
              >
                {assignmentInfo && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform p-1">
                    <Avatar url={assignmentInfo.driver.avatar} />
                  </div>
                )}
                <p className="text-sm">{delivery.title}</p>
                <div
                  className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent"
                  style={{ borderTopColor: bgColor }}
                ></div>
              </div>
            </AdvancedMarker>
          );
        })}
      </Map>

      {selectedDelivery && (
        <AssignmentModal delivery={selectedDelivery} onClose={closeModal} />
      )}

      <DeliveryFilter filter={filter} setFilter={setFilter} />
    </>
  );
};

export default MapComponent;
