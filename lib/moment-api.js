
function createDateObjectSpecificTZ() {
    moment.tz("2013-08-26 16:55:00", "America/Los_Angeles")
    // moment().toDate();
}

function momentChinaTime(date) {
    return moment(date).tz("Asia/Shanghai");
}

function setMomentHrMinSec(momentTime, hr, min, sec) {
    momentTime.set('hour', hr);
    momentTime.set('minute', min);
    momentTime.set('second', sec);
    return momentTime;
}

function modifyDisplayEvents(chinaEvents) {
    //构建一个本地的虚拟时间来显示中国时间
    let vertualEvents = [];
    let copyEvents = JSON.parse(JSON.stringify(chinaEvents));
    //减去跟东八区的时差
    let tzDiffFromChinaTime =  (new Date().getTimezoneOffset() - (-480)) * 60 * 1000;
    copyEvents.map(event => {
      let s = event.start;
      let e = event.end;
      let new_s = new Date(new Date(s).getTime() + tzDiffFromChinaTime);
      let new_e = new Date(new Date(e).getTime() + tzDiffFromChinaTime);
      vertualEvents.push({
        'start': new_s.toISOString(),
        'end': new_e.toISOString(),
        'id': event.id,
        'color': event.color ? event.color : "",
        'dbId': event.dbId ? event.dbId : "",
        'status': event.status ? event.status : "",
        'title': event.title ? event.title : "",
        'deliver_type': event.deliver_type ? event.deliver_type : "",
        'course_type': event.course_type ? event.course_type : "",
        'target_score': event.target_score ? event.target_score : "",
        'student_name': event.student_name ? event.student_name : "",
        'contact': event.contact ? event.contact : ""
      })
    })
    return vertualEvents;
  }

  function modifyDisplayEvent(chinaEvent) {
    //构建一个本地的虚拟时间来显示中国时间
    let copyEvent = JSON.parse(JSON.stringify(chinaEvent));
    //减去跟东八区的时差
    let tzDiffFromChinaTime =  (new Date().getTimezoneOffset() - (-480)) * 60 * 1000;
    let s = copyEvent.start;
    let e = copyEvent.end;
    let new_s = new Date(new Date(s).getTime() + tzDiffFromChinaTime);
    let new_e = new Date(new Date(e).getTime() + tzDiffFromChinaTime);
    let vertualEvent = {
        'start': new_s.toISOString(),
        'end': new_e.toISOString(),
        'id': copyEvent.id,
        'color': copyEvent.color ? copyEvent.color : "",
        'dbId': copyEvent.dbId ? copyEvent.dbId : "",
        'status': copyEvent.status ? copyEvent.status : "",
        'title': copyEvent.title ? copyEvent.title : "",
        'deliver_type': copyEvent.deliver_type ? copyEvent.deliver_type : "",
        'course_type': copyEvent.course_type ? copyEvent.course_type : "",
        'target_score': copyEvent.target_score ? copyEvent.target_score : "",
        'student_name': copyEvent.student_name ? copyEvent.student_name : "",
        'contact': copyEvent.contact ? copyEvent.contact : ""
    };
    return vertualEvent;
  }

  function recoverDisplayEvent(vertualEvent) {
    //从虚拟时间还原成真实时间
    let copyEvent = JSON.parse(JSON.stringify(vertualEvent));
    //东八区减去当地时间的时差
    let tzDiffFromLocalTime =  ((-480) - new Date().getTimezoneOffset()) * 60 * 1000;
    let s = copyEvent.start;
    let e = copyEvent.end;
    let new_s = new Date(new Date(s).getTime() + tzDiffFromLocalTime);
    let new_e = new Date(new Date(e).getTime() + tzDiffFromLocalTime);
    let realEvent = {
        'start': new_s.toISOString(),
        'end': new_e.toISOString(),
        'id': copyEvent.id ? copyEvent.id : "",
        'color': copyEvent.color ? copyEvent.color : "",
        'dbId': copyEvent.dbId ? copyEvent.dbId : "",
        'status': copyEvent.status ? copyEvent.status : "",
        'title': copyEvent.title ? copyEvent.title : "",
        'deliver_type': copyEvent.deliver_type ? copyEvent.deliver_type : "",
        'course_type': copyEvent.course_type ? copyEvent.course_type : "",
        'target_score': copyEvent.target_score ? copyEvent.target_score : "",
        'student_name': copyEvent.student_name ? copyEvent.student_name : "",
        'contact': copyEvent.contact ? copyEvent.contact : ""
    };
    return realEvent;
  }
