import express from 'express';
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

//Destructuring
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


export default route;
