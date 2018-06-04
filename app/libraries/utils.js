import { visitors } from "../constants/models";
import spade from "../../public/images/spade.png";
import heart from "../../public/images/heart.png";
import diamond from "../../public/images/diamond.png";
import club from "../../public/images/club.png";


export const maxNumberOfVisitors = (start, end) => {
  const countArr = visitors.map(d => (
    (d.arrival <= end) && (start <= d.departure) ? 1 : 0
  ));
  return countArr.reduce((a, b) => (a + b));
};

export const getHandCards = () => {
  const picked = new Array(52);
  const cardvals = new Array(5);
  const suits = new Array(4);
  const matched = new Array(13);

  let pairs = 0;
  let threes = 0;
  let fours = 0;
  let flush = false;

  const resultObj = {
    word: null,
    bonus: 0
  };

  // 隨機取5張手牌
  for (let i = 0; i < 5; i += 1) {
    do {
      var n = Math.round(Math.random() * 51);
    } while ( picked[n] === 1 );
    picked[n] = 1;
    cardvals[i] = n;
  }
  
  const handCards = [...cardvals];

  // 按照原始大小排列
  cardvals.sort((a, b) => (a - b));

  // 先行清空
  
  suits.forEach((suit) => { suit = 0; });
  matched.forEach((match) => { match = 0; });
  

  cardvals.forEach((cardval) => {
    matched[cardval % 13] += 1;
    suits[Math.floor(cardval / 13)] += 1;
  });


  //  檢驗是否 pairs, threes and fours
  for (let i = 0; i < 13; i += 1) {
    if (matched[i] === 2) {
      pairs += 1;
    } else if (matched[i] === 3) {
      threes += 1;
    } else if (matched[i] === 4) {
      fours += 1;
    }
  }

  // 檢驗是否 同花 Flush
  for (let i = 0; i < 4; i += 1) {
    if (suits[i] === 5) {
      flush = true;
    }
  }

  // 轉換成牌號
  cardvals.forEach((cardval) => {
    cardval %= 13;
  });
 
  // 依照牌號大小重新整理
  cardvals.sort((a, b) => (a - b));

  resultObj.cards = handCards;

  if (cardvals[4] - cardvals[0] === 4 && flush) {
    resultObj.word = 'Straight flush';  // 同花順 Straight flush
    resultObj.bonus = 5;
  } else if (fours > 0) {
    resultObj.word = 'Four of a kind';  // 鐵支 Four of a kind
    resultObj.bonus = 4;
  } else if (threes === 1 && pairs === 1) {
    resultObj.word = 'Full house';   // 葫蘆 Full house
    resultObj.bonus = 3;
  } else if (flush) {
    resultObj.word = 'Flush'; // 同花 Flush
    resultObj.bonus = 2;
  } else if (cardvals[4] - cardvals[0] === 4) {
    resultObj.word = 'Straight'; // 順子 Straight
    resultObj.bonus = 1;
  } else {
    resultObj.word = 'Unmatched'; // Unmatched
    resultObj.bonus = 0;
  }

  return resultObj;
};

export const competeNow = () => {
  const handCardOne = getHandCards();
  const handCardTwo = getHandCards();
  let resultWord;
  

  if (handCardOne.bonus > handCardTwo.bonus) {
    resultWord = 'A win';
  } else if (handCardOne.bonus < handCardTwo.bonus) {
    resultWord = 'B win';
  } else {
    resultWord = 'Deuce';
  }
  return {
    resultWord,
    resultA: handCardOne,
    resultB: handCardTwo
  };
};


export const getLabel = (value) => {

  let originVal = parseInt(value);
  let labelVal = Math.floor(originVal / 13);
  let cardVal = (originVal %= 13) + 1;

  let labelIcon;

  switch (labelVal) {
    case 0:
      labelIcon = spade;
      break;
    case 1:
      labelIcon = heart;
      break;
    case 2:
      labelIcon = diamond;
      break;
    case 3:
      labelIcon = club;
      break;
    default:
      labelIcon = null;  
      break;
  }

  switch (cardVal) {
    case 1:
      cardVal = "A";
      break;
    case 11:
      cardVal = "J";
      break;
    case 12:
      cardVal = "Q";
      break;
    case 13:
      cardVal = "K";
      break;
    default:
      break;
  }




  return {
    labelIcon,
    val: cardVal
  }
}
