import { useState } from 'react'
import '../App.css'

function Visor() {
    const [Numeros, SetNum] = useState("0");
    const [AntiNum, SetAntiNum] = useState(null);
    const [Operador, SetOperador] = useState(null);
    const [NovoNum, SetNovoNum] = useState(false);

    function limpaNumero(valor) {
        if (typeof valor !== "string") valor = String(valor);
        if (valor === "Erro") return NaN;
        return parseFloat(valor.replace(/\./g, "").replace(",", "."));
    }

    function formatarNumero(num) {
        if (typeof num === "string") return num;
        if (isNaN(num)) return "Erro";
        return num.toLocaleString("pt-BR", { maximumFractionDigits: 10 }).replace(/\s/g, "");
    }

    function inputNum(e) {
        const input = e.target.value;
        if (Numeros === "0" || NovoNum) {
            SetNum(input);
            SetNovoNum(false);
        } else {
            SetNum(Numeros + input);
        }
    }

    function zerar() {
        SetNum("0");
        SetAntiNum(null);
        SetOperador(null);
        SetNovoNum(false);
    }

    function divi100() {
        const numero = limpaNumero(Numeros);
        SetNum(formatarNumero(numero / 100));
        SetNovoNum(true);
    }

    function apagar() {
        if (Numeros.length > 1) {
            SetNum(Numeros.slice(0, -1));
        } else {
            SetNum("0");
        }
    }

    function TrocarSinal() {
        const numero = limpaNumero(Numeros);
        SetNum(formatarNumero(numero * -1));
    }

    function AdiciDecimal() {
        if (!Numeros.includes(",")) {
            SetNum(Numeros + ",");
        }
    }

    function EscolherOperador(e) {
        SetAntiNum(Numeros);
        SetOperador(e.target.value);
        SetNovoNum(true);
        SetNum("0");
    }

    function calcular() {
        if (!Operador || AntiNum === null) return;

        const num1 = limpaNumero(AntiNum);
        const num2 = limpaNumero(Numeros);
        let resultado;

        switch (Operador) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;
            case 'x':
                resultado = num1 * num2;
                break;
            case '÷':
                resultado = (num2 !== 0 && !isNaN(num2)) ? num1 / num2 : "Erro";
                break;
            default:
                resultado = num2;
        }

        SetNum(formatarNumero(resultado));

        if (resultado !== "Erro") {
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
            SetNum(formatarNumero(Math.sqrt(numero)));
            SetNovoNum(true);
        }
    }

    function Inverter() {
        const numero = limpaNumero(Numeros);
        SetNum(numero !== 0 ? formatarNumero(1 / numero) : "Erro");
        SetNovoNum(true);
    }

    function Quadrado() {
        const numero = limpaNumero(Numeros);
        SetNum(formatarNumero(numero * numero));
        SetNovoNum(true);
    }

    return (
        <div className='fundo'>
            <div className='central'>
                <div className='Visor'>{Numeros}</div>

                <div className='FundoBotoes'>

                    <div><button type='button' onClick={zerar}>C</button></div>
                    <div><button type='button' onClick={apagar}>←</button></div>
                    <div><button type='button' onClick={divi100}>%</button></div>
                    <div><button type='button' onClick={EscolherOperador} value={'÷'}>÷</button></div>

                    <div><button type='button' onClick={inputNum} value={7}>7</button></div>
                    <div><button type='button' onClick={inputNum} value={8}>8</button></div>
                    <div><button type='button' onClick={inputNum} value={9}>9</button></div>
                    <div><button type='button' onClick={EscolherOperador} value={'x'}>x</button></div>

                    <div><button type='button' onClick={inputNum} value={4}>4</button></div>
                    <div><button type='button' onClick={inputNum} value={5}>5</button></div>
                    <div><button type='button' onClick={inputNum} value={6}>6</button></div>
                    <div><button type='button' onClick={EscolherOperador} value={'-'}>-</button></div>

                    <div><button type='button' onClick={inputNum} value={1}>1</button></div>
                    <div><button type='button' onClick={inputNum} value={2}>2</button></div>
                    <div><button type='button' onClick={inputNum} value={3}>3</button></div>
                    <div><button type='button' onClick={EscolherOperador} value={'+'}>+</button></div>

                    <div><button type='button' onClick={TrocarSinal}>+/-</button></div>
                    <div><button type='button' onClick={inputNum} value={0}>0</button></div>
                    <div><button type='button' onClick={AdiciDecimal}>,</button></div>
                    <div><button id="igual" type="submit" onClick={calcular}>=</button></div>

                    <div><button type='button' onClick={Inverter}>1/x</button></div>
                    <div><button type='button' onClick={Quadrado}>x²</button></div>
                    <div><button type='button' onClick={Radiciacao}>√</button></div>

                </div>
            </div>
        </div>
    )
}

export default Visor;
