import { useState } from 'react'
import '../App.css'

function Visor() {
    const[Numeros,SetNum]=useState(0)
    const[AntiNum, SetAntiNum]=useState(null);
    const[Operador, SetOperador] = useState(null);
    const[NovoNum, SetNovoNum] = useState(false);


    function limpaNumero(valor) {
        if (typeof valor !== "string") valor = String(valor);
        return parseFloat(
            valor
                .replace(/\./g, "")    // remove pontos separador de milhar
                .replace(",", ".")     // troca vírgula decimal por ponto
        );
    }

    function formatarNumero(num) {
        if (typeof num === "string") return num;
        if (isNaN(num)) return "Erro";

        return num
            .toLocaleString("pt-BR", { maximumFractionDigits: 10 })
            .replace(/\s/g, "");
    }




    function inputNum(value){
        const input = value.target.value
        if (Numeros === "0" || NovoNum){
            SetNum(input)
            SetNovoNum(false);
        }else{
            SetNum(Numeros + input)
        }
        
    }
    
    function zerar(){
        SetNum("0")
        SetAntiNum(null);
        SetOperador(null);
        SetNovoNum(false);  
    }

    function divi100(){
        const numero = limpaNumero(Numeros);
        SetNum(formatarNumero(numero / 100));
        SetNovoNum(true);
    }
    
    function apagar(){
        if (Numeros.length > 1){
            SetNum(Numeros.slice(0, -1));
        }else{
            SetNum('0')
        }
    }
    
    function TrocarSinal(){
        SetNum(String(parseFloat(Numeros) * -1));
    }

    function AdiciDecimal() {
        if (!Numeros.includes(",")) {
            SetNum(Numeros + ",");
        }
    }


    function EscolherOperador(e){
        SetAntiNum(Numeros);
        SetOperador(e.target.value);
        SetNovoNum(true);
        SetNum("0");
    }

    function calcular(){
        if (AntiNum !== null && Operador !== null){
            let resultado;
            const num1 = limpaNumero(AntiNum);
            const num2 = limpaNumero(Numeros);

            switch (Operador){
                case '+':
                    resultado = num1 + num2
                    break;
                case '-':
                    resultado = num1 - num2
                    break;
                case 'x':
                    resultado = num1 * num2
                    break;
                case 'x2':
                    resultado = num1 * num1
                    break;
                case '√':
                    resultado = num1 >= 0 ? Math.sqrt(num1) : 'Erro';
                    break
                case '1/x':
                    resultado = 1 / num1
                    break;
                case "÷":
                    resultado = num2 !== 0 ? num1 / num2 : "Erro";
                    break;
                default:
                    resultado = num2
            
            }

            SetNum(formatarNumero(resultado));
            SetAntiNum(null);
            SetOperador(null);
            SetNovoNum(true);
        }
    }

    function Radiciacao() {
        const numero = limpaNumero(Numeros);
        if (numero < 0) {
            SetNum("Erro");
        } else {
            const resultado = Math.sqrt(numero);
            SetNum(formatarNumero(resultado));
            SetNovoNum(true);

        }
    }
    return (
        

        <div className='fundo'>

            <div className='central'>

                <div className='Visor'>{Numeros}</div>
                
                <div className='FundoBotoes'>
                    <div><button type='submit' onClick={zerar}>C</button></div>
                    <div><button type='submit' onClick={apagar}><svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z"/></svg></button></div>
                    <div><button type='submit' onClick={divi100}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#1f1f1f"><path d="M311.8-528q-49.8 0-84.8-35.2t-35-85q0-49.8 35.2-84.8t85-35q49.8 0 84.8 35.2t35 85q0 49.8-35.2 84.8t-85 35Zm.2-72q20 0 34-14t14-34q0-20-14-34t-34-14q-20 0-34 14t-14 34q0 20 14 34t34 14Zm335.8 408q-49.8 0-84.8-35.2t-35-85q0-49.8 35.2-84.8t85-35q49.8 0 84.8 35.2t35 85q0 49.8-35.2 84.8t-85 35Zm.2-72q20 0 34-14t14-34q0-20-14-34t-34-14q-20 0-34 14t-14 34q0 20 14 34t34 14Zm-405 72-51-51 525-525 51 51-525 525Z"/></svg></button></div>
                    <div><button type='submit' onClick={EscolherOperador} value={'1/x'}>1/x</button></div>
                    <div><button type='submit' onClick={EscolherOperador} value={"x2"}><i class="fa fa-superscript"></i></button></div>
                    <div><button type='submit' onClick={Radiciacao} value={'√'}> <svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M351-160 155-356l57-57 139 139 279-664h69L351-160Z"/></svg></button></div>
                    <div><button type='submit' onClick={EscolherOperador} value={'÷'}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-160v-80h80v80h-80ZM200-440v-80h560v80H200ZM440-720v-80h80v80h-80Z"/></svg></button></div>
                    <div><button type='submit' onClick={inputNum} value={7}>7</button></div>
                    <div><button type='submit' onClick={inputNum} value={8}>8</button></div>
                    <div><button type='submit' onClick={inputNum} value={9}>9</button></div>
                    <div><button type='submit' onClick={EscolherOperador}   value={'x'}><svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button></div>
                    <div><button type='submit' onClick={inputNum} value={5}>5</button></div>
                    <div><button type='submit' onClick={inputNum} value={6}>6</button></div>
                    <div><button type='submit' onClick={EscolherOperador} value={'-'}><svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M200-440v-80h560v80H200Z"/></svg></button></div>                    
                    <div><button type='submit' onClick={EscolherOperador} value={'+'}><svg xmlns="http://www.w3.org/2000/svg" height="23px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button></div>
                    <div><button type='submit' onClick={TrocarSinal}>+/-</button></div>
                    <div><button type='submit' onClick={inputNum} value={4}>4</button></div>
                    <div><button type='submit' onClick={inputNum} value={3}>3</button></div>
                    <div><button type='submit' onClick={inputNum} value={2}>2</button></div>
                    <div><button type='submit' onClick={inputNum} value={1}>1</button></div>
                    <div><button type='submit' onClick={inputNum} value={0}>0</button></div>
                    <div><button type='submit' onClick={AdiciDecimal}>,</button></div>
                    <div><button id='igual' type='submit' onClick={calcular}>=</button></div>
                </div>
            </div>
        </div>
        
)}

export default Visor