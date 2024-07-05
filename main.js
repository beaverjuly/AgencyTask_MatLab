console.log("main.js is loaded");

import Checker from "./components/checker.js";
import Consents from "./components/consents.js";
import CreateSurveyLoading from "./components/createSurveyLoading.js";
import Instructions from "./components/instructions.js";
import IslandLotteries from "./components/islandLotteries.js";
import IslandChoiceKnowledge from "./components/islandChoiceKnowledge.js";
import TokensQuestion from "./components/tokensQuestion.js";
import config from "./config.js";
import { createSurvey } from "./firebase.js";
import { saveData } from "./data.js";

console.log("All imports loaded");

// Generate random change points for easy and hard trials between 28 and 35 trials
function generateChangePoints() {
  let changePoints = [];
  let totalTrials = 0;
  while (totalTrials < 180) {
    let changePoint = Math.floor(Math.random() * 8) + 28; // Random number between 28 and 35
    if (totalTrials + changePoint > 180) break;
    changePoints.push(totalTrials + changePoint);
    totalTrials += changePoint;
  }
  return changePoints;
}

const easyChangePoints = generateChangePoints();
const hardChangePoints = generateChangePoints();

const trialTypes = [];
let easyCount = 0;
let hardCount = 0;

// Ensure the total number of trials does not exceed 180 and alternate between easy and hard
for (let i = 0; i < 180; i++) {
  if (i % 2 === 0 && easyCount < easyChangePoints.length) {
    trialTypes.push('easy');
    easyCount++;
  } else if (hardCount < hardChangePoints.length) {
    trialTypes.push('hard');
    hardCount++;
  }

  if (trialTypes.length >= 180) break;
}

let trialIndex = 0;
let tokens = config.TOTAL_TOKENS;

new Consents(function () {
  console.log("Consents completed");
  new Checker(function (prolificpId, studyId, sessionId, error) {
    if (!error) {
      console.log("Checker completed without errors");
      let surveyLoading = new CreateSurveyLoading();
      createSurvey(prolificpId, studyId, sessionId, function (docId) {
        console.log("Survey created with docId:", docId);
        surveyLoading.remove();

        new Instructions(function () {
          console.log("Instructions completed");
          runIslandTrials(docId, tokens, prolificpId, studyId, sessionId);
        });
      });
    } else {
      console.error("Checker encountered an error:", error);
    }
  });
});

function runIslandTrials(docId, tokens, prolificpId, studyId, sessionId) {
  console.log("Running Island Trials, trialIndex:", trialIndex);
  new IslandLotteries(docId, tokens, trialIndex, easyChangePoints.concat(hardChangePoints), trialTypes, function (updatedTokens) {
    trialIndex++;
    if (trialIndex < trialTypes.length) {
      // Save data after each trial
      let data = {
        docId: docId,
        trialIndex: trialIndex,
        tokens: updatedTokens,
        trialType: trialTypes[trialIndex],
        subjectID: prolificpId, // or whatever identifier you use
        studyId: studyId,
        sessionId: sessionId
      };
      saveData(data);

      runIslandTrials(docId, updatedTokens, prolificpId, studyId, sessionId); // Continue to the next trial
    } else {
      console.log("Completed all island trials");
      // After completing all island trials
      new IslandChoiceKnowledge(docId, function () {
        new TokensQuestion(docId, prolificpId, studyId, sessionId, updatedTokens);
      });
    }
  });
}






