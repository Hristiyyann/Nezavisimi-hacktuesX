import { useContext } from 'react';
import classes from './style.module.less';
import newspaper from 'assets/newspaper.png';
import AppContext from 'contexts/AppContext';
import { Profile } from 'components';
import { useNavigate } from 'react-router';

function Navbar() {
    const { accessToken } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className={classes.navbar}>
            <div className={classes.nameContainer}>
                <img
                    src={newspaper}
                />

                Независими
            </div>
            {
                accessToken
                    ?
                    <div style={{ display: "flex", gap: "15px" }}>
                        <span
                            className='link'
                            onClick={() => navigate('/most-used-words')}
                        >
                            Интересни данни
                        </span>
                        
                        <Profile />
                    </div>
                    :
                    <div className={classes.unauthorizedLinks}>
                        <span
                            onClick={() => navigate('/sign-in')}
                            className='link'
                        >
                            Вход
                        </span>

                        <span
                            className='link'
                            onClick={() => navigate('/sign-up')}
                        >
                            Регистрация
                        </span>
                    </div>
            }
        </div>
    )
}

export default Navbar;