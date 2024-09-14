import supabase from "../config/supabaseClients"
import { useEffect, useState } from "react";



const Home = () => {

  const [fetcherror, setFetcherror] = useState(null)
  const [smoothies, setSmoothies] = useState([])

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
      .from('smoothies')
      .select()

      if (error) {
        setFetcherror(error.message)
        setSmoothies([])
        console.log(error.message)
      }

      if(data) {
        setSmoothies(data)
        setFetcherror(null)
        console.log(data)
    }
  }

    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      {fetcherror && <p>{fetcherror}</p>}

      {smoothies && (
        <div className="smoothies">
          {smoothies.map(smoothie => (
            <div key={smoothie.id} className="smoothie">
              <h2>{smoothie.Title}</h2>
              <p>{smoothie.Method}</p>
              <p>{smoothie.Rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home