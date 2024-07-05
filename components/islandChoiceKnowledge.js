import { getImage, shuffle } from "../utils/utils.js";
import { addChoiceKnowledge } from "../firebase.js";
import config from "../config.js";

class IslandChoiceKnwoledge {
    constructor(docId, trialIndex, changePoints, callback) {
        this.docId = docId;
        this.trialIndex = trialIndex; // Track the current trial index
        this.changePoints = changePoints; // List of indices where changes occur
        this.callback = callback;
        this.lastTime = new Date().getTime();
        this.lastRT = 0;
        this.knowledge = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5];
        this.knowledge = shuffle(this.knowledge);
        this.isLastSelected = false;
    
        this.init();
    }    

    init() {
        document.body.innerHTML += `
        <div id="choiceKnowledgeDiv" class='w-screen h-screen grid place-content-center'>
            <div class='relative w-full'>
                <h1 class="text-2xl md:text-4xl text-center text-white mb-4">
                    What is the probability of this 
                    <span class="font-bold">
                        TREASURE BOX
                    </span>
                    winning you 10 coins on a <br> scale from 10% to 90%?
                </h1>
                <h2 class="text-white text-center text-base font-bold">Try your best! Higher accuracy on these ratings will increase your performance bonus</h2>
                <div class="flex justify-center items-center min-w-screen w-full min-h-[150px]">
                    <img id="choiceKnowledgeImg" src="./images/reward/reward_${getImage(this.knowledge[0])}.webp" class="w-64 md:w-64 mx-auto">
                </div>
                <div class='flex justify-center gap-2 mt-4'>
                    <button id='btn10' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>10%</button>
                    <button id='btn20' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>20%</button>
                    <button id='btn30' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>30%</button>
                    <button id='btn40' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>40%</button>
                    <button id='btn50' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>50%</button>
                    <button id='btn60' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>60%</button>
                    <button id='btn70' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>70%</button>
                    <button id='btn80' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>80%</button>
                    <button id='btn90' class='px-4 py-3 text-white bg-blue-500 font-bold rounded-lg hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed'>90%</button>
                </div>
                <div class='flex justify-between text-white px-16'>
                    <div class='flex flex-col justify-center items-center'>
                        <h1 class='text-2xl'>10%</h1>
                        <h1 class='text-xl'>Low probability</h1>
                    </div>
                    <div class='flex flex-col justify-center items-center'>
                        <h1 class='text-2xl'>90%</h1>
                        <h1 class='text-xl'>High probability</h1>
                    </div>
                </div>
            </div>
        </div>
        `;

        this.addEventListeners();
    }

    checkTime() {
        let currentTime = new Date().getTime();
        this.lastRT = currentTime - this.lastTime;
        if (currentTime - this.lastTime > 1000) {
            this.lastTime = currentTime;
            return true;
        }
        return false;
    }

    addEventListeners() {
        let btn10 = document.getElementById('btn10');
        let btn20 = document.getElementById('btn20');
        let btn30 = document.getElementById('btn30');
        let btn40 = document.getElementById('btn40');
        let btn50 = document.getElementById('btn50');
        let btn60 = document.getElementById('btn60');
        let btn70 = document.getElementById('btn70');
        let btn80 = document.getElementById('btn80');
        let btn90 = document.getElementById('btn90');

        let that = this;
        btn10.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(10);
        });

        btn20.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(20);
        });

        btn30.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(30);
        });

        btn40.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(40);
        });

        btn50.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(50);
        });

        btn60.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(60);
        });

        btn70.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(70);
        });

        btn80.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(80);
        });

        btn90.addEventListener('click', () => {
            if (!that.checkTime() || that.isLastSelected) {
                return;
            }

            that.selectedChoice(90);
        });
    }

    selectedChoice(selected) {
        let displayed = `reward_${getImage(this.knowledge[0])}`;
        this.isLastSelected = true;
        this.knowledge.shift();
        this.saveData(displayed, selected, this.lastRT, () => {
            if (this.knowledge.length == 0) {
                this.removeChoiceKnowledge();
                return;
            } else {
                let that = this;
                setTimeout(() => {
                    that.isLastSelected = false;
                    that.updateKnowledge(that.knowledge);
                    that.updateButtons();
                }, 1000 * config.START_CHOICE_KNOWLEDGE_TIME);
            }
            this.updateButtons();
        });

        this.updateButtons();
    }

    updateButtons() {
        let btn10 = document.getElementById('btn10');
        let btn20 = document.getElementById('btn20');
        let btn30 = document.getElementById('btn30');
        let btn40 = document.getElementById('btn40');
        let btn50 = document.getElementById('btn50');
        let btn60 = document.getElementById('btn60');
        let btn70 = document.getElementById('btn70');
        let btn80 = document.getElementById('btn80');
        let btn90 = document.getElementById('btn90');

        if (this.isLastSelected) {
            btn10.disabled = true;
            btn20.disabled = true;
            btn30.disabled = true;
            btn40.disabled = true;
            btn50.disabled = true;
            btn60.disabled = true;
            btn70.disabled = true;
            btn80.disabled = true;
            btn90.disabled = true;
        }
        else {
            btn10.disabled = false;
            btn20.disabled = false;
            btn30.disabled = false;
            btn40.disabled = false;
            btn50.disabled = false;
            btn60.disabled = false;
            btn70.disabled = false;
            btn80.disabled = false;
            btn90.disabled = false;
        }
    }

    updateKnowledge(knowledge) {
        if (this.changePoints.includes(this.trialIndex)) {
            // Apply specific changes for this change point, e.g., change the sequence or display new probabilities
            this.knowledge = this.adjustKnowledge(this.knowledge);
        }
    
        let choiceKnowledgeImg = document.getElementById('choiceKnowledgeImg');
        choiceKnowledgeImg.src = `./images/reward/reward_${getImage(knowledge[0])}.webp`;
        this.trialIndex++; // Increment the trial index
    }
    


    saveData(displayed, selected, rt, callback) {
        let savingText = document.createElement("h1");
        savingText.style.position = "absolute";
        savingText.style.bottom = "1%";
        savingText.style.left = "1%";
        savingText.style.color = "white";
        savingText.style.fontSize = "1rem";
        savingText.innerHTML = "Saving...";
        document.body.appendChild(savingText);

        let that = this;

        addChoiceKnowledge(that.docId, {
            trialNumber: 12 - that.knowledge.length,
            displayedMachine: [displayed, "reward"],
            selectedMachine: selected,
            rt: rt / 1000 + 's',
        }, () => {
            savingText.remove();

            if (callback) {
                callback();
            }
        })
    }

    removeChoiceKnowledge() {
        let choiceKnowledgeDiv = document.getElementById('choiceKnowledgeDiv');
        choiceKnowledgeDiv.remove();

        this.callback();
    }
}

export default IslandChoiceKnwoledge;