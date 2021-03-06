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
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.error("error: ", request.error);
};

function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");
  pendingStore.add(record);
}

function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");
  const pendingStore = transaction.objectStore("pending");
  const getAll = pendingStore.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(() => {
          const transaction = db.transaction(["pending"], "readwrite");
          const pendingStore = transaction.objectStore("pending");
          pendingStore.clear();
        });
    }
  };
}

window.addEventListener("online", checkDatabase);
