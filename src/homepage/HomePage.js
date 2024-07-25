import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import axios from 'axios';



function HomePage() {

    let [valueCounts, setvalueCounts] = useState([]);

    let [category, setcategory] = useState([]);


    useEffect(()=>{
      axios
      .get('http://127.0.0.1:5000/originaldataset')
      .then((r) => {
        setvalueCounts(r.data.valueCounts);
        setcategory(r.data.category);
      })
      .catch((err) => console.log(err));


    },[])

    const data = {
        labels: category,
        datasets: [
          {
            // label:false,
            backgroundColor: ['#f44336','#9e9e9e','#03a9f4','#58D68D','#8E44AD'],
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: valueCounts,
          },
        ],
      };



  return (
    <div>
        <h3 className='mt-3 ms-4'>Welcome to Job Sector and Job Title Prediction</h3>

{valueCounts.length===0 && category.length===0?
null
:
        <div className='container'>
        <Bar style={{width:'100%'}}
              data={data}
              options={
                {
                  plugins:{
                    legend:{
                      display:false,
                    },
                    title:{
                      display:true,
                      text:"Distribution of Job Queries by Category"
                    }
                  },
                // indexAxis: "y",
              }}
            />



        </div>
}

    </div>
  )
}

export default HomePage