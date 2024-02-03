import React from 'react'
import './Magazine.css'
import Sketch from '../sketch/audio/AudioVisualizerComponent.js';
import { useTranslation } from 'react-i18next';
import AnimatedCollectionVisual from '../collection/animatedCollection/AnimatedCollectionVisual.js';



export const Magazine = () => {
  const {t } = useTranslation()
  return (
    <>
    <div className='magazine'>

      <h2 className='titleMagazine'>   {t("magazine")} </h2>

    </div>


    <Sketch/>


    <div className='animated'>
      <div className='text-animation'>
    <br></br><br></br><br></br><br></br><br></br><br></br>
    Se supone que después del hecho coyuntural de la lucha por la legalización 
    de la interrupción voluntaria del embarazo, se puede decir que cierto territorio 
    ha sido conquistado a favor nuestro. No entendiéndose como si fuésemos implacables 
    imperialistas torciendo voluntades a lo pavote, ni tampoco como si ahora tuviésemos
    cierta ventaja comparativa o monstruosa sobre el otro sexo. De igual modo, asusta pensar 
    que aquella lábil frontera que cruzamos pueda revertirse al haber un pequeño, hasta insignificante 
    cambio en los vientos. El preludio de la constante lucha que reconoce Beauvoir implica que el lobo 
    te sople la casita una y otra vez.
    Recuerdo caminar en sintonía con una masa abrazada al calor de lo unísono, 
    avanzando con el tacto de un codo o brazo y un “permiso” al costado. 
    Se había hecho de noche pero las pantallas alumbraban las cabezas en un desliz 
    color pantano de un lado de la vereda hacia el otro. Tiritan los edificios al bramido de 
    los bombos y al fervor de una garganta ya áspera y seca; no por eso con menos fuerza. Retumba
    sobre avenida de mayo el reclamo de una denuncia que solo se apacigua con la escucha. La tinta
    sobre tu monumento nacional favorito es menor que la sangre que le hace sombra sobre sí mismo. La 
    lluvia no borra las paredes, como el agua caliente sí te saca una mancha roja de la remera. Noto quienes
    tienen glitter en los ojos y quienes visten de negro, ese día yo solo llevaba el pañuelo y el uniforme.
    Agarradas de la mano nos íbamos acercando al congreso, el megáfono gritaba alerta y convocaba con su lírica astuta.
    Ni siquiera desde arriba de la valla, tomando un poco de perspectiva, podía una dimensionar 
    el impacto histórico de lo que estaba aconteciendo.
</div>
    <AnimatedCollectionVisual />
    </div>
    </>
  )
}
