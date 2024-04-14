import Aside from '../../components/Aside';
import Content from '../../components/Content';
import MainHeader from '../../components/MainHeader';
import {Outlet, useLocation, useNavigate, userEffct} from 'react-router-dom';
import { Chart } from "react-google-charts";
import './style.css'
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import moment from 'moment';

function Dashboard (){
    const options = {
        chart:{
            title: "TEMPERATURA X UMIDADE",    
        },
        title: "TEMPERATURA X UMIDADE",
        curveType: 'function' ,
        legend: {position: "Bottom"},
        hAxis:{format: "currency"},
        animation: {duration: 500, easing: "Linear", startup: true}
      };
    const optionsPizza = {
        title: "TEMPERATURA X UMIDADE",
    }

    const { data, isLoading, error } = useQuery("todos", () => {
        return axios
            .get("http://localhost:8080/api/v1/sensores")
            .then((response) => response.data);
    });
    if (isLoading) {
        return <div className="loading">carregando...</div>
    }
    if (error) {
        return (
            <>
                <h1 className="erroHistorico">Histórico não encontrado</h1>
            </>
        );
    }
    const newArray = data.map(sensor =>([
        moment(sensor.dataCriacao).format("DD/MM/YYYY"),
        sensor.sensorTemp,
        sensor.sensorUmidade,
        sensor.sensorPressao
    ]))
    newArray.unshift(["Data da medição","Temperatura","Umidade","Pressão"]);
    //console.log(newArray)
    let totalMedicaoUmidade = 0, totalMedicaoTemperatura = 0,totalMedicaoPressao = 0;
    for(let i=0;i<data.length;i++){
        totalMedicaoTemperatura+= data[i].sensorTemp;
        totalMedicaoUmidade+= data[i].sensorUmidade
        totalMedicaoPressao+= data[i].sensorPressao
    }
    

    const dataPizza = [
        ["Sensor","Medição"],
        ["Temperatura",totalMedicaoTemperatura],
        ["Umidade", totalMedicaoUmidade],
        ["Pressão", totalMedicaoPressao]
    ];
    console.log(dataPizza);
    return(
       
         <div className='posicao'>
            
            <Aside/>
            <MainHeader page={"Dashboard"}/>
            <div className='dashboard'>
                <div className='valoresAtuais'>
                    
                </div>
                <div className='graficos'>
                    <div className='styleGraph'>
                    {<Chart
                        chartType="PieChart"
                        data={dataPizza}
                        options={optionsPizza}
                        width={"100%"}
                        height={"50vh"}
                        padding = {"10px"}
                    />}
                    </div>
                    <div className='styleGraph'>
                    {<Chart
                        chartType="Bar"
                        data={newArray}
                        options={options}
                        width={"100%"}
                        height={"50vh"}
                        padding = {"10px"}
                    /> }
                    </div>
                </div>
            </div>
            
            
            
        </div>
        
    );
}
export default Dashboard;