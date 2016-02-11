import express from 'express';
import Maths from './lib/Maths';
import {pi, multi, sqrt} from './lib/Func';

const route = express.Router();

route.use((req, res, next) => {
  console.log("Time access ES6: ", Date.now());
  next();
});

//Arrow Function
route.get('/arrow', (req,res) => {
    let nums = [2,4,6];
    let numAddTwo = nums.map(n => n + 2);
    res.send(numAddTwo);
});

//Destructured Assignment
route.get('/destructuring', (req, res) => {
  let [x,y, ...props1] = [1,2,3,4,5,6];
  let {a,b, ...props2} = {b:2, a: 1, c: 3, d:{k:4} };
  let {c,d} = props2;
  res.send({x: x, y: y, props1: props1, props2: props2, a: a, b: b, c: c, d: d});
});

//class
class Animal {
  constructor(name, legs){
    this.legs = legs;
    this.name = name;
  }
  showLegs(){
    console.log("Legs: ", this.legs);
  }
  showName(){
    console.log("Name: ", this.name);
  }

}
class Dog extends Animal{
  constructor(name, legs, sound){
    super(name, legs);
    this.sound = sound;
  }
  eat(){
    super.showName();
    console.log("eating ...");
  }
}

route.get('/class', (req, res) => {

  let d = new Dog("Milu", 3, "gaugau");
  d.eat();
    res.json({legs: d.legs, name: d.name, sound: d.sound});
});

//Generator
route.get('/generator', (req, res) => {
  function* countdown(count) {
    while (count > 0){
      yield count;
      count -= 1;
    }
  }
  var countdown = countdown(5);
  var arr = [];
  for(let num of countdown){
    arr.push(num);
  }
  res.send(arr);
});

route.get('/generator1', (req, res) => {
  function* greet(){
    let friendly = yield "How ";
    friendly = yield friendly + " are";
    yield friendly + " you";
  }
  var greet = greet();
  var str1 = greet.next().value;
  console.log(str1);
  var str2 = greet.next(" hieu").value;
  console.log(str2);
  var str3 = greet.next(" huong").value;
  res.send(str3);
});

//object enhancements
route.get('/objen', (req, res) => {
  var color = "red";
  var speed = 100;
  function go (){
    return "Go Go";
  }
  var car = {
    color,
    speed,
    go
  };
  console.log(car);
  res.send(car.go());
});

//spread out operator
route.get('/spread', (req, res) => {
  let arr1 = [1,2,3];
  let arr2 = [4,5,6];

  //arr1.push(arr2);
  //res.send(arr1);
  //result [1,2,3,[4,5,6]]

  //arr1.push(...arr2);
  //res.send(arr1);
  //result [1,2,3,4,5,6]

  let addThree = (a,b,c) => a + b + c;
  let collectArray = (...arr) => arr;

  console.log(addThree(...arr1));
  res.send(collectArray(1,3,5,7,9));
});

//Default Parameters
route.get('/defPara', (req, res) => {
  var greet = (first = 'steve', last = 'hieu' , content = (par1, par2) => console.log("hello, " + par1, par2)) => content(first, last);
  greet("john");
  res.send("hello");
});

//String Template
route.get('/StrTem', (req, res) => {
  var name = "hieu";
  var message = `Say hello,    ${name}`;
  res.send(message);
});

//Iterators
route.get('/iterator', (req, res) => {
  let arr = [1,2,3,4,5];
  var sum = 0;

  for(let v of arr){
    sum += v;
  }
  console.log(sum);
  res.send("hello");
});

//Map Structure

route.get('/map', (req, res) => {
  let x = new Map([[1, "is a number key"]]);
  let today = new Date();

  x.set(today.toString(), 111);
  x.set(today, 222);
  x.delete(today.toString());

  console.log('The Map contains ', x.size, ' elements.');
  console.log('The Map has a today Date key: ', x.has(today));
  console.log('The Map has a today String key: ', x.has(today.toString()));

  x.forEach((value, key) => console.log(value, key));
  console.log(x);

  for(let i of x){
    console.log(i);
  }
  for(let i of x.values()){
    console.log(i);
  }
  for(let i of x.keys()){
    console.log(i);
  }
  for(let i of x.entries()){
    console.log(i);
  }
  res.send("hello");

});

//Set Structure
route.get('/set', (req, res) => {
  let x = new Set([1,2,3,4,5,3,4,6,7]);

  x.add(8);
  x.delete(3);

  console.log(`The set contains ${x.size}  elements`);
  console.log('The set has 1 is ', x.has(1));
  console.log('The set has 3 is ', x.has(3));
  console.log(x);

  res.send('hello');
});


//Promises
route.get('/promises', (req,res) => {
  var longFn = function(){
    return new Promise(function (res, rej) {
      setTimeout(res, 1000);

    });
  };
  var coolFn = () => console.log('cool');
  longFn().then(coolFn);
  res.send("hello");
});

//Rest Parameters
route.get('/restPar', (req, res) =>{
  var format = (str, ...args) => {
    return str.replace(/\{\s*(\d+)\s*\}/g, (m, n) => {
      return args[n];
    });
  };
  let msg = format(
      'The {0}st arg is a string, the {1} are {2}.',
      1,
      'rest',
      'unknown'
  );
  res.send(msg);
});

//map function
route.get('/mapFunc', (req, res) =>{

  var a = [
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryl­lium"
  ];

  var a2 = a.map(function(s){ return s.length });
  console.log(a2);
  var a3 = a.map( s => s.length );
  console.log(a3);


  var courses = ["Master Javascript and Jquery", "Advanced AngularJS"];
  let coursesUpcase = courses.map(course => course.toUpperCase());
  res.send(coursesUpcase);
});

//Sort function
route.get('/sort', (req, res) => {
  var numArr = [12,3,5,3,8,4,8,9,1,4,3];
  var sortednumArr = numArr.sort((a,b) => a>b?1:-1);
  res.send(sortednumArr);
});

//Module
route.get('/module', (req, res) => {
  var x = new Maths();
  var result = x.reactArea(2,3);
  console.log(result);
  res.send(result.toString());
});

//Module 1
route.get('/module1', (req, res) => {
  var result = sqrt(5);
  res.send(result.toString());
});

export default route;
