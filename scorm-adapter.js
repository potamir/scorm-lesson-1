const Adapter = {
  onScore: function (score) {
    // add HTTP call to save percentage score here
    console.log("score:" + score);
    alert("score:" + score);
    window.close();
  },

  onSuspendData: function (data) {
    // add HTTP call to save TOEIC score details here
    alert("suspend data: " + data);
  },

  onSessionTime: function (time) {
    // add HTTP call to set study time here
    alert("session time: " + time);
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
