let db;

const request = indexedDB.open("budget", 1);
// request onupgradeneeded, onsuccess, and onerror EVENTS
request.onupgradeneeded = function (event) {
  db = event.target.result;
  const objectStore = db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;
  //navigator.onLine returns true/false based on whether application is on line or not. If not online, this function will not be checked.
  if (navigator.onLine) {
    //call a function that checks the offline database
  }
};

request.onerror = function (event) {
  console.error("error: ", request.error);
};
