import { useContext } from 'react';
import classes from './style.module.less';
import newspaper from 'assets/newspaper.png';
import AppContext from 'contexts/AppContext';
import { Profile } from 'components';


function Navbar() {
    const { accessToken } = useContext(AppContext)
    
    return (
        <div className = {classes.navbar}>
            <div className = {classes.nameContainer}>
                <img 
                    src = {newspaper} 
                />

                Независими
            </div>
        {
            accessToken
            ? 
            <div>
                <Profile/>
            </div>
            : 
            <div className = {classes.unauthorizedLinks}>
                <span className = {classes.link}>Вход</span>
                <span className = {classes.link}>Регистрация</span>
            </div>
        }
        </div>
    )
}

export default Navbar;