import React, { useState } from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { IDelivery } from "../../interfaces/common";
import useDataStore from "../../stores/data.store";
import AssignmentModal from "../AssignmentModal/AssignmentModal";
import { useAssignmentStore } from "../../stores/assignments.store";
import Avatar from "../Avatar/Avatar";
import DeliveryFilter from "../DeliveryFilter/DeliveryFilter";

const MapComponent: React.FC = () => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const DEFAULT_CENTER: google.maps.LatLngLiteral = {
    lat: -32.349718,
    lng: -64.997999,
  };
  const deliveries = useDataStore((state) => state.deliveries);
  const isAssigned = useAssignmentStore((state) => state.isAssigned);
  const [filter, setFilter] = useState<string>("all");

  const [selectedDelivery, setSelectedDelivery] = useState<IDelivery | null>(
    null
  );

  const handleOrderClick = (delivery: IDelivery) => {
    setSelectedDelivery(delivery);
  };

  const closeModal = () => {
    setSelectedDelivery(null);
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    const assignmentInfo = isAssigned(delivery.id);
    if (filter === "all") return true;
    if (filter === "pending" && !assignmentInfo) return true;
    if (filter === "assigned" && assignmentInfo) return true;
    return false;
  });

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
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
                className="relative text-white p-4 rounded-lg"
                style={{ backgroundColor: bgColor }}
              >
                {assignmentInfo && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Avatar url={assignmentInfo.driver.avatar} />
                  </div>
                )}
                <p>{delivery.title}</p>
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8"
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
    </APIProvider>
  );
};

export default MapComponent;
