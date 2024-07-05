class IslandLotteries {
    constructor(docId, tokens, trialIndex, changePoints, trialTypes, callback) {
      this.docId = docId;
      this.tokens = tokens;
      this.trialIndex = trialIndex;
      this.changePoints = changePoints;
      this.trialTypes = trialTypes;
      this.callback = callback;
  
      // Initialize state variables
      this.leftBandit = null;
      this.rightBandit = null;
      this.tokenOffer = null;
      this.agency = null;
      this.selectedBandit = null;
      this.reward = null;
      this.trialData = {};
  
      this.init();
    }
  
    init() {
      document.body.innerHTML += `
        <div id="islandLotteries" class='w-screen h-screen grid place-content-center'></div>
      `;
      this.startNewTrial();
      this.addEventListeners();
    }
  
    startNewTrial() {
      // Example logic to set up the trial
      let condition = this.getTrialCondition();
      this.setBandits(condition);
      this.tokenOffer = this.getTokenOffer(condition);
  
      // Adjust probabilities based on change points
      let baseProbabilities = { left: 0.5, right: 0.5 }; // Example base probabilities
      let adjustedProbabilities = this.adjustProbabilities(baseProbabilities);
  
      // Display trial setup
      this.showTrialSetup(adjustedProbabilities);
  
      // Wait for agency selection
      this.waitForAgencySelection();
    }
  
    getTrialCondition() {
      // Logic to determine trial condition
      return this.trialTypes[this.trialIndex];
    }
  
    setBandits(condition) {
      // Logic to assign left and right bandits based on condition
      let bandits = this.shuffle(condition === 'easy' ? ['bandit50a', 'bandit50b'] : ['bandit70', 'bandit30']);
      this.leftBandit = bandits[0];
      this.rightBandit = bandits[1];
    }
  
    getTokenOffer(condition) {
      // Logic to determine token offer
      return Math.floor(Math.random() * 10) + 1; // Example token offer
    }
  
    showTrialSetup(adjustedProbabilities) {
      let islandLotteries = document.getElementById("islandLotteries");
      islandLotteries.innerHTML = `
        <div class="relative w-screen h-full flex justify-center">
          <div class="absolute center">
            <div class="text-white">Choose an option:</div>
            <div class="text-white">RANDOM + ${this.tokenOffer} tokens</div>
            <div class="text-white">I WANT TO CHOOSE</div>
            <div class="text-white">Probabilities: Left - ${adjustedProbabilities.left}, Right - ${adjustedProbabilities.right}</div>
          </div>
        </div>
      `;
    }
  
    adjustProbabilities(baseProbabilities) {
      let adjustedProbabilities = { ...baseProbabilities };
  
      // Check if the current trial index is a change point
      if (this.changePoints.includes(this.trialIndex)) {
        // Swap the probabilities without changing the images
        [adjustedProbabilities.left, adjustedProbabilities.right] = [adjustedProbabilities.right, adjustedProbabilities.left];
      }
  
      return adjustedProbabilities;
    }
  
    waitForAgencySelection() {
      let that = this;
      document.addEventListener("keydown", function agencyHandler(e) {
        if (e.key === "1") {
          that.agency = 0; // Computer chooses
          that.trialData.agencyResp = 1;
        } else if (e.key === "2") {
          that.agency = 1; // Participant chooses
          that.trialData.agencyResp = 2;
        }
        that.trialData.agencyRT = new Date().getTime(); // Example timing data
        document.removeEventListener("keydown", agencyHandler);
  
        that.showBanditSelection();
      });
    }
  
    showBanditSelection() {
      let islandLotteries = document.getElementById("islandLotteries");
      islandLotteries.innerHTML = `
        <div class="relative w-screen h-full flex justify-center">
          <div class="absolute center">
            <div class="text-white">${this.agency === 1 ? "YOU CHOOSE:" : "COMPUTER CHOOSES:"}</div>
            <div class="text-white">Left: ${this.leftBandit}</div>
            <div class="text-white">Right: ${this.rightBandit}</div>
          </div>
        </div>
      `;
  
      if (this.agency === 1) {
        // Wait for participant's choice
        this.waitForBanditSelection();
      } else {
        // Computer chooses bandit
        this.computerSelectsBandit();
      }
    }
  
    waitForBanditSelection() {
      let that = this;
      document.addEventListener("keydown", function banditHandler(e) {
        if (e.key === "1") {
          that.selectedBandit = that.leftBandit;
          that.trialData.banditResp = 1;
        } else if (e.key === "2") {
          that.selectedBandit = that.rightBandit;
          that.trialData.banditResp = 2;
        }
        that.trialData.banditRT = new Date().getTime(); // Example timing data
        document.removeEventListener("keydown", banditHandler);
  
        that.showOutcome();
      });
    }
  
    computerSelectsBandit() {
      // Logic for computer to choose a bandit
      this.selectedBandit = Math.random() > 0.5 ? this.leftBandit : this.rightBandit;
      this.trialData.banditResp = this.selectedBandit === this.leftBandit ? 1 : 2;
  
      this.showOutcome();
    }
  
    showOutcome() {
      // Logic to determine the reward
      this.reward = Math.random() > 0.5 ? 1 : 0; // Example reward logic
  
      let islandLotteries = document.getElementById("islandLotteries");
      islandLotteries.innerHTML = `
        <div class="relative w-screen h-full flex justify-center">
          <div class="absolute center">
            <div class="text-white">${this.reward === 1 ? "YOU WON 10 TOKENS!" : "YOU LOST!"}</div>
            <div class="text-white">Total Tokens: ${this.tokens + (this.reward * 10)}</div>
          </div>
        </div>
      `;
  
      // Perform the calculations and update the trial data
      this.performCalculations();
  
      // Save data and proceed to the next trial
      this.trialData.reward = this.reward;
      this.trialData.tokensEarned = this.tokens + (this.reward * 10);
      this.saveData(this.trialData, () => {
        this.callback(this.tokens);
      });
    }
  
    performCalculations() {
      const leftBanditValue = this.getBanditValue(this.leftBandit);
      const rightBanditValue = this.getBanditValue(this.rightBandit);
  
      // Calculate EV_choose and EV_comp
      const EV_choose = Math.max(leftBanditValue, rightBanditValue);
      const EV_comp = 0.5 * (leftBanditValue + rightBanditValue) + 0.1 * this.tokenOffer;
  
      this.trialData.EV_choose = EV_choose;
      this.trialData.EV_comp = EV_comp;
  
      // Record EV of selected and non-selected actions
      if (this.agency === 1) { // opted to choose
        this.trialData.EV_selectedAction = EV_choose;
        this.trialData.EV_nonselectedAction = EV_comp;
      } else { // accepted offer
        this.trialData.EV_selectedAction = EV_comp;
        this.trialData.EV_nonselectedAction = EV_choose;
      }
  
      this.trialData.EV_selectedMinusNonselected = this.trialData.EV_selectedAction - this.trialData.EV_nonselectedAction;
  
      // Determine optimality
      if (EV_choose > EV_comp) {
        this.trialData.optimalToChoose = 1;
        this.trialData.optimal = this.agency === 1 ? 1 : -1;
      } else if (EV_choose < EV_comp) {
        this.trialData.optimalToChoose = 0;
        this.trialData.optimal = this.agency === 0 ? 1 : -1;
      } else {
        this.trialData.optimal = 0;
      }
  
      // Update value estimate of selected bandit
      this.updateValueEstimate(this.selectedBandit);
    }
  
    getBanditValue(bandit) {
      // Retrieve the value estimate of the bandit from some stored data
      // This is a placeholder implementation
      return Math.random() * 10; // Example value
    }
  
    updateValueEstimate(bandit) {
      // Update the value estimate of the selected bandit
      // This is a placeholder implementation
    }
  
    saveData(data, callback) {
      fetch('http://localhost:3000/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Data saved successfully:', data);
        if (callback) callback();
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        if (callback) callback();
      });
    }
  
    shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  
    addEventListeners() {
      // Add any additional event listeners if necessary
    }
  }
  
  export default IslandLotteries;
  
  