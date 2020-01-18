import React from "react";
import ReactDOM from "react-dom";


const App = () => (
    (
        <div>
            <a href="/"> На главную </a> <br/>реакт запущен успешно!!!
            <br/><br/><br/>
            <b>Дальше:</b>
            <ul>
                <li>добавить ui</li>
                <li>проследовать по уроку дальше (хотя бы на один пункт</li>
                <li>сделать красивое оформление по ui</li>
                <li>сделать вывод категорий (через axias)</li>
                <li>роутинг</li>
            </ul>
        </div>
    )
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App/>, wrapper) : null;