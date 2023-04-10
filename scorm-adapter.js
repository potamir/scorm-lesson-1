try {
  document.domain =
    location.hostname === "localhost" ? "localhost" : "satukelas.space";
} catch (error) {
  console.log(error);
}

const qsa = window.location.search.split("&");
const urlScorm = "scorm/index.html?id=" + qsa[0].substring(10);
document.getElementById(
  "iframeWrapper"
).innerHTML = `<iframe id="sco" src=${urlScorm} width="100%" height="600px"></iframe>`;

const Adapter = {
  onScore: function (score) {
    // add HTTP call to save percentage score here
    console.log("score:" + score);
    // alert("score:" + score);
    myHeaders = new Headers({
      Authorization: "Basic " + qsa[1].substring(6),
      "Content-Type": "application/json",
    });
    fetch("https://api.satukelas.space/api/v2/scorms/score", {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify({
        id: qsa[2].substring(3),
        score: score,
      }),
    })
      .then((res) => res.json())
      .then((finalRes) => console.log(finalRes));
  },

  onSuspendData: function (data) {
    // add HTTP call to save TOEIC score details here
    // alert("suspend data: " + data);
    // window.top.postMessage(JSON.stringify(data), "*");
  },

  onSessionTime: function (time) {
    // add HTTP call to set study time here
    // alert("session time: " + time);
    // window.top.postMessage(time, "*");
  },
};

// full implementation ref: https://github.com/moodle/moodle/blob/MOODLE_311_STABLE/mod/scorm/datamodels/scorm_12.js
window.API = {
  LMSSetValue: function (ele, val) {
    switch (ele) {
      case "cmi.core.score.raw":
        Adapter.onScore(val);
        break;
      case "cmi.suspend_data":
        Adapter.onSuspendData(val);
        break;
      case "cmi.core.session_time":
        Adapter.onSessionTime(val);
        break;
      default:
        console.log(ele, val);
    }
    return "true";
  },

  LMSInitialize: function () {
    return "true";
  },
  LMSFinish: function () {
    return "true";
  },
  LMSGetValue: function (ele) {
    return "";
  },
  LMSCommit: function () {
    return "true";
  },
  LMSGetLastError: function () {
    return "0";
  },
  LMSGetErrorString: function (errorCode) {
    return "No error";
  },
  LMSGetDiagnostic: function () {
    return "";
  },
};

/**
 * suspend data harusnya isi nya kayak gini: {"currentSection":0,"currentStage":0,"type":"attempt","score":57,"score_detail":{"scores":[{"correct":22,"total":50,"title":"Section 1: Listening Comprehension","score":44},{"correct":28,"total":40,"title":"Section 2: Structure and Written Expression","score":70},{"correct":30,"total":50,"title":"Section 3: Reading","score":60}]},"sha":"1@CDXf+O11VqjG5+ApNXbXK42IRJ4DscPX9D+Z90nloAU=","activity_name":"reading","section":3,"stage":0,"activity":5,"interaction":9,"timestamp":"2022-04-09T07:42:30.053
 */
