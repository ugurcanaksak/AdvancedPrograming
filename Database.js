class Course{
 constructor(id,time,date,course){
  this.id=id;
  this.time=time;
  this.date=date;
  this.course=course;
 }
 toString(){
   return "Course's id is "+this.id;
  }
}

class Student{
 constructor(id,name,gpa,course){
 this.id=id
 this.name=name
 this.gpa=gpa
 this.course=course
 }
 toString(){
 return "Student's name is"+this.name+" it's id is "+this.id;
 }
}

