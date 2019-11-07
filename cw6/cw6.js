"use strict";
const RDR2 = new FileReader();
RDR2.onload = function() { display(RDR2) };
var arr=[];
function fileSelect(t) { 
//target t is the file selection HTMLInputElement
    let a = t.files;
    let counter=0; //display(t);
    for(let i of a){
        console.log(i);
        arr[counter]=i.toString();
        counter++;
    }
}
async function ReadFile(url){
    console.log("cp2")
let res =await fetch(url);
let json=await res.text();
console.log("cp3")
for(let i=0;i<arr.length;i++){
    console.log("cp1")
    if(json.localeCompare(arr[i])){
        console.log("aynı")
    }else console.log("deil")
}

}

class Async {//extends Menu {
  constructor() {
    //super();
    this.navigator = navigator;
    this.clipboard = navigator.clipboard;
    this.geolocation = navigator.geolocation;
    this.reader = RDR2  //defined above
  }
  isTextFile(f) {
    console.assert(f instanceof File);
    return f.type.startsWith("text") || f.name.endsWith(".md")
         || f.name.endsWith(".js") || f.name.endsWith(".java");
  }
  displayFile(f) {
    console.assert(f instanceof File); let M = this;
    console.log(f.name+" "+f.size+" bytes "+f.type);
    if (f.type.startsWith("image")) {
        RDR2.onload = function(evt) {
           // M.displayImage(RDR2.result)
        };
        RDR2.readAsDataURL(f);
    } else if (this.isTextFile(f)) {
        RDR2.onload = function(evt) {
            //M.displayText(RDR2.result)
        };
        RDR2.readAsText(f);
    } else {
        this.displayText("Unknown")
    }
  }
  displayText(txt) {
    disp1.innerText = txt; disp2.src = ""; 
    return disp1
  }
  displayImage(url) {
    disp1.innerText = ""; disp2.src = url; 
    return disp2
  }
}

