function app() {
  this.name = "";
  this.desktop = "";
  this.twitter = new twitterObj("", "");
  this.startDate = "";
  this.endDate = "";
  this.events = [];
  this.pages = [];
}

function twitterObj(use, handle) {
  this.use = use;
  this.handle = handle;
}
  
function eventObj(name, description, location, longitude, latitude, startTime, endTime, prereg) {
  this.name = name;
  this.description = description;
  this.location = location;
  this.longitude = longitude;
  this.latitude = latitude;
  this.startTime = startTime;
  this.endTime = endTime;
  this.prereg = prereg;
}

function pageObj(name, tabBarText) {
  this.name = name;
  this.tabBarText = tabBarText;
  this.sections = [];
}

function sectionObj(header, body) {
  this.header = header;
  this.body = body;
}

