class Box{
  constructor(x,y,w,h,num=0){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.num=num;
    this.state=255;
  }
  
  drawBox(){
    fill(this.state)
    rect(this.x,this.y,this.w,this.h)
    fill(0)
    if(this.state==100){
      textSize(boxSize/2);
      textAlign(CENTER,CENTER);
      text(this.num,this.x+boxSize/2,this.y+boxSize/2);
    }
    
  }
  
 
  
}


class lineLoc{
  constructor(x,y,x1,y1){
    this.x=x;
    this.y=y;
    this.x1=x1;
    this.y1=y1;
  }
}