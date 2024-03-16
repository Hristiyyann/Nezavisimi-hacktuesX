import { useContext, useEffect, useState } from "react";
import AppContext from "contexts/AppContext";
import classes from './style.module.less';
import { Image } from 'antd';

function MostUsedWords() {
    const { accessToken } = useContext(AppContext);
    const [wordsByParty, setWordsByParty] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = {
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Logo_of_the_Bulgarian_Socialist_Party.svg/1280px-Logo_of_the_Bulgarian_Socialist_Party.svg.png": ["Нинова", "Корнелия", "БСП", "Сегашния", "Глобална"],
            "https://upload.wikimedia.org/wikipedia/commons/0/0a/Logo_Hak_ve_%C3%96zg%C3%BCrl%C3%BCkler_Hareketi.png": ["Родния", "Омразата", "Подкупи", "Уважаеми", "Дневния"],
            "https://upload.wikimedia.org/wikipedia/commons/1/1b/Logo_GERB_PP.png": ["Увеличим", "Възобновяема", "Евро", "Тунел", "Подмяна"],
            "https://upload.wikimedia.org/wikipedia/commons/d/d2/PP%E2%80%93DB_interim_logo.svg": ["Здравословна", "Свързаните", "Злоупотреби", "Подобрена", "Прозрачни"],
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE681_WEyzdmQeCt4MiyNd-MNBYB3q2T2bAnZQ4r_WhA&s": ["Възраждане", "СДВР", "е", "Костадин", "Отряди"],
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/There_Is_Such_A_People_logo.svg/1200px-There_Is_Such_A_People_logo.svg.png": ["ИТН", "Разберете", "Безплатна", "Масло", "Димитър"],
        };

        setTimeout(() => {
            setWordsByParty(data);
            setLoading(false);
        }, 1000);

    }, []);

    if (loading) return <p>Loading...</p>;

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
