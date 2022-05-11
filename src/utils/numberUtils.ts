import svg1 from '../images/numbers/1.svg';
import svg2 from '../images/numbers/2.svg';
import svg3 from '../images/numbers/3.svg';
import svg4 from '../images/numbers/4.svg';
import svg5 from '../images/numbers/5.svg';
import svg6 from '../images/numbers/6.svg';
import svg7 from '../images/numbers/7.svg';
import svg8 from '../images/numbers/8.svg';
import svg9 from '../images/numbers/9.svg';
import svg10 from '../images/numbers/10.svg';
import svg11 from '../images/numbers/11.svg';
import svg12 from '../images/numbers/12.svg';
import svg13 from '../images/numbers/13.svg';
import svg14 from '../images/numbers/14.svg';
import svg15 from '../images/numbers/15.svg';
import svg16 from '../images/numbers/16.svg';
import bold1 from '../images/numbers/1-1.svg';
import bold2 from '../images/numbers/2-1.svg';
import bold3 from '../images/numbers/3-1.svg';
import bold4 from '../images/numbers/4-1.svg';
import bold5 from '../images/numbers/5-1.svg';
import bold6 from '../images/numbers/6-1.svg';
import bold7 from '../images/numbers/7-1.svg';
import bold8 from '../images/numbers/8-1.svg';
import bold9 from '../images/numbers/9-1.svg';
import bold10 from '../images/numbers/10-1.svg';
import bold11 from '../images/numbers/11-1.svg';
import bold12 from '../images/numbers/12-1.svg';
import bold13 from '../images/numbers/13-1.svg';
import bold14 from '../images/numbers/14-1.svg';
import bold15 from '../images/numbers/15-1.svg';
import bold16 from '../images/numbers/16-1.svg';
import question from '../images/numbers/question.svg';

export function getSvg({
  answer,
  fix = false,
}: {
  answer: string | undefined;
  fix?: boolean;
}) {
  switch (answer) {
    case '1':
      return fix ? bold1 : svg1;
    case '2':
      return fix ? bold2 : svg2;
    case '3':
      return fix ? bold3 : svg3;
    case '4':
      return fix ? bold4 : svg4;
    case '5':
      return fix ? bold5 : svg5;
    case '6':
      return fix ? bold6 : svg6;
    case '7':
      return fix ? bold7 : svg7;
    case '8':
      return fix ? bold8 : svg8;
    case '9':
      return fix ? bold9 : svg9;
    case '10':
      return fix ? bold10 : svg10;
    case '11':
      return fix ? bold11 : svg11;
    case '12':
      return fix ? bold12 : svg12;
    case '13':
      return fix ? bold13 : svg13;
    case '14':
      return fix ? bold14 : svg14;
    case '15':
      return fix ? bold15 : svg15;
    case '16':
      return fix ? bold16 : svg16;
    case '?':
      return question;
    default:
      return undefined;
  }
}
