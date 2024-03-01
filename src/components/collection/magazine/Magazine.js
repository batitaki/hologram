import React from 'react';
import './Magazine.css';
import { useTranslation } from 'react-i18next';
import AnimatedCollectionVisual from '../animatedCollection/AnimatedCollectionVisual.js';
import DrawImagesComponent from '../../sketch/draw/DrawImagesSketch.js';

const Magazine = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <div className='magazine'>
        <h2 className='titleMagazine'>{t("magazine")}</h2>
      </div>
      <div className='animated'>
        <div className='text-animation'>
          <br /><br /><br /><br /><br /><br />
          Outlaw Man (アウトロー・マン Autorō Man?, Shōnen Jump especial 1982)
Mashōnen B. T. (魔少年ビーティー Mashōnen bītī?, Shōnen Jump semanal 1982–1983, 1 volumen 1984)
Baoh (バオー来訪者 Baō Raohōsha?, Shōnen Jump semanal 1984–1985, 2 volúmenes 1985)
Gorgeous Irene (colección de one-shots, 1987)
Busō Poker (武装ポーカー Busō Pōkā?, Shōnen Jump semanal 1980)
<br></br>
Mashōnen B. T. (魔少年ビーティー Mashōnen bītī?, versión one shot, Fresh Jump 1982)
Virginia ni yoroshiku (バージニアによろしく Bājinia ni yoroshiku?, Shōnen Jump especial 1982)
Gorgeous Irene (ゴージャス☆アイリン Gōjazu Airin?, Shōnen Jump especial 1985-1986)
JoJo's Bizarre Adventure (ジョジョの奇妙な冒険? Shōnen Jump (1987 ~ 2004) → Ultra Jump (2005 ~ presente))
JoJo's Bizarre Adventure (63 volúmenes 1987-1999)
JoJo's Bizarre Adventure - Stone Ocean (17 volúmenes 2000-2003)
JoJo's <br></br> Bizarre Adventure - Steel Ball Run (24 volúmenes 2004-2011)

JoJo's Bizarre Adventure - JoJolion (27 volúmenes 2011~2021)
JoJo's Bizarre Adventure - The JOJOLands (2023~presente)
Shikeishikkōchū Datsugokushinkōchū (colección de one-shots, 1999)
<br></br>
Shikeishikkōchū Datsugokushinkōchū (死刑執行中脱獄進行中? Super Jump 1995)
Dolche Die Hard the Cat (ドルチ 〜ダイ・ハード・ザ・キャット〜 Doruchi ~Dai Hādo za Kyatto~?, Manga Allman 1996)
Kishibe Rohan wa ugokanai ~Episode 16 Sange~ (岸辺露伴は動かない〜エピソード16‥懺悔室〜? Shōnen Jump semanal 1997)
Deadman's Q (デットマンズQ Deddomanzu Q?, Manga Allman 1999)
Oingo Boingo Kyōdai Daibōken (オインゴとボインゴ兄弟 大冒険? 1 volumen 2002)
Henjin Henkutsu Retsuden (変人偏屈列伝? junto a Hirohisa Onikuba, Super Jump, Manga Allman y Ultra Jump 1989 - 2003, 1 volumen 2004)
Kishibe Rohan wa ugokanai Mutsukabezaka (岸辺露伴は動かない -六壁坂-? Jump Square 2007, one-shot)

        </div>
        <AnimatedCollectionVisual />
      </div>
      <DrawImagesComponent/>
    </>
  );
};

export default Magazine;
