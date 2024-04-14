import './style.css';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext.js';

function Aside(){
    const nomeDoUsuario = Cookies.get('name');
    const {logout} = useContext(AuthContext);
    function hundleLogout(){
        logout();
    }

    return(
        <div className='aside'>
            <div className='login-aside'>
                <h3>Estação Meteorológica</h3>
                <span>bem vindo {nomeDoUsuario}</span>


                <div className='menu-aside'>
                    <img src="" alt="" />
                    <div className='menu'>
                        <ul>
                            <li><img className='icon-aside' src="../layout.png" alt="" /> <Link to='/' className='link-aside'>Dashboard</Link></li>
                            <li><img className='icon-aside' src="../database-management.png" alt="" /><Link to='/list' className='link-aside'>Histórico de Leitura</Link></li>
                        </ul>
                        
                    </div>
                </div>
            </div>
           

            <div className='footer-aside'>
            <button className='botao-deslogar' onClick={hundleLogout} ><img src="../logout.png" alt="" /> Deslogar</button>
                <h1>Trabalho iot2</h1>
                <span>Puc Minas</span>
            </div>

        </div>
    );
}
export default Aside;