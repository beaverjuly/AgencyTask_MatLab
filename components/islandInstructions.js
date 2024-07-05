import config from "../config.js";

class Islandnstructions {
  constructor(callback) {
    this.choicesCount = 0;
    this.lastChoice = -1;
    this.type = "island";
    this.total = 33;
    this.currentInstruction = 1;
    this.callback = callback;
    this.lastTime = new Date().getTime();

    this.keyDownHandler = null;

    this.init();
  }

  init() {
    // full screen
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }

    document.body.innerHTML += `
        <div id="surveyInstructions" class="w-screen text-white h-screen grid place-content-center">
            <div class="flex flex flex-col justify-center items-center gap-2">
                <img id='instImg' style="width: 90vw; height: 90vh; object-fit: contain;" src='/images/instructions/${this.type}/(${this.currentInstruction}).webp'>
                <div id="buttons" class='absolute bottom-6 left-[50%] flex gap-2 justify-center items-center' style='transform: translate(-50%,-50%);'>
                    <button id='previous' class='shadow bg-blue-500 hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed text-white focus:shadow-outline focus:outline-none py-2 px-10 rounded'>Pervious</button>
                    <button id='next' class='shadow bg-blue-500 hover:brightness-125 disabled:brightness-50 disabled:cursor-not-allowed text-white focus:shadow-outline focus:outline-none py-2 px-10 rounded'>Next</button>
                </div>
            </div>
        </div>
        `;

    this.addEventListeners();
    this.updateInstruction();
  }

  checkTime() {
    let currentTime = new Date().getTime();
    if (
      currentTime - this.lastTime >
      1000 * config.NEXT_INSTRUCTION_SHOW_TIME
    ) {
      this.lastTime = currentTime;
      return true;
    }
    return false;
  }

  addEventListeners() {
    let next = document.getElementById("next");
    let previous = document.getElementById("previous");

    next.addEventListener("click", () => this.nextInstruction());
    previous.addEventListener("click", () => this.previousInstruction());

    let that = this;
    this.keyDownHandler = (e) => {
      if (e.key === " ") {
        if (that.currentInstruction === that.total) {
          that.removeInstructions();
        }
      }

      if (e.key === "1") {
        if (that.currentInstruction === 18 || that.currentInstruction === 22) {
          that.currentInstruction = 23;
        } else if (that.currentInstruction === 23) {
          that.currentInstruction = 24;
        }
        that.updateInstruction();
      } else if (e.key === "2") {
        if (that.currentInstruction === 18 || that.currentInstruction === 22) {
          that.currentInstruction = 19;
        } else if (that.currentInstruction === 23) {
          that.currentInstruction = 24;
        }
        else if (that.currentInstruction === 19) {
          that.currentInstruction = 20;
        }
        that.updateInstruction();
      }
    };

    document.addEventListener("keydown", this.keyDownHandler);
  }

  previousInstruction() {
    if (!this.checkTime()) {
      return;
    }

    if (this.currentInstruction === 1 || this.currentInstruction === 25) {
      return;
    }

    this.currentInstruction--;
    this.updateInstruction();
  }

  nextInstruction() {
    if (!this.checkTime()) {
      return;
    }

    if (this.currentInstruction === 21) { // Choice - 0
      if (this.choicesCount === 0) {
        this.choicesCount++;
        this.lastChoice = 0;
        this.currentInstruction = 22;
      } else if (this.choicesCount === 1 && this.lastChoice === 1) {
        this.currentInstruction = 26;
      } else if (this.choicesCount === 1 && this.lastChoice === 0) {
        this.currentInstruction = 22;
      }
    } else if (this.currentInstruction === 25) { // Choice - 1
      if (this.choicesCount === 0) {
        this.choicesCount++;
        this.lastChoice = 1;
        this.currentInstruction = 22;
      } else if (this.choicesCount === 1 && this.lastChoice === 0) {
        this.currentInstruction = 26;
      } else if (this.choicesCount === 1 && this.lastChoice === 1) {
        this.currentInstruction = 22;
      }
    } else {
      this.currentInstruction++;
    }

    this.updateInstruction();
  }

  updateInstruction() {
    let instImg = document.getElementById("instImg");
    instImg.src = `./images/instructions/${this.type}/(${this.currentInstruction}).webp`;

    let next = document.getElementById("next");
    let previous = document.getElementById("previous");
    let buttons = document.getElementById("buttons");

    if (
      this.currentInstruction === 18 ||
      this.currentInstruction === 19 ||
      this.currentInstruction === 22 ||
      this.currentInstruction === 23
    ) {
      buttons.style.visibility = "hidden";
    } else {
      buttons.style.visibility = "visible";
    }

    next.disabled = true;
    previous.disabled = true;

    var that = this;
    setTimeout(() => {
      if (
        that.currentInstruction === 1 ||
        that.currentInstruction === 20 ||
        that.currentInstruction === 24 ||
        that.currentInstruction === 26
      ) {
        previous.disabled = true;
      } else {
        previous.disabled = false;
      }

      if (that.currentInstruction === this.total) {
        next.disabled = true;
      } else {
        next.disabled = false;
      }
    }, 1000 * config.NEXT_INSTRUCTION_SHOW_TIME);
  }

  removeInstructions() {
    let instructions = document.getElementById("surveyInstructions");
    instructions.remove();

    document.removeEventListener("keydown", this.keyDownHandler);

    this.callback();
  }
}

export default Islandnstructions;