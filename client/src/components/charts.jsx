import React,{useContext} from 'react';
import PollContext from '../pollcontext/pollcontext'
import {Doughnut} from 'react-chartjs-2';
const Charts = () => {
    const pollcontext = useContext(PollContext)
    const {pollstate} = pollcontext
     console.log(pollstate)
   
     const color=()=>{
      
         return  '#' +
          Math.random()
            .toString(16)
            .slice(2, 8)
       
      }

   
     const data = {
         
        labels: pollstate.singlepoll.options!==undefined && pollstate.singlepoll.options.map(option => option.option),
        datasets: [
          {
            label: pollstate.singlepoll.options!==undefined && pollstate.singlepoll.question,
            backgroundColor: pollstate.singlepoll.options!==undefined && pollstate.singlepoll.options.map(option => color()),
            borderColor: '#323643',
            data: pollstate.singlepoll.options!==undefined && pollstate.singlepoll.options.map(option => option.votes),
          },
        ],
      };
    return (
        <center>
        <div>
           
        <Doughnut  width={500}
	height={500}
	options={{ maintainAspectRatio: false }} data={data} />
        </div>
        </center> 
     );
}
 
export default Charts;