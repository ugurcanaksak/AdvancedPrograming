//"use strict";
function report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
    out.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1.classList.add("link");
        out.appendChild(n1); msg += id;
        //n1.addEventListener("click", doClick);
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        if (n1) n1.appendChild(n2);
    }
    console.log(msg);
}
const url = "https://maeyler.github.io/JS/data/";
function readData(file) {
    console.log("readData "+file);
    fetch(url+file)
        .then(r => r.text(), report)
        .then(addStudents, report);
}

function parseStudent(line) {
    let [id, name, gpa, ...list] = line.split("\t");
  /*let id = b[0], name = b[1], gpa = b[2];
    let list = [];
    for (let i=3; i<b.length; i++) list.push(b[i]);
  */
    return {id, name, gpa, list};
}

function addStudents(txt) {
    let msg = txt.length+" chars, ";
    let a = txt.split("\n");
    msg += a.length+" lines, ";
    for (let s of a) {
      let std = parseStudent(s);
      keys.push(std.id); vals.push(std);
    }
    report(msg + keys.length+" students");
}

function doClick(evt) {
    //console.log(evt);
    let t = evt.target;
    let s = t.innerText;
    if (/^\d+$/.test(s)) showStd(s); //s contains digits
    else if (t = t.firstElementChild) {
        t.style.visibility = "";
        let hide = function () {
            t.style.visibility = "hidden";
        };
        setTimeout(hide, 5000);
    }
}
function findID(id) {
    let i = keys.indexOf(id);
    if (i < 0) return null;
    return vals[i];
}

function showStd(id) {
    let t = id+" ";
    let std = findID(id);
    if (!std) {
        report(t+"not found"); return;
    }
    t += std.name+" ";
	console.log(std);
    report(t, std.list.length+" courses", std.list);
}

function studentsIn(code) {
    code = code.toUpperCase();
    let a = [];
    for (let std of vals) 
        if (std.list.includes(code)) 
            a.push(std.id+" "+std.name);
    if (a.length > 0)
        report(code+": ", a.length+" students", a);
    else report("No students in "+code);
}
function randomStd() {
    let i = Math.trunc(keys.length * Math.random());
    let b = vals[i];
    report("Random: "+b.name, b.id);
}
function findBest() {
    let b = vals[0];
    for (let std of vals) 
        if (std.gpa > b.gpa) b = std;
    report("Best: "+b.name, b.id);
}
function aboveGpa(gpaa){
	let counter=0;
	let temp=vals[0];
	for (let std of vals){
		if(std.gpa > gpaa){
			counter++;
		}
	}
	report(counter+" student is above this gpa");
	
}
//course codes

function parseCourse(line) {
    let [id, time, date, ...classes] = line.split("\t");
	
  /*let id = b[0], name = b[1], gpa = b[2];
    let list = [];
    for (let i=3; i<b.length; i++) list.push(b[i]);
  */
    return {id, time, date, classes};
}
function readData2(file2) {
    console.log("readData "+file2);
    fetch(url+file2)
        .then(r => r.text(), report)
        .then(addCourses, report);
}
function addCourses(txt) {
    let msg2 = txt.length+" chars, ";
    let a2 = txt.split("\n");
    msg2 += a2.length+" lines, ";
    for (let s2 of a2) {
      let crs = parseCourse(s2);
      keys2.push(crs.id); vals2.push(crs);
    }
    report(msg2 + keys2.length+" courses");
}
function findID2(id) {
    let i = keys2.indexOf(id);
    if (i < 0) return null;
    return vals2[i];
}
function showCrs(id) {
    let f = id+" ";
    let crs = findID2(id);
    if (!crs) {
        report(f+"not found"); return;
    }
    report(f, crs.classes.length+" classes", crs.classes);
}
function coursesIn(code) {
    code = code.toUpperCase();
    let a = [];
    for (let crs of vals2) 
        if (crs.classes.includes(code)) 
            a.push(std.id+" "+std.name);
    if (a.length > 0)
        report(code+": ", a.length+" course", a);
    else report("No course in "+code);
}
function randomCrs() {
    let rnd = Math.trunc(keys2.length * Math.random());
    let b = vals2[rnd];
    report("Random: "+b.id, b.time);
}
function examRoom(txt) {
	let arr=[];
	for (let crs of vals2){
		if(crs.classes.includes(txt)){
			arr.push(crs.id);
		}
	}
	report("courses for "+txt+" : "+arr);
		
}
    title.innerText = document.title;
    sample.innerText = readData+"\n"+addStudents;
    const keys = [], vals = [];
	const keys2 = [], vals2=[];
    readData("Students.txt")
	readData2("Courses.txt")