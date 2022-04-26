
var player

var scene

var obstecleGroup

var score = 0
var time = 0

var wall1,wall2

var startingwall1,startingwall2,startingwall3

var speedPower = 0
var fallPower = 0
var powerUpsGroup

var SPU,SPUImage
var FPU ,FPUImage

var gameState = "play"



function preload(){
backGround = loadImage("project_thing.jpg")
playerImg = loadImage("project_thing2.jpg")
SPUImage = loadImage("SPU.jpg")
FPUImage = loadImage("FPU.png")
}

function setup() {
    createCanvas(800,400);

    

    scene = createSprite(400,200,1000,1000)
   scene.addImage(backGround)
   scene.scale = 3

   wall1 = createSprite(0,200,1,400)
   wall2 = createSprite(800,200,1,400)

   startingwall1=createSprite(370,100,1,50)
   startingwall2=createSprite(430,100,1,50)
   startingwall3=createSprite(400,130,50,1)

   player=createSprite(400,100,50,50)
   player.addImage(playerImg)
   player.scale = 0.2

   
   
   
   startingwall1.visible=false    
   startingwall2.visible=false
   startingwall3.visible=false
   startingwall1.lifetime = 400
   startingwall2.lifetime = 400
   startingwall3.lifetime = 400
   

   obstecleGroup = new Group()
   powerSPU = new Group()
   powerFPU = new Group()
}

function draw() {
 background(100);

if (gameState === "play") {
   
    
    if (keyDown("left")) {
        player.x=player.x-5-speedPower
    }
    if (keyDown("right")) {
        player.x=player.x+5+speedPower
    }

    if (player.isTouching(powerSPU)) {
        score=score+1
     }

     if (player.isTouching(powerFPU)) {
        score=score+1
     }

     if (frameCount% 24 === 0) {
        time=time+1 
     }
     
     

     spawnObstecles()
     spawnSPU()
     spawnFPU()

     player.velocityY=1+fallPower

     

    obstecleGroup.velocityY=-0.5

    if (player.y>700) {
       gameState = "end" 
    }
    if (player.y<0) {
        gameState = "end" 
     }
}

if ( gameState == "end") {
    scene.destroy()

    powerFPU.destroyEach()
    powerSPU.destroyEach()
    obstecleGroup.destroyEach()
    player.verlocityY=0
    player.x=400
    player.y=50

    textSize(40)
    fill(255)
    text("YOU LOST",300,200)

    textSize(20)
     fill(255)
     text("time# "+time,20,20)

     textSize(20)
     fill(255)
     text("score# "+score,20,40)
}
   

 

   



    powerSPU.collide(obstecleGroup)
    powerFPU.collide(obstecleGroup)

    

   player.scale = 0.2
   player.collide(obstecleGroup)
   player.collide(wall1)
   player.collide(wall2)

   player.collide(startingwall1)
   player.collide(startingwall2)
   player.collide(startingwall3)

   if (player.collide(powerSPU)) {
    speedPower=speedPower+1
    powerSPU.destroyEach()
   }
   if (player.collide(powerFPU)) {
    fallPower=fallPower+1
    powerFPU.destroyEach()
   }

 drawSprites()

}

function spawnObstecles() {
    
    if (frameCount % 140 === 0) {
        grass = createSprite( Math.round(random(150,650)),400,Math.round(random(600,750)),10);
        grass.velocityY= -0.5;
        
       
        grass.lifetime = 1000;
      
     
        grass.depth = player.depth;
      player.depth = grass.depth + 1;
      
      
      obstecleGroup.add(grass);
    }
    
  }

  function spawnSPU() {
    
    if (frameCount % 240 === 0) {
        SPU = createSprite( Math.round(random(0,800)),Math.round(random(0,800)),20,20);
        SPU.velocityY = 0.5;
        SPU.addImage(SPUImage)
        SPU.scale = 0.1
       
        SPU.lifetime = 1000;
      
      
        powerSPU.add(SPU);

    }
    
  }

  function spawnFPU() {
    
    if (frameCount % 120 === 0) {
        FPU = createSprite( Math.round(random(0,800)),Math.round(random(0,800)),20,20);
        FPU.velocityY = 0.5;
        FPU.addImage(FPUImage)
        FPU.scale = 0.1
       
        FPU.lifetime = 1000;
      
      
        powerFPU.add(FPU);
    }
    
  }

