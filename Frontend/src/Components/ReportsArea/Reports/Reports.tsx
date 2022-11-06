import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { useState, useEffect } from 'react';
  import VacationModel from '../../../Models/VacationModel';
  import vacationService from '../../../Services/VacationsServices';
  import "./Reports.css";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vacations following report',
      },
    },
  };

function Reports(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>();
    useEffect(() => {
        vacationService.getAllVacations().then(vacs => {
            setVacations(vacs.filter(vac => vac.followersCount && vac.followersCount > 0));
        });
    }, []);

    
    const data = vacations && {
        labels: vacations.map(vac => vac.destination),
        datasets: [
        {
            label: 'Followers',
            data: vacations.map(vac => vac.followersCount),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
        ],
    };
    return (
        <div className="Reports">
            {vacations && (
                <Bar options={options} data={data} />
            )}
        </div>
    );
}

export default Reports;
