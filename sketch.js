var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feed;
var foodObj;
var feed;
var lastFed,fedTime;
var d = new Date();
var hour;
var milk;
var milkImg

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
milkImg = loadImage("Milk.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

 

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  //create feed the dog button here

  feed=createButton("feed");
  feed.position(800,300);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
  hour = d.getHours();
   //console.log(hour);
   fedTime = database.ref('FeedTime');
   fedTime.on("value",function(data){
     lastFed = data.val()
   })
 
  //write code to display text lastFed time here
   fill("black")
   if(lastFed<12) { text("dog was last fed at:"+lastFed+"AM",100,50); }
    else if(lastFed===12) text("dog was last fed at:"+lastFed+"PM",100,50);
     else if (lastFed>12){ text("dog was last fed at:"+lastFed%12+"PM",100,50); }
   //text("dog was last fed at:"+lastFed,100,100)
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour
    
  })
  
 
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
