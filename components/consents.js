class Consents {
    constructor(callback) {
        this.consent1 = false;
        this.consent2 = false;
        this.consent3 = false;

        this.callback = callback;

        this.init();
    }

    init() {
        this.initConsent1();
    }

    initConsent1() {
        document.body.innerHTML += `
        <div id="consent01" class="text-white mx-auto mt-2 max-w-4xl py-4 px-2">
            <h2 class="text-xl font-bold text-blue-500">
                CONSENT FORM FOR IRB-FY2021-5210
            </h2>

            <h1 class="mt-2 text-3xl font-bold underline">
                Introduction
            </h1>
            <p>
                You have been invited to take part in a research study to learn more about learning and decision-making. 
                This study will be conducted by Dr. Catherine Hartley of the Department of Psychology at New York University, or by a designated member of her research staff. 
                You must be 18 years or older to participate in this study. 
            </p>

            <h1 class="mt-4 text-3xl font-bold underline">
                Confidentiality
            </h1>
            <p>
                Confidentiality of your research records will be strictly maintained by digitally and physically storing your identifiable information separately from your data. 
            </p>
    
             <h1 class="mt-4 text-3xl font-bold underline">
                Procedure
            </h1>
            <p>
                If you agree to be in this study, you will be asked to complete the following procedures.
            </p>

            <h1 class="mt-4 text-1xl font-bold">
                Behavioral Task
            </h1>
            <p>
                If you agree to participate in this study, you will be presented with repeated exposures of different
                stimuli
                and may be asked to do the following:
            </p>    
            <ul class="ml-10 list-disc list-inside">
                <li>
                    Make responses to the stimuli or merely observe them;
                </li>
                <li>
                    Understand that during the experiment you may win or lose money (any losses will be substracted from an
                    initial endowment.);
                </li>
                <li>
                    Complete some questionnaires related to the study.
                </li>               
            </ul>

            <h1 class="mt-4 text-3xl font-bold">
                Questionnaires
            </h1>
            <p>
            If you agree to participate in this study, you will be asked to complete some questionnaires related to the
            study. We will not share your analyzed questionnaire results with you. This is because these questionnaires
            are not diagnostic in nature, and are being administered for research, rather than clinical, purposes.
            </p>

            <h1 class="mt-4 text-3xl font-bold">
                Behavioral Assessments
            </h1>
            <p>
                In this study, we may ask you to allow your behavioral assessments to be recorded. These assessments
                include:
            </p>
            <ul class="ml-10 list-disc list-inside">
                <li>
                    Explicit choices between options
                </li>
                <li>
                    Other explicit evaluations of stimuli
                </li>
                <li>
                    Reaction times
                </li>
            </ul>

            <h3 class="font-bold">
                The study takes approximately 40 to 50 minutes.
            </h3>

            <h1 class="mt-4 text-3xl font-bold underline">
                Compensation
            </h1>
            <p>
                For completing the study today, you will receive $15. You may receive additional compensation depending on
                the
                responses you make.
            </p>

            <p class="mt-2 text-blue-500">
                <input id="agree1CB" type="checkbox" class="w-5 h-5">
                <label for="agree1CB" class="cursor-pointer">
                    I acknowledge that my data collected in the present testing session may be analyzed together with my
                    data
                    from another testing session, by other researchers in the Hartley Lab.
                </label>
            </p>

            <button id="consent01Btn"
                class="flex items-center gap-1 font-bold mt-2 bg-blue-500 text-white hover:brightness-125 px-6 py-2 text-xl rounded disabled:brightness-50 disabled:cursor-not-allowed">
                Continue
                <svg class="mt-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="20" height="20"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" fill="#ffffff" class="color000 svgShape"></path></svg></g></svg>
            </button>
        </div>
         `;
        this.consent1 = true;

        let agree1CB = document.getElementById("agree1CB");
        let consent01Btn = document.getElementById("consent01Btn");

        agree1CB.addEventListener("change", () => {
            this.checkConsent1();
        });

        consent01Btn.addEventListener("click", () => {
            if (this.checkConsent1()) {
                this.removeConsent1();
                this.initConsent2();
            }
        });

        this.checkConsent1();
    }

    initConsent2() {
        document.body.innerHTML += `
        <div id="consent02" class="text-white mx-auto mt-2 max-w-4xl py-4 px-2">
            <p class="mt-2">
                Since you will be receiving compensation for your involvement in this study, the fact that you participated in an experiment with the Hartley Lab, and the email address used for payment (where applicable), will be shared with New York University financial administrators. However, your data will only be accessible to researchers in the Hartley Lab.
            </p>
            <p>
                <span class="text-purple-500"> There are no known risks associated with your participation in this
                    research.</span> Although you will receive no
                direct benefits, this research may help the investigator understand more about learning and decision-making.
            </p>
            <p class="mt-2">
                Participation in this study is voluntary. <span class="text-purple-500">You may refuse to participate or
                    withdraw at any time
                    without penalty.</span> Should you withdraw before the end of the study, you will not receive payment.
                Please read the rest of this consent form for more information about the study.
            </p>
            <p class="mt-2">
                If you agree to participate in this study, <span class="text-purple-500">your data with all identifying
                    information removed, may be
                    made publicly available in an online database for re-analysis</span> by other researchers.
            </p>

            <p class="mt-2">
                This consent form has explained this study to you. If there is anything about the study or your participation that is unclear or that you do not understand, if you have questions, or if you wish to report a research-related problem, you may contact Dr. Catherine Hartley, 212-998-2104, cah369@nyu.edu, New York University, 6 Washington Place, Room 871, New York, NY 10003.
            </p>

            <p class="mt-2">
            For questions about your rights as a research participant, you may contact the Institutional Review Board (IRB), 665 Broadway, Suite 804, New York University, (212) 998-4808 or ask.humansubjects@nyu.edu. Please reference the study # (IRB-FY2021-5210) when contacting the IRB
            </p>

            <p class="mt-4">
                This consent form has explained this study to you. If there is anything about the study or your
                participation that is unclear or that you do not understand.
                You may print this page for your records.
            </p>

            <p class="font-bold mt-2">
                Please agree to the terms above to continue:
            </p>

            <p class="text-blue-500">
                <input type="checkbox" id="agree2CB" class="w-5 h-5">
                <label for="agree2CB" class="cursor-pointer">
                    I agree to participate
                </label>
            </p>
            <button id="consent02Btn"
                class="flex items-center gap-1 font-bold mt-2 bg-blue-500 text-white hover:brightness-125 px-6 py-2 text-xl rounded disabled:brightness-50 disabled:cursor-not-allowed">
                Continue
                <svg class="mt-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="20" height="20"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" fill="#ffffff" class="color000 svgShape"></path></svg></g></svg>
            </button>
        </div>
        `;
        this.consent2 = true;

        let agree2CB = document.getElementById("agree2CB");
        let consent02Btn = document.getElementById("consent02Btn");

        agree2CB.addEventListener("change", () => {
            this.checkConsent2();
        });

        consent02Btn.addEventListener("click", () => {
            if (this.checkConsent2()) {
                this.removeConsent2();
                this.initConsent3();
            }
        });

        this.checkConsent2();
    }

    initConsent3() {
        document.body.innerHTML += `
        <div id="consent03" class="text-white mx-auto mt-2 max-w-4xl py-4 px-2">
            <p class="text-xl">
                <span class="text-5xl text-green-500 font-bold">Great!</span> Before we start the game, please click on each
                box to
                confirm:
            </p>

            <p class="text-blue-500">
                <input type="checkbox" id="agree3CB" class="w-5 h-5">
                <label for="agree3CB" class="cursor-pointer">
                    My phone and other electronic devices that are not needed for this study are stored away or turned on silent.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree4CB" class="w-5 h-5">
                <label for="agree4CB" class="cursor-pointer">
                    I am in a quiet place with minimal distractions.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree5CB" class="w-5 h-5">
                <label for="agree5CB" class="cursor-pointer">
                    I am using a laptop or desktop computer to complete the study, and NOT a phone or tablet.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree6CB" class="w-5 h-5">
                <label for="agree6CB" class="cursor-pointer">
                    I am using Google Chrome or Safari.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree7CB" class="w-5 h-5">
                <label for="agree7CB" class="cursor-pointer">
                    I have quit out of any unnecessary programs on my computer.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree8CB" class="w-5 h-5">
                <label for="agree8CB" class="cursor-pointer">
                    If anyone is in the room with me, they will not interfere with the choices I make during the games.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree9CB" class="w-5 h-5">
                <label for="agree9CB" class="cursor-pointer">
                    I will NOT click "back" or "refresh" during the games, as I will lose my progress and not be able to finish the study.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree10CB" class="w-5 h-5">
                <label for="agree10CB" class="cursor-pointer">
                    I understand that if I stop the games part way through, I will NOT receive payment.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree11CB" class="w-5 h-5">
                <label for="agree11CB" class="cursor-pointer">
                    I will not click in and out of the window where the experiment is running or exit fullscreen during the
                games.
                </label>
            </p>
            <p class="text-blue-500">
                <input type="checkbox" id="agree12CB" class="w-5 h-5">
                <label for="agree12CB" class="cursor-pointer">
                    I understand that this study will take approximately 40-50 minutes.
                </label>
            </p>
            <button id="consent03Btn"
                class="flex items-center gap-1 font-bold mt-2 bg-blue-500 text-white hover:brightness-125 px-6 py-2 text-xl rounded disabled:brightness-50 disabled:cursor-not-allowed">
                Continue
                <svg class="mt-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1012"></defs><g id="SvgjsG1013"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="20" height="20"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" fill="#ffffff" class="color000 svgShape"></path></svg></g></svg>
            </button>
        </div>
        `;
        this.consent3 = true;

        let agree3CB = document.getElementById("agree3CB");
        let agree4CB = document.getElementById("agree4CB");
        let agree5CB = document.getElementById("agree5CB");
        let agree6CB = document.getElementById("agree6CB");
        let agree7CB = document.getElementById("agree7CB");
        let agree8CB = document.getElementById("agree8CB");
        let agree9CB = document.getElementById("agree9CB");
        let agree10CB = document.getElementById("agree10CB");
        let agree11CB = document.getElementById("agree11CB");
        let agree12CB = document.getElementById("agree12CB");
        let consent03Btn = document.getElementById("consent03Btn");

        agree3CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree4CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree5CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree6CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree7CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree8CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree9CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree10CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree11CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        agree12CB.addEventListener("change", () => {
            this.checkConsent3();
        });

        consent03Btn.addEventListener("click", () => {
            if (this.checkConsent3()) {
                this.removeConsent3();
            }
        });

        this.checkConsent3();
    }

    checkConsent1() {
        if (this.consent1) {
            let agree1CB = document.getElementById("agree1CB");
            let consent01Btn = document.getElementById("consent01Btn");

            if (agree1CB.checked) {
                consent01Btn.disabled = false;
                return true;
            }
            else {
                consent01Btn.disabled = true;
            }
        }
        return false;
    }

    checkConsent2() {
        if (this.consent2) {
            let agree2CB = document.getElementById("agree2CB");
            let consent02Btn = document.getElementById("consent02Btn");

            if (agree2CB.checked) {
                consent02Btn.disabled = false;
                return true;
            }
            else {
                consent02Btn.disabled = true;
            }
        }
        return false;
    }

    checkConsent3() {
        if (this.consent3) {
            let agree3CB = document.getElementById("agree3CB");
            let agree4CB = document.getElementById("agree4CB");
            let agree5CB = document.getElementById("agree5CB");
            let agree6CB = document.getElementById("agree6CB");
            let agree7CB = document.getElementById("agree7CB");
            let agree8CB = document.getElementById("agree8CB");
            let agree9CB = document.getElementById("agree9CB");
            let agree10CB = document.getElementById("agree10CB");
            let agree11CB = document.getElementById("agree11CB");
            let agree12CB = document.getElementById("agree12CB");
            let consent03Btn = document.getElementById("consent03Btn");

            if (agree3CB.checked && agree4CB.checked && agree5CB.checked && agree6CB.checked && agree7CB.checked && agree8CB.checked && agree9CB.checked  && agree10CB.checked  && agree11CB.checked && agree12CB.checked ) {
                consent03Btn.disabled = false;
                return true;
            }
            else {
                consent03Btn.disabled = true;
            }
        }
        return false;
    }

    removeConsent1() {
        if (this.consent1) {
            let consent01 = document.getElementById("consent01");
            consent01.remove();
            this.consent1 = false;
        }
    }

    removeConsent2() {
        if (this.consent2) {
            let consent02 = document.getElementById("consent02");
            consent02.remove();
            this.consent2 = false;
        }
    }

    removeConsent3() {
        if (this.consent3) {
            let consent03 = document.getElementById("consent03");
            consent03.remove();
            this.consent3 = false;

            this.callback();
        }
    }
}

export default Consents;