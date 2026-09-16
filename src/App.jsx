import { useState, useEffect } from 'react'


function App() {
  const [query,setQuery]=useState("");
  const [medicines,setMedicines]=useState([]);

  useEffect(()=>{
     if(!query.trim()){
       setMedicines([]);
       return;
     }
     const timer=setTimeout(()=>{
      searchMedicine(query);
     },500)

     return()=>clearTimeout(timer);
  },[query])

  async function searchMedicine(search){
      const response=await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${search}&limit=20`);
      
      if(!response.ok){
        throw new Error("Error in fetching the details");
      }
  const data=await response.json();
  setMedicines(data.results);
  console.log(data);

  }
 console.log(medicines)
  function selectMedicine(medicine){
    setQuery(medicine.name);
    setMedicines([]);
  }
  return (
    <>
      <h1>Medicine result</h1>
      <input type="text" placeholder="Enter the medicine" value={query} onChange={(e)=>setQuery(e.target.value)}/>
      
      {medicines.length>0 && (
        <div className=''>
          {medicines.map((medicine)=>(
            <div key={id}>
              <h1>{medicine.name}</h1>
            </div>

          ))}
        </div>
      )}
    </>
  )
}

export default App

