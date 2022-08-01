async function init() {
    let concurrencyMax = 6;
    const numberOfTasks = 20;
    const date = new Date();
    const timeStr = date.toLocaleTimeString('en-US', { hour12: false }).split(':');
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0);
    const current = new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeStr[0], timeStr[1])
    if (start <= current & current <= end) concurrencyMax = 4;
    const taskList = [...Array(numberOfTasks)].map(() =>
        [...Array(~~(Math.random() * 10 + 3))].map(() =>
            String.fromCharCode(Math.random() * (123 - 97) + 97)
        ).join(''));
    const counter = 0;
    const concurrencyCurrent = 0;
    console.log("[init] Concurrency Algo Testing...")
    console.log("[init] Tasks to process: ", taskList.length)
    console.log("[init] Task list: " + taskList)
    console.log("[init] Maximum Concurrency: ", concurrencyMax, "\n");
    await manageConcurrency(taskList.map(taskName => () => doTask(taskName)), counter, concurrencyMax, concurrencyCurrent)
}


var doTask = (taskName) => {
    var begin = Date.now();
    console.log("\x1b[31m", `[TASK] Starting : ${taskName}`, "\x1b[31m");
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var end = Date.now();
            var timeSpent = (end - begin) + "ms";
            console.log('\x1b[36m', "[TASK] FINISHED: " + taskName + " in " + timeSpent, '\x1b[0m');
            resolve(true);
        }, (Math.random() * 200));
    });
}



function manageConcurrency(taskList = [], counter = 0, concurrencyMax = 0, concurrencyCurrent = 0) {
    const tasksLength = taskList.length;
    const list = [...taskList];
    let remainingTasks = list.splice(concurrencyMax),
        concurrentTasks = list,
        toResolve = [],
        itrerator = 0;
    return new Promise(resolve => {
        // :: LOOP THROUGH TO CONCURRENT TASKS
        concurrentTasks.forEach(x => {
            let res = x(); // :: START CONCURRENT API REQUESTS
            toResolve.push(res);
            res.then(next);
        })
        function next() {
            if (concurrencyCurrent < concurrencyMax) concurrencyCurrent++ // :: INCREASE CURRENT CONCURRENCY WHILE ITS LESS THAN MAX CONCURRENCY
            counter++ // :: TASK COUNTER INCREAMENT BY 1
            console.log("\x1b[37m", `[EXE] Concurrency: ${concurrencyCurrent} of ${concurrencyMax}`, "\x1b[37m");
            console.log("\x1b[37m", `[EXE] Task Count: ${counter} of ${tasksLength}`, "\x1b[37m");
            // :: IF BLOCK WILL CHECK THE COUNT END CONCURRENT TASKS
            if (itrerator == remainingTasks.length) {
                resolve(Promise.all(toResolve)) // :: RESOLVE THE PENDING PROMISES (TASKS)
            } else {
                toResolve.push(remainingTasks[itrerator]().then(next))  // :: ADD TASKS INTO THE QUEUE WHICH NEEDS TO BE RESOLVE IN FUTURE
                itrerator++
            }
        }
    })
}


init();