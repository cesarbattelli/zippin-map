import React, { useState } from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

interface DeliveryLocation {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
}

const locations: DeliveryLocation[] = [
  {
    id: "1",
    lat: -32.357718,
    lng: -65.014992,
    title: "Café Bonito",
    description: "Café y medialunas",
  },
  {
    id: "2",
    lat: -32.358718,
    lng: -65.024492,
    title: "Panadería Delicias",
    description: "Pan y facturas",
  },
  {
    id: "3",
    lat: -32.349718,
    lng: -65.024992,
    title: "Verdulería La Huerta",
    description: "Frutas y verduras",
  },
  {
    id: "4",
    lat: -32.360718,
    lng: -65.023492,
    title: "Carnicería El Gaucho",
    description: "Carne y embutidos",
  },
  {
    id: "5",
    lat: -32.341718,
    lng: -65.012992,
    title: "Farmacia Salud",
    description: "Medicamentos y productos de higiene",
  },
  {
    id: "6",
    lat: -32.347718,
    lng: -65.012492,
    title: "Librería El Saber",
    description: "Libros y útiles escolares",
  },
  {
    id: "7",
    lat: -32.348718,
    lng: -65.006492,
    title: "Pizzería Don Juan",
    description: "Pizzas y empanadas",
  },
  {
    id: "8",
    lat: -32.345718,
    lng: -65.006492,
    title: "Supermercado Ahorro",
    description: "Productos de supermercado",
  },
  {
    id: "9",
    lat: -32.355718,
    lng: -65.010992,
    title: "Ferretería El Clavo",
    description: "Herramientas y materiales de construcción",
  },
  {
    id: "10",
    lat: -32.356718,
    lng: -65.000592,
    title: "Heladería El Polo",
    description: "Helados artesanales",
  },
  {
    id: "11",
    lat: -32.337718,
    lng: -65.019992,
    title: "Tienda de Ropa Fashion",
    description: "Ropa y accesorios",
  },
  {
    id: "12",
    lat: -32.343718,
    lng: -65.022492,
    title: "Juguetería El Mundo",
    description: "Juguetes y juegos",
  },
  {
    id: "13",
    lat: -32.329718,
    lng: -65.008992,
    title: "Pastelería Dulce",
    description: "Tortas y pasteles",
  },
  {
    id: "14",
    lat: -32.360718,
    lng: -65.008492,
    title: "Floristería La Rosa",
    description: "Flores y arreglos florales",
  },
  {
    id: "15",
    lat: -32.336718,
    lng: -65.001992,
    title: "Bicicletería El Pedal",
    description: "Bicicletas y repuestos",
  },
  {
    id: "16",
    lat: -32.342718,
    lng: -64.996999,
    title: "Zapatería Pasos",
    description: "Zapatos y sandalias",
  },
  {
    id: "17",
    lat: -32.363718,
    lng: -64.996999,
    title: "Joyería Brillo",
    description: "Joyas y relojes",
  },
  {
    id: "18",
    lat: -32.349718,
    lng: -64.986999,
    title: "Electrónica Tech",
    description: "Electrodomésticos y gadgets",
  },
  {
    id: "19",
    lat: -32.333718,
    lng: -65.027992,
    title: "Perfumería Aroma",
    description: "Perfumes y cosméticos",
  },
  {
    id: "20",
    lat: -32.366718,
    lng: -65.005492,
    title: "Veterinaria Amigo Fiel",
    description: "Productos para mascotas",
  },
];

const MapComponent: React.FC = () => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const DEFAULT_CENTER: google.maps.LatLngLiteral = {
    lat: -32.349718,
    lng: -64.997999,
  };

  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryLocation | null>(null);

  const handleOrderClick = (delivery: DeliveryLocation) => {
    setSelectedDelivery(delivery);
  };

  const closeModal = () => {
    setSelectedDelivery(null);
  };

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
        {locations.map((location) => (
          <AdvancedMarker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            clickable={true}
            onClick={() => handleOrderClick(location)}
          >
            <div className="relative bg-blue-500 text-white p-4 rounded-lg">
              <p>{location.title}</p>
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-blue-500"></div>
            </div>
          </AdvancedMarker>
        ))}
      </Map>

      {selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Asignar Pedido</h2>
            <p>
              <strong>ID:</strong> {selectedDelivery.id}
            </p>
            <p>
              <strong>Negocio:</strong> {selectedDelivery.title}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedDelivery.description}
            </p>
            <p>
              <strong>Ubicación:</strong> {selectedDelivery.lat},{" "}
              {selectedDelivery.lng}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </APIProvider>
  );
};

export default MapComponent;
