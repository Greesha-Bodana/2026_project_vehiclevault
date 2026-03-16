import React, { useState } from "react";

export const CompareCars = () => {

  const cars = [
    {
      id: 1,
      name: "Hyundai Creta",
      price: "₹11 Lakh",
      engine: "1497 cc",
      mileage: "17 km/l",
      fuel: "Petrol",
      transmission: "Manual"
    },
    {
      id: 2,
      name: "Kia Seltos",
      price: "₹12 Lakh",
      engine: "1499 cc",
      mileage: "18 km/l",
      fuel: "Petrol",
      transmission: "Automatic"
    },
    {
      id: 3,
      name: "Tata Nexon",
      price: "₹10 Lakh",
      engine: "1497 cc",
      mileage: "16 km/l",
      fuel: "Diesel",
      transmission: "Manual"
    }
  ];

  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);

  const getCar = (id) => cars.find((c) => c.id === parseInt(id));

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-center mb-8">
        🚗 Compare Cars
      </h1>

      {/* SELECT CARS */}
      <div className="flex justify-center gap-6 mb-10">

        <select
          className="p-3 border rounded-lg"
          onChange={(e) => setCar1(getCar(e.target.value))}
        >
          <option>Select Car 1</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>

        <select
          className="p-3 border rounded-lg"
          onChange={(e) => setCar2(getCar(e.target.value))}
        >
          <option>Select Car 2</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>

      </div>

      {/* COMPARISON TABLE */}
      {car1 && car2 && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

          <table className="w-full text-center border">

            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Feature</th>
                <th className="p-3">{car1.name}</th>
                <th className="p-3">{car2.name}</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-t">
                <td className="p-3 font-semibold">Price</td>
                <td>{car1.price}</td>
                <td>{car2.price}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-semibold">Engine</td>
                <td>{car1.engine}</td>
                <td>{car2.engine}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-semibold">Mileage</td>
                <td>{car1.mileage}</td>
                <td>{car2.mileage}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-semibold">Fuel Type</td>
                <td>{car1.fuel}</td>
                <td>{car2.fuel}</td>
              </tr>

              <tr className="border-t">
                <td className="p-3 font-semibold">Transmission</td>
                <td>{car1.transmission}</td>
                <td>{car2.transmission}</td>
              </tr>

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};