class Checker {
  constructor(callback) {
      this.prolificpId = null;
      this.studyid = null;
      this.sessionid = null;
      this.callback = callback;

      this.init();
  }

  init() {
      let error = false;
      let params = window.location.search;
      if (params.length > 0) {
          params = params.substring(1);
          params = params.split('&');
          params.forEach(param => {
              let key = param.split('=')[0];
              let value = param.split('=')[1];
              if (key === 'PROLIFIC_PID') {
                  this.prolificpId = value;
              }
              if (key === 'STUDY_ID') {
                  this.studyid = value;
              }
              if (key === 'SESSION_ID') {
                  this.sessionid = value;
              }
          });

          if (this.prolificpId.length === 24 && this.studyid.length > 0 && this.sessionid.length > 0) {
              this.callback(this.prolificpId, this.studyid, this.sessionid, error);
          }
          else {
              error = true;
          }
      }
      else {
          error = true;
      }


      if (error) {
          document.body.innerHTML += `
          <div id="error" class="text-white w-screen h-screen overflow-hidden grid place-content-center">
              <h1 class="text-4xl font-bold text-center">Error Found</h1>
              <p class="text-2xl text-center">Please return to Prolific and try again.</p>
          </div>
          `;

          this.callback(null, null, null, error);
      }
  }
}

export default Checker;
  