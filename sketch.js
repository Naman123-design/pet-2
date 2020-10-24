//Create variables here
var dog, happyDog, databse, foodS, foodStock;
var dogImg, happyDogImg;
var fedTime,lastFed
var add, feed;
var foodObj;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(700, 700);
  database = firebase.database();
  dog = createSprite(350,500,100,100);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  add = createButton("addFood",600,100);
  add.position(380,195);
  add.mousePressed(addFood);

  feed = createButton("feedFood",600,200);
  feed.position(380,235);
  feed.mousePressed(feedDog);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}


fill(255,255,254);
textSize(20);
if(lastFed>=12){
  text("last Feed : "+lastFed%12 + "PM",30,250);
}else if(lastFed == 0){
 text("Last Feed : 12 AM",30,250);
}else{
  text("Last Feed : "+lastFed + "AM",30,250)
}




  drawSprites();
  //add styles here
textSize(28);
fill(255);
stroke(3);
text("Press UP_ARROW Key To Feed Drago Milk", 5,70);
text("Food left  : " + foodS,5,120);
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

if(x<=0){
  x= 0
}else{
  x = x-1
}

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
    dog.addImage(happyDogImg);
foodS--
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
}


