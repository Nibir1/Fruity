// Elements
var elFruitGenerate,
  elShuffle,
  elAboutFruitName,
  elFruitInfo,
  elIdentifyFruitName,
  elSection01Result,
  elSection02Result;
var elQuestion01, elQuestion02, elQuestion01Answer, elQuestion02Answer;
var elLetsLearnMore, elLetsContinueLearningMore, elSubmit;

var audioBGMusic,
  audioHit,
  audioWin,
  audioObjArr = [];

// Game Statistics
/**
 * Fruitindex is a number that will generate randomly
 * We will use this random number to get a random fruit name
 */
let fruitIndex;

/**
 * This array stores the fruits objects
 * So that we can access the individual fruits classes
 * The collectionOfFruitsFunc() must be executed before using this array
 */
let collectionOfFruitsObjArr = [];

/**
 * fruitObj will be an object of Fruit Class
 */
let fruitobj;

/**
 * Temporary fruit name holder
 * This is used in switch case- identifyFruitName Function to remove duplicate value
 */
let tempFruit;

/**
 * Tracked Fruit Which is randomly generated
 */
let trackedFruit;

// Fruit Class
/**
 * This is the default fruit class.
 * It contains totalFruits, fruitsList, Fruit Name, Fruit Image, Fruit Information, Fruit-based-Questions,
 * fruitBasedQuestionsCorrectAnswers,fruitBasedQuestionsWrongAnswers.
 * Values are inserted for the variables on extends(inheritance).
 */
class Fruit {
  /**
   * Total number of fruits
   */
  totalFruits = 5;

  /**
   * List of fruits
   */
  fruitsList = ["Avocado", "Banana", "Orange", "Pineapple", "Watermelon"];

  /**
   * Fruit Name
   */
  fruitName = null;

  /**
   * Fruit Image.
   * Specify image path
   */
  fruitImagePath = null;

  /**
   * About Fruit Information
   */
  fruitInformation = null;

  /**
   * Fruit information based questions and answers
   */
  question01 = null;
  question01CAnswer = null;

  question02 = null;
  question02CAnswer = null;

  /**
   * Fruit information based questions wrong answers
   */
  fruitBasedQuestionsWrongAnswers = [];

  constructor() {}
}

/**
 * Avocado Fruit Class.
 * Extending base Fruit Class
 */
class Avocado extends Fruit {
  fruitName = "Avocado";
  fruitImagePath = "./img/Avocado.png";

  fruitInformation =
    "“An avocado is a bright green fruit with a large pit and dark leathery skin.\
They're also known as alligator pears or butter fruit.The avocado is a tree originating in the\
 Americas which is likely native to the highland regions of south-central Mexico to Guatemala.”";

  question01 = "What's the color of an Avocado?";
  question01CAnswer = "Bright Green";

  question02 = "Which country Avocado originated from?";
  question02CAnswer = "America";

  fruitBasedQuestionsWrongAnswers = ["Yellow", "Germany"];
}

/**
 * Banana Fruit Class.
 * Extending base Fruit Class
 */
class Banana extends Fruit {
  fruitName = "Banana";
  fruitImagePath = "./img/Banana.png";

  fruitInformation =
    '“Banana, fruit of the genus Musa, of the family Musaceae, one of the most important fruit crops of the world.\
It contains 1.3g Protein, 422mg Potassium and other nutrients.In some countries, bananas used for cooking may be called "plantains"”';

  question01 = "Banana is known as the fruit of the...?";
  question01CAnswer = "Genus Musa";

  question02 = "How much protein banana contains?";
  question02CAnswer = "1.3g";

  fruitBasedQuestionsWrongAnswers = ["Plantains", "2.5g"];
}

/**
 * Orange Fruit Class.
 * Extending base Fruit Class
 */
class Orange extends Fruit {
  fruitName = "Orange";
  fruitImagePath = "./img/Orange.png";

  fruitInformation =
    '“An orange is a type of citrus fruit which people often eat. Oranges are a very good source of vitamins, especially vitamin C. The "sweet orange",\
    which is the kind that are most often eaten today, grew first in Asia but now grows in many parts of the world.”';

  question01 = "Where did 'Sweet Orange' grew first?";
  question01CAnswer = "Asia";

  question02 = "What type of fruit orange is?";
  question02CAnswer = "Citrus";

  fruitBasedQuestionsWrongAnswers = ["Australia", "Sweet"];
}

/**
 * Pineapple Fruit Class.
 * Extending base Fruit Class
 */
class Pineapple extends Fruit {
  fruitName = "Pineapple";
  fruitImagePath = "./img/Pineapple.png";

  fruitInformation =
    "“Pineapples are sweet, juicy fruits. They grow on a plant with the scientific name Ananas comosus.\
Ananas means “excellent fruit” in an Indian language from South America.Pineapples grow in tropical (warm) areas around the world.”";

  question01 = "What does Ananas mean?";
  question01CAnswer = "Excellent fruit";

  question02 = "What type of areas pineapple grow in?";
  question02CAnswer = "Tropical";

  fruitBasedQuestionsWrongAnswers = ["Sour", "Dry"];
}

/**
 * Watermelon Fruit Class.
 * Extending base Fruit Class
 */
class Watermelon extends Fruit {
  fruitName = "Watermelon";
  fruitImagePath = "./img/Watermelon.png";

  fruitInformation =
    "“Part of the gourd family, the watermelon is a large, sweet fruit that grows on a vine.\
Watermelons are valued for their juicy flesh, which is served fresh in many parts of the world. The flesh can also be juiced to make drinks.”";

  question01 = "Watermelon is part of the...family?";
  question01CAnswer = "Gourd";

  question02 = "Watermelons are valued for their...?";
  question02CAnswer = "Juicy Flesh";

  fruitBasedQuestionsWrongAnswers = ["Desert", "Spicy"];
}

// Tracking loaded resources

/**
 * This function will take a string value.
 * The value should be the path of the file.
 * It will redirect to the given path.
 * @param {String} value
 */
const pageRedirector = (value) => {
  window.location.replace(value);
};
/**
 * This function creates an array of fruits objects
 */
const collectionOfFruitsFunc = () => {
  const AvocadoObj = new Avocado();
  const BananaObj = new Banana();
  const OrangeObj = new Orange();
  const PineappleObj = new Pineapple();
  const WatermelonObj = new Watermelon();

  collectionOfFruitsObjArr = [
    AvocadoObj,
    BananaObj,
    OrangeObj,
    PineappleObj,
    WatermelonObj,
  ];
};

/**
 * This functions generates random fruit image on page load
 * Can be executed by clicking the shuffle button too
 */
const generateRandomFruitImage = () => {
  // Creating Fruit object here
  fruitobj = new Fruit();
  if (!fruitobj) throw Error("Couldn't create fruitobj");

  // Getting the fruit-identify placeholder where the random fruit image should take place
  elFruitGenerate = document.getElementById("fruit-identify");
  if (!elFruitGenerate)
    throw Error(
      "Couldn't find the fruit-identify placeholder where the fruit should take place"
    );

  // Generating random fruit index from fruitobjects total fruits
  fruitIndex = Math.trunc(Math.random() * fruitobj.totalFruits);

  // Changing the image based on randomly generated fruit image
  elFruitGenerate.src = collectionOfFruitsObjArr[fruitIndex].fruitImagePath;
};

/**
 * Generates the fruit Name Based on randomly generated fruit image
 * This works based on fruitIndex variable
 * Since we are storing randomly generated number in fruitIndex
 */
const generateRandomFruitName = () => {
  elAboutFruitName = document.getElementById("about-fruit-name");
  if (!elAboutFruitName)
    throw Error("Couldn't find the about fruit name label");
  elAboutFruitName.innerText = collectionOfFruitsObjArr[fruitIndex].fruitName;
};

/**
 * Generates fruit Information Based on randomly generated fruit
 * This works based on fruitIndex variable
 * Since we are storing randomly generated number in fruitIndex
 */
const generateRandomFruitInformation = () => {
  elFruitInfo = document.getElementById("fruit-info");
  if (!elFruitInfo) throw Error("Couldn't find the fruit-info section");
  elFruitInfo.innerText = collectionOfFruitsObjArr[fruitIndex].fruitInformation;
};

/**
 * Congrats! Lets learn more button toggling.
 * If the player is successfull to guess the right fruit name then we are doing "display:block" to "Congrats lets learn more button".
 * Also we are updating the result
 * Otherwise We are not displaying the "Congrats lets learn more button"
 */
const cngrtsLetsLearnMore = (value) => {
  elLetsLearnMore = document.getElementById("cngrts-lets-learn-more");
  if (!elLetsLearnMore)
    throw Error("Couldn't get the congrats lets learn button");

  if (value) {
    elLetsLearnMore.style.display = "block";
  } else {
    elLetsLearnMore.style.display = "none";
  }
};

/**
 * Congrats! Lets continue learn more button toggling.
 * If the player is successfull to guess the right answers then we are doing "display:block" to "Congrats lets Continue learning more button".
 * Otherwise We are not displaying the "Congrats lets Continue learning more button"
 */
const cngrtsLetsContinueLearnMore = (value) => {
  elLetsContinueLearningMore = document.getElementById(
    "continue-learning-more"
  );
  if (!elLetsContinueLearningMore)
    throw Error("Couldn't get the congrats lets continue learning more button");

  if (value) {
    elLetsContinueLearningMore.style.display = "block";
  } else {
    elLetsContinueLearningMore.style.display = "none";
  }
};

/**
 * This function takes a value and removes it from an array
 */
function removeSpecificFruitFromFruitList(value) {
  fruitobj.fruitsList = fruitobj.fruitsList.filter((item) => item !== value);
}

/**
 * This function generates a random fruit from fruitlist which is in fruitobject.
 * Then returns the value
 */
const randomFruitFromFruitsList = () => {
  let randomFruit =
    fruitobj.fruitsList[Math.trunc(Math.random() * fruitobj.fruitsList.length)];
  return randomFruit;
};

/**
 * Generates fruits name on questions Answer option.
 * This includes the right and wrong answers.
 * Also Checks the answer which is guessing the fruit name
 * If successful then Enables " Congrats! Lets Learn more " button
 */
const identifyFruitName = () => {
  elIdentifyFruitName = document.querySelectorAll(
    "#fruit-identifying-questions-answer"
  );
  if (!elIdentifyFruitName)
    throw Error("Couldn't find fruit-identifying-questions-answer");

  elSection01Result = document.getElementById("section01-result");
  if (!elSection01Result) throw Error("Couldn't find section01 result");

  /**
   * Making fruit name generating functionalities here which are basically for questions options
   * TrackingNumber is basically for tracking the randomly picked option where the correct answer will appear
   * TrackedFruit is the fruit that generates on the fruit image panel
   * Using the fruitObj to get the FruitsList array ( fruitObj is from generateRandomFruitImage function)
   */
  let trackingNumber = Math.trunc(Math.random() * 3);
  trackedFruit = collectionOfFruitsObjArr[fruitIndex].fruitName;

  // Taking the randomly picked option and putting the fruit name that generated on the fruit image panel
  elIdentifyFruitName[trackingNumber].innerText = trackedFruit;

  // Removing the tracked fruit from fruitobj.fruitsList array so that it doesn't duplicate in questions answer
  removeSpecificFruitFromFruitList(trackedFruit);

  /**
   * In this switch case we are basically taking the tracking number
   * ( tracking number is where the random fruit name takes place - correct answer one)
   * Then based on the tracking number we doing some old school coding which is
   * ditching the tracking number and using other numbers within [0,1,2]
   * Then based on the tracking number we are simply generating wrong answers on other prositions
   * We are also removing the wrong answer from the array so that it doesn't reappear again
   */
  switch (trackingNumber) {
    case 0:
      tempFruit = randomFruitFromFruitsList();
      elIdentifyFruitName[1].innerText = tempFruit;
      removeSpecificFruitFromFruitList(tempFruit);
      elIdentifyFruitName[2].innerText = randomFruitFromFruitsList();
      break;
    case 1:
      tempFruit = randomFruitFromFruitsList();
      elIdentifyFruitName[0].innerText = tempFruit;
      removeSpecificFruitFromFruitList(tempFruit);
      elIdentifyFruitName[2].innerText = randomFruitFromFruitsList();
      break;
    case 2:
      tempFruit = randomFruitFromFruitsList();
      elIdentifyFruitName[0].innerText = tempFruit;
      removeSpecificFruitFromFruitList(tempFruit);
      elIdentifyFruitName[1].innerText = randomFruitFromFruitsList();
      break;
    default:
      console.log("Error");
  }

  // Checking the correct answer here
  elIdentifyFruitName.forEach((value) => {
    value.addEventListener("click", (e) => {
      // Plays the button clicking sound
      handleAudioObjects.audioHit.play();

      if (
        collectionOfFruitsObjArr[fruitIndex].fruitName === e.target.innerText
      ) {
        // On Success Plays the Winning Sound
        handleAudioObjects.audioWin.play();

        // This function is enabling the congrats learn more button
        cngrtsLetsLearnMore(true);

        // Updating the result
        elSection01Result.innerText = "Yay! Congratulations";
      } else {
        elSection01Result.innerText = "Oops! Try Again";
      }
    });
  });
};

/**
 * Generates questions based on randomly generated fruit
 */
const generateQuestionsAndOptionsOnTheFruit = () => {
  elQuestion01 = document.getElementById("question01");
  if (!elQuestion01) throw Error("Couldn't find the question01 placeholder");

  elQuestion02 = document.getElementById("question02");
  if (!elQuestion02) throw Error("Couldn't find the question02 placeholder");

  // Generating the questions on the Questions placeholder
  elQuestion01.innerText = collectionOfFruitsObjArr[fruitIndex].question01;
  elQuestion02.innerText = collectionOfFruitsObjArr[fruitIndex].question02;

  elQuestion01Answer = document.querySelectorAll("#question01-answer");
  if (!elQuestion01Answer)
    throw Error("Couldn't find the question01Answer placeholder");

  elQuestion02Answer = document.querySelectorAll("#question02-answer");
  if (!elQuestion02Answer)
    throw Error("Couldn't find the question02Answer placeholder");

  // Generating the questions Correct Answers at random positions based on correctAnswerPosition
  let correctAnswerPosition = Math.trunc(Math.random() * 3);
  elQuestion01Answer[correctAnswerPosition].innerText =
    collectionOfFruitsObjArr[fruitIndex].question01CAnswer;
  elQuestion02Answer[correctAnswerPosition].innerText =
    collectionOfFruitsObjArr[fruitIndex].question02CAnswer;

  // Generating the questions Wrong Answers at random positions skipping correctAnswerPosition and also not duplicated options
  switch (correctAnswerPosition) {
    case 0:
      // Wrong options for question01
      elQuestion01Answer[1].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[0];
      elQuestion01Answer[2].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[1];

      // Wrong options for question02
      elQuestion02Answer[1].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[0];
      elQuestion02Answer[2].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[1];
      break;
    case 1:
      // Wrong options for question01
      elQuestion01Answer[0].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[0];
      elQuestion01Answer[2].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[1];

      // Wrong options for question02
      elQuestion02Answer[0].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[0];
      elQuestion02Answer[2].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[1];
      break;
    case 2:
      // Wrong options for question01
      elQuestion01Answer[0].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[0];
      elQuestion01Answer[1].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[1];

      // Wrong options for question02
      elQuestion02Answer[0].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[0];
      elQuestion02Answer[1].innerText =
        collectionOfFruitsObjArr[fruitIndex].fruitBasedQuestionsWrongAnswers[1];
      break;
    default:
      console.log("Error");
  }
};

/**
 * Checks correct answers of the questions based on randomly generated fruit
 */
const checkGenerateQuestionsAnswer = () => {
  var score = 0;

  elSection02Result = document.getElementById("section02-result");
  if (!elSection02Result) throw Error("Couldn't find section02 result");

  // Checking Question01's Answer Here
  elQuestion01Answer.forEach((value) => {
    value.addEventListener("click", (e) => {
      // Plays the button clicking sound
      handleAudioObjects.audioHit.play();

      if (
        collectionOfFruitsObjArr[fruitIndex].question01CAnswer ===
        e.target.innerText
      ) {
        elSection02Result.innerText = "Nice! Correct Answer";
        score += 1;
      } else {
        elSection02Result.innerText = "Oops! Try Again";
      }
    });
  });

  // Checking Question02's Answer Here
  elQuestion02Answer.forEach((value) => {
    value.addEventListener("click", (e) => {
      // Plays the button clicking sound
      handleAudioObjects.audioHit.play();

      if (
        collectionOfFruitsObjArr[fruitIndex].question02CAnswer ===
        e.target.innerText
      ) {
        elSection02Result.innerText = "Wow! Genius";
        score += 1;
      } else {
        elSection02Result.innerText = "Oops! Try Again";
      }
    });
  });

  /**
   * Enabling Congratulations based on score value
   * If the score is >= 2 then success
   * If Success then we are enabling " Continue learning more"
   */
  elSubmit = document.getElementById("submit");
  if (!elSubmit) throw Error("Couldn't find submit button");

  elSubmit.addEventListener("click", () => {
    if (score >= 2) {
      // Plays the winning sound
      handleAudioObjects.audioWin.play();
      elSection02Result.innerText = "Congratulations!!!";
      cngrtsLetsContinueLearnMore(true);
    } else {
      cngrtsLetsContinueLearnMore(false);
    }
  });
};

/**
 * Responsible for handling all the audio related objects
 */
handleAudioObjects = {
  audioBGMusic: new Audio("./audio/Curious_Kiddo.mp3"),
  audioHit: new Audio("./audio/bash.wav"),
  audioWin: new Audio("./audio/win.mp3"),
};

// Document is ready Callback
(() => {
  console.log("Setting up Fruity");

  // Playing Background music on start
  handleAudioObjects.audioBGMusic.autoplay = true;
  handleAudioObjects.audioBGMusic.loop = true;
  handleAudioObjects.audioBGMusic.volume = 0.5;

  /**
   * Executing the collectionOfFruitsFunc() so that we get the array of fruit objects
   * The array is called collectionOfFruitsArr
   * We are using that in couple of other functions
   */
  collectionOfFruitsFunc();

  // Generates random fruit image on Stage1.html page load
  window.onload = generateRandomFruitImage();
  // Generates randomly generated FruitName on page load
  window.onload = generateRandomFruitName();
  // Generates randomly generated Fruits Information on page load
  window.onload = generateRandomFruitInformation();

  /**
   * We are getting the Shuffle button
   * If available then on Shuffle button clicked -->
   * 1.we are Generating random fruit image
   * 2.we are generating randomly generated FruitName
   */
  elShuffle = document.getElementById("shuffle");
  if (!elShuffle) throw Error("Couldn't find the shuffle button");
  elShuffle.addEventListener("click", () => {
    //Reloading the current document to reset everything
    location.reload();
    // Executing generateRandomFruitImage function here on shuffle clicked.
    generateRandomFruitImage();
    // Executing generateRandomFruitName function here on shuffle clicked.
    generateRandomFruitName();
    // Executing generateRandomFruitInformation function here on shuffle clicked.
    generateRandomFruitInformation();
  });

  // Executing the identify fruit name function
  identifyFruitName();
  // This function is generating questions based on About-Fruit Information
  generateQuestionsAndOptionsOnTheFruit();
  // This function is checking the correct answer of the generated questions based on About-Fruit Information
  checkGenerateQuestionsAnswer();
})();
