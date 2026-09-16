import { useState, useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setMedicines([]);
      return;
    }

    const timer = setTimeout(() => {
      searchMedicine(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  async function searchMedicine(search) {
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${search}&limit=20`
      );

      if (!response.ok) {
        throw new Error("Error in fetching the details");
      }

      const data = await response.json();

      setMedicines(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
      setMedicines([]);
    }
  }

  console.log(medicines);

  function selectMedicine(medicine) {
    setQuery(medicine.openfda?.brand_name?.[0] || "");
    setMedicines([]);
  }

  return (
    <>
      <h1>Medicine Result</h1>

      <input
        type="text"
        placeholder="Enter the medicine"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {medicines.length > 0 && (
        <div className="pb-5">
          {/* myError1: Use the index here because the API response doesn't provide a simple id field */}
          {medicines.map((medicine, index) => ( 

            <div
              key={index}
              onClick={() => selectMedicine(medicine)}
            >
              {/* myError2:The brand name is inside the openfda object in the API response */}
              <h2>
                {medicine.openfda?.brand_name?.[0]}
              </h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;