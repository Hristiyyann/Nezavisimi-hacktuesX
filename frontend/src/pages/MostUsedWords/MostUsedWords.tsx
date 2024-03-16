import { Image } from 'antd';
import NavbarContext from 'contexts/NavbarContext';
import classes from './style.module.less';

function MostUsedWords() {
    const data = [
        { 
            link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Logo_of_the_Bulgarian_Socialist_Party.svg/1280px-Logo_of_the_Bulgarian_Socialist_Party.svg.png', 
            words: ["Нинова", "Корнелия", "БСП", "Сегашния", "Глобална"]
        },
        { 
            link: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_Hak_ve_%C3%96zg%C3%BCrl%C3%BCkler_Hareketi.png',
            words: ["Родния", "Омразата", "Подкупи", "Уважаеми", "Дневния"],
        },
        { 
            link: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Logo_GERB_PP.png',
            words: ["Увеличим", "Възобновяема", "Евро", "Тунел", "Подмяна"],
        },
        { 
            link: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/PP%E2%80%93DB_interim_logo.svg', 
            words: ["Здравословна", "Свързаните", "Злоупотреби", "Подобрена", "Прозрачни"],
        },
        { 
            link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE681_WEyzdmQeCt4MiyNd-MNBYB3q2T2bAnZQ4r_WhA&s', 
            words: ["Възраждане", "СДВР", "е", "Костадин", "Отряди"],
        },
        { 
            link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/There_Is_Such_A_People_logo.svg/1200px-There_Is_Such_A_People_logo.svg.png', 
            words: ["ИТН", "Разберете", "Безплатна", "Масло", "Димитър"],
        },
    ];


    return (
        <NavbarContext>
            <div className = {classes.container}>
                <h1 className = {classes.title}>Най-специфични думи за всяка партия</h1>

                <div className = {classes.parties}>
                {
                    data.map(({ link, words }) => 
                        <div className = {classes.partyCard}>
                            <div style = {{ width: 220 }}>
                                <img src = {link}/>
                            </div>
                            
                            <div className = {classes.words}>
                            {
                                words.map(word => 
                                    <span className = {classes.value}>• {word}</span>
                                )
                            }
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        </NavbarContext>
    )

    return (
        <div>
            <h1>Най-специфични думи за всяка партия</h1>
            {Object.entries(wordsByParty).map(([party, words], index) => (
                <div key={index}>
                    <Image
                        width={250}
                        height={200}
                        src={party}
                        preview={false}
                    />
                    <ul>
                        {words.map((word, wordIndex) => (
                            <li key={wordIndex}>{word}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default MostUsedWords;
