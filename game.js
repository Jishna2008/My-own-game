 class Game
{
    constructor(){}

  getState()
  {
      var  gameStateRef =database.ref('gameState');
      gameStateRef.on("value",function(data){gameState=data.val()});

  }

  updateState(state)
  {
    gameState=state;
    database.ref('/').update({gameState:gameState});
  }

  async start()
  {
      if(gameState===0)
    {
      player= new Player();
      var playerCountRef=await database.ref('playerCount').once("value");

      if(playerCountRef.exists())
      {
        player.getCount();
      }

      form= new Form();
      form.display();
      

      
      obstacleGroup= createGroup();
      rewardGroup =createGroup();

      runner1=createSprite(displayWidth/8,displayHeight/2-25,50,50);
      runner1.addAnimation("running",runner_Img);
      runner1.addAnimation("died",diedImg);
      runner1.scale=0.7;
    
      runner1.setCollider("rectangle",0,0,runner1.width-200,runner1.height-300)
      invisibleground=createSprite(runner1.x,runner1.y+100,80,20);
      invisibleground.visible=false;

      instruction=createSprite(displayWidth/2+350,displayHeight/2-100);
      instruction.addImage(inst_Img);
      instruction.scale=0.4
     // runner1.visible=false;
      invisibleground.x=runner1.x;

      over=createSprite(displayWidth/2,displayHeight/2-200);
      over.addImage(gameOver);
      over.scale=1.5;
      over.visible=false;


     
      runner2=createSprite(displayWidth/8,displayHeight/2-250,50,50);
      runner2.addAnimation("ai",aiImg);
      runner2.addAnimation("died1",died_Img2);
      runner2.scale=0.5;
      invisible_Ground=createSprite(runner2.x+20,displayHeight/2+80,80,20);
  runner2.setCollider("rectangle",100,0,runner2.width-400,runner2.height-300)

        invisible_Ground.visible=false;
    
   
        life=createSprite(displayWidth-320,displayHeight/6-60,20,20);
        life.addImage(h_Img);
        life.scale=0.5;
    }
    backg1=createSprite(displayWidth/2+50,displayHeight/2-50,displayWidth+50,displayHeight+50);
      backg1.addImage(bg1);
      backg1.scale=2.5;

      
      backg1.depth=runner1.depth;
      runner1.depth+=1
  }
  play()
 {
  
  this.Rewards();
    
     form.disappear(); 
   instruction.visible=false;
     backg1.velocityX=-(12+score/10);
     backg1.visible=true;
     runner2.bounceOff(invisible_Ground);
     invisibleground.x=runner1.x+20;
    invisible_Ground.x=runner2.x+20;

    runner2.x=displayWidth/8+100
    if(backg1.x<displayWidth/2-20)
      {
        backg1.x=backg1.width/2+400;
        backg1.scale=3.0;
      }
    
     
  
    if(keyDown(UP_ARROW)&&runner1.y>=100&&runner1.y<600)
    {
      runner1.scale=0.7;
    }
    else if(keyDown(DOWN_ARROW))
    {
      
      runner1.velocityY=-8; 
      runner1.scale=0.1;
      // runner1.y=runner.y+5;
    }
    if(runner1.y>=100&&runner1.y<600)
    {
      runner1.velocityY=runner1.velocityY+0.8;
      runner1.bounceOff(invisibleground);
    }
    else if(runner1.y<=100)
    {
      runner1.velocityY=1;
    }else if (runner1.y>600){
  runner1.y=displayHeight/2;
  
    }
  

      // camera.y=250;
      // camera.x=runner1.x+400;
    if(rewardGroup.isTouching(runner1)&& runner1.scale===0.7)
    {  
      score+=20;
      rewardGroup.destroyEach(); 
      pointSound.play();
    
     
    }
   
    if(rewardGroup.isTouching(runner2)&& runner2.scale===0.5)
    {  
      aiScore+=20;
      rewardGroup.destroyEach(); 
      pointSound.play();
     
    }
    if(obstacleGroup.isTouching(runner2)&&runner2.scale===0.5)
    {
      heart-=1
      // obstacleGroup.destroyEach();
      obstacleGroup.destroyEach();
      aiScore-=10
    }
    if( obstacleGroup.isTouching(runner1)&&runner1.scale===0.7){
      heart-=1
      obstacleGroup.destroyEach();
      
      score-=10
    }

    if(heart===0)
    {
    
    gameState=2;
    }



    if(keyDown("2")&&runner2.y>=100&&runner2.y<600)
    {
      runner2.velocityY=-8; 
      runner2.scale=0.1;
    }
    else if(keyDown("1"))
    {
      runner2.scale=0.5;
      // runner1.y=runner.y+5;
    }
    if(runner2.y>=100&&runner2.y<600)
    {
      runner2.velocityY=runner2.velocityY+0.8;
      runner2.bounceOff(invisible_Ground);
    }
    else if(runner2.y<=100)
    {
      runner2.velocityY=1;
    }else if (runner2.y>600){
      runner2.y=displayHeight/2;
      
        }

        // for(var i= camera.x+500;i<heart;i=i+20){
        
          // }
//   Obstacles()
//  {
  if(frameCount%80===0)
  {
    console.log(displayHeight/4,"hai");
    console.log(displayHeight/2,"hello");
      var randY=Math.round(random(displayHeight/4,displayHeight/2));
      // randX=Math.round(random(runner.x+200,runner.x+1000));
      obstacles=createSprite(runner1.x+1200,randY,100,30);
      obstacles.shapeColor="white";
      var rand=Math.round(random(1,2));
      switch(rand)
    {
      case 1:obstacles.addImage(obstacleImg1);
              break;
      case 2:obstacles.addImage(obstacleImg2);
              break;
      default:break;
    }
      obstacles.scale=0.45;
      obstacles.velocityX=-(5+score/40)
      obstacles.setCollider("rectangle",0,0,obstacles.width-300,obstacles.height-200)
      obstacles.lifetime=300;
       obstacleGroup.add(obstacles);
  }


}

  Rewards()
 {
    if(frameCount%280===0)
   {
      var  rex=Math.round(random(runner1.x+500,runner1.x+1200));
      var  rey=Math.round(random(displayHeight/3-200,displayHeight-400));
      reward=createSprite(rex,rey,30,30);
      var  rand=Math.round(random(1,2));
      switch(rand)
      {
        case 1:reward.addImage(foodImg);
              break;
        case 2:reward.addImage(jewelImg);
              break;
        case 2:reward.addImage(treasureImg);
              break;
        default:break;
      }
      reward.scale=0.3;
      reward.velocityX=-(5+aiScore/20*3)
      reward.lifetime=300;
      //reward.debug=true;
      reward.setCollider("rectangle",10,10,reward.width-300,reward.height-100)
      rewardGroup.add(reward);
   }
 }
 end()
 {
      // endSound.play();
      runner1.velocityY=0;
      runner2.velocityY=0;
      backg1.velocityX=0;
      backg1.destroy();
      console.log("Game end");
      over.visible=true;
 
      obstacleGroup.setLifetimeEach(-1);
      rewardGroup.setLifetimeEach(-1);
      obstacleGroup.destroyEach();
      rewardGroup.destroyEach();
      obstacleGroup.setVelocityXEach(0);
      rewardGroup.setVelocityXEach(0);
      

      runner2.changeAnimation("died1",died_Img2);
      runner1.changeAnimation("died",diedImg);


 }



}