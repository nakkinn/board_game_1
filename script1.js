let board;  // 17x17 board
let cellSize = 40; // Size of each cell in pixels
let game_mode = 0;

let icon1_posx = 150;
let icon1_posy = 800;
let icon2_posx = 400;
let icon2_posy = 800;
let icon1_size = 100;

let p1x = 0;
let p1y = 8;
let p2x = 16;
let p2y = 8;

let q1x = -10;
let q1y = -10;

let pressx1 = -10;
let pressy1 = -10;


let kouho1 = [];
let kouho2 = [];

let debug1 = 0;
let debug2 = 0;
let debug3 = 0;

let teban = true;  //true:player1, false:player2


board = new Array(17);
for(let i=0; i<board.length; i++){
    board[i] = new Array(17);
}
for(let i=0; i<board.length; i++){
    for(let j=0; j<board[i].length; j++){
        board[i][j] = 0;
    }
}


cellSize = window.innerWidth * 0.1;



document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});




function setup(){
    createCanvas(windowWidth, windowHeight);
    setkouho();

    icon1_posx = width / 6;
    icon2_posx = width / 6 * 3;
    icon1_posy = height - (height - cellSize * 9)  / 2;
    icon2_posy = height - (height - cellSize * 9)  / 2;
    icon1_size = (height - cellSize * 9) * 0.2
}


function draw(){

    background(255);

    //ボードの描画
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            if(i%2==0 && j%2==0){
                noFill();
                stroke(0);
                rect(i * cellSize*0.5, j * cellSize*0.5, cellSize*0.8, cellSize*0.8);
            }else if(i%2==1 && j%2==1){
                noStroke();
                noFill();
                if(board[i][j]==1){
                    fill(0);
                    stroke(0);
                }
                rect((i+0.6) * cellSize*0.5, (j+0.6) * cellSize*0.5, cellSize*0.2, cellSize*0.2);
            }else if(i%2==0 && j%2==1){
                noFill();
                noStroke();
                if(board[i][j]==1){
                    fill(0);
                    stroke(0);
                }
                rect(i * cellSize*0.5, (j+0.6) * cellSize*0.5, cellSize*0.8, cellSize*0.2);
            }else{
                noStroke();
                noFill();
                if(board[i][j]==1){
                    fill(0);
                    stroke(0);
                }
                rect((i+0.6) * cellSize*0.5, j * cellSize*0.5, cellSize*0.2, cellSize*0.8);
            }
            
        }
    }



    //プレイヤー1
    fill(255, 0, 0);
    noStroke();
    if(q1x == -10 || !teban){
        circle((p1x+0.8) * cellSize*0.5, (p1y+0.8) * cellSize*0.5, cellSize*0.6);
    }else{
        circle((q1x+0.8) * cellSize*0.5, (q1y+0.8) * cellSize*0.5, cellSize*0.7);
    }



    //プレイヤー2
    fill(0, 0, 255);
    noStroke();
    if(q1x == -10 || teban){
        circle((p2x+0.8) * cellSize*0.5, (p2y+0.8) * cellSize*0.5, cellSize*0.6);
    }else{
        circle((q1x+0.8) * cellSize*0.5, (q1y+0.8) * cellSize*0.5, cellSize*0.7);
    }


    //プレイヤーの移動可能箇所

    if(teban){
        fill(255, 0, 0, 100);
        for(let i=0; i<kouho1.length; i++){
            let x = kouho1[i][0];
            let y = kouho1[i][1];
            circle((x+0.8) * cellSize*0.5, (y+0.8) * cellSize*0.5, cellSize*0.4);
        }
        circle((p1x+0.8) * cellSize*0.5, (p1y+0.8) * cellSize*0.5, cellSize*0.4);
    }else{
        fill(0, 0, 255, 100);
        for(let i=0; i<kouho2.length; i++){
            let x = kouho2[i][0];
            let y = kouho2[i][1];
            circle((x+0.8) * cellSize*0.5, (y+0.8) * cellSize*0.5, cellSize*0.4);
        }
        circle((p2x+0.8) * cellSize*0.5, (p2y+0.8) * cellSize*0.5, cellSize*0.4);
    }


    //設置中の壁

    noStroke();
    fill(100);
    let x1 = Math.floor(mouseX / cellSize);
    let y1 = Math.floor((mouseY-100) / cellSize);
    
    fill(150);
    if(x1>=1 && y1>=1 && x1<=8 && y1<=8){

        let x2 = x1*2 - 1;
        let y2 = y1*2 - 1;
        if(game_mode==1 && (board[x2][y2]!=0 || board[x2][y2-1]!=0 || board[x2][y2+1]!=0)){
            fill(255, 100, 100);
        }  
        if(game_mode==2 && (board[x2][y2]!=0 || board[x2-1][y2]!=0 || board[x2+1][y2]!=0)){
            fill(255, 100, 100);
        }  
        
    }
    if(game_mode == 1)  rect( (x1-0.2) * cellSize, (y1-1) * cellSize, cellSize*0.2, cellSize*1.8);
    if(game_mode == 2)  rect( (x1-1) * cellSize, (y1-0.2) * cellSize, cellSize*1.8, cellSize*0.2);



    //壁設置アイコン
    stroke(255, 150, 0);
    noFill();
    circle(icon1_posx, icon1_posy, icon1_size*2);
    circle(icon2_posx, icon2_posy, icon1_size*2);
    
    fill(0);
    noStroke();
    rect(icon1_posx-10, icon1_posy-75, 20, 150);
    rect(icon2_posx-75, icon2_posy-10, 150, 20);

}


function pressevent(){
    if(mouseY < cellSize * 9){
        if(teban){
            q1x = p1x;
            q1y = p1y;
        }else{
            q1x = p2x;
            q1y = p2y;
        }
        pressx1 = mouseX;
        pressy1 = mouseY;
    }else if(dist(mouseX, mouseY, icon1_posx, icon1_posy) < icon1_size){
        game_mode = 1;  //縦壁設置モードにする
    }else if(dist(mouseX, mouseY, icon2_posx, icon2_posy) < icon1_size){
        game_mode = 2;  //横壁設置モードにする
    }
}

function dragevent(){

    if(q1x >= 0){
        let dx1 = mouseX - pressx1;
        let dy1 = mouseY - pressy1;

        let kouho3;
        if(teban)   kouho3 = JSON.parse(JSON.stringify(kouho1));
        else        kouho3 = JSON.parse(JSON.stringify(kouho2));

        let list2 = [];
        for(let i=0; i<kouho3.length; i++){
            let x1, y1;
            if(teban){
                x1 = (p1x+0.8) * cellSize*0.5 + dx1;
                y1 = (p1y+0.8) * cellSize*0.5 + dy1;
            }else{
                x1 = (p2x+0.8) * cellSize*0.5 + dx1;
                y1 = (p2y+0.8) * cellSize*0.5 + dy1;
            }
            let x2 = (kouho3[i][0]+0.8) * cellSize*0.5;
            let y2 = (kouho3[i][1]+0.8) * cellSize*0.5;
            list2.push( [ dist(x1, y1, x2, y2), i ] );
            debug1 = x2;
            debug2 = y2;
        }
        list2.push( [dist(0, 0, dx1, dy1), -1] );

        list2.sort(function(a, b){
            return a[0] - b[0];
        });

        if(list2[0][1] == -1 || list2[0][0] > cellSize*2){
            if(teban){
                q1x = p1x;
                q1y = p1y;
            }else{
                q1x = p2x;
                q1y = p2y;
            }

            if(list2[0][0] > cellSize*2){
                q1x = -10;
                q1y = -10;
                if(teban){
                    q1x = p1x;
                    q1y = p1y;
                }
            }
                
        }else{
            q1x = kouho3[list2[0][1]][0];
            q1y = kouho3[list2[0][1]][1];
        }
        

    }
}

function releasedevent(){
    
    if(game_mode==1){
        let x1 = Math.floor(mouseX / cellSize);
        let y1 = Math.floor((mouseY-100) / cellSize);
        let x2 = x1*2 - 1;
        let y2 = y1*2 - 1;

        if(x1>=1 && y1>=1 && x1<=8 && y1<=8){
            if(board[x2][y2]==0 && board[x2][y2-1]==0 && board[x2][y2+1]==0){
                board[x2][y2] = 1;
                board[x2][y2-1] = 1;
                board[x2][y2+1] = 1;

                teban = !teban;  //ターン交代
                setkouho();
            }
        }
    }

    if(game_mode==2){
        let x1 = Math.floor(mouseX / cellSize);
        let y1 = Math.floor((mouseY-100) / cellSize);
        let x2 = x1*2 - 1;
        let y2 = y1*2 - 1;

        if(x1>=1 && y1>=1 && x1<=8 && y1<=8){
            if(board[x2][y2]==0 && board[x2-1][y2]==0 && board[x2+1][y2]==0){
                board[x2][y2] = 1;
                board[x2-1][y2] = 1;
                board[x2+1][y2] = 1;

                teban = !teban;  //ターン交代
                setkouho();
            }
        }
    }


    //移動
    if(q1x >= 0){

        let kouho3;
        if(teban)   kouho3 = JSON.parse(JSON.stringify(kouho1));
        else        kouho3 = JSON.parse(JSON.stringify(kouho2));

        let dx1 = mouseX - pressx1;
        let dy1 = mouseY - pressy1;

        let list2 = [];
        for(let i=0; i<kouho3.length; i++){
            let x1, y1;
            if(teban){
                x1 = (p1x+0.8) * cellSize*0.5 + dx1;
                y1 = (p1y+0.8) * cellSize*0.5 + dy1;
            }else{
                x1 = (p2x+0.8) * cellSize*0.5 + dx1;
                y1 = (p2y+0.8) * cellSize*0.5 + dy1;
            }
            let x2 = (kouho3[i][0]+0.8) * cellSize*0.5;
            let y2 = (kouho3[i][1]+0.8) * cellSize*0.5;
            list2.push( [ dist(x1, y1, x2, y2), i ] );
            debug1 = x2;
            debug2 = y2;
        }
        list2.push( [dist(0, 0, dx1, dy1), -1] );

        list2.sort(function(a, b){
            return a[0] - b[0];
        });

        if(list2[0][1] !=-1 && list2[0][0] <= cellSize*2){
            if(teban){
                p1x = kouho3[list2[0][1]][0];
                p1y = kouho3[list2[0][1]][1];
            }else{
                p2x = kouho3[list2[0][1]][0];
                p2y = kouho3[list2[0][1]][1];
            }
            setkouho();
            teban = !teban;  //ターン交代
        }


    }

    game_mode = 0;  //壁設置モードを解除する

    q1x = -10;
    q1y = -10;
    pressx1 = -10;
    pressy1 = -10;

}


function mousePressed(){
    pressevent();
}

function touchStarted(){
    pressevent();
}

function mouseDragged(){
    dragevent();
}

function touchMoved(){
    dragevent();
}


function mouseReleased(){
    releasedevent();
}

function touchEnded(){
    releasedevent();
}



function keyPressed(){
    if(key=="a")    setkouho();
}





//プレイヤー1,2が移動可能な箇所
function setkouho(){

    kouho1 = [];
    kouho2 = [];
    
    if(p1x>=2){
        if(board[p1x-1][p1y]==0){   //隣に壁無し
            if(p2x==p1x-2 && p1y==p2y){ //隣に相手
                if(p1x>2){
                    if(board[p1x-3][p1y]==0){ //相手を挟んで壁無し
                        kouho1.push([p1x-4, p1y])
                    }else{  //相手を挟んで壁あり
                        if(p1y>=2)  if(board[p1x-2][p1y-1]==0)  kouho1.push([p1x-2, p1y-2]);    
                        if(p1y<=14) if(board[p1x-2][p1y+1]==0)  kouho1.push([p1x-2, p1y+2]);
                    }
                }
            }else{  //隣が空き
                kouho1.push([p1x-2, p1y]);
            }
        }
    }

    if(p1x<=14){
        if(board[p1x+1][p1y]==0){   //隣に壁無し
            if(p2x==p1x+2 && p1y==p2y){ //隣に相手
                if(p1x<14){
                    if(board[p1x+3][p1y]==0){ //相手を挟んで壁無し
                        kouho1.push([p1x+4, p1y])
                    }else{  //相手を挟んで壁あり
                        if(p1y>=2)  if(board[p1x+2][p1y-1]==0)  kouho1.push([p1x+2, p1y-2]);    
                        if(p1y<=14) if(board[p1x+2][p1y+1]==0)  kouho1.push([p1x+2, p1y+2]);
                    }
                }
            }else{  //隣が空き
                kouho1.push([p1x+2, p1y]);
            }
        }
    }

    if(p1y>=2){
        if(board[p1x][p1y-1]==0){   //隣に壁無し
            if(p2y==p1y-2 && p1x==p2x){ //隣に相手
                if(p1y>2){
                    if(board[p1x][p1y-3]==0){ //相手を挟んで壁無し
                        kouho1.push([p1x, p1y-4])
                    }else{  //相手を挟んで壁あり
                        if(p1x>=2)  if(board[p1x-1][p1y-2]==0)  kouho1.push([p1x-2, p1y-2]);    
                        if(p1x<=14) if(board[p1x+1][p1y-2]==0)  kouho1.push([p1x+2, p1y-2]);
                    }
                }
            }else{  //隣が空き
                kouho1.push([p1x, p1y-2]);
            }
        }
    }

    if(p1y<=14){
        if(board[p1x][p1y+1]==0){   //隣に壁無し
            if(p2y==p1y+2 && p1x==p2x){ //隣に相手
                if(p1y<14){
                    if(board[p1x][p1y+3]==0){ //相手を挟んで壁無し
                        kouho1.push([p1x, p1y+4])
                    }else{  //相手を挟んで壁あり
                        if(p1x>=2)  if(board[p1x-1][p1y+2]==0)  kouho1.push([p1x-2, p1y+2]);    
                        if(p1x<=14) if(board[p1x+1][p1y+2]==0)  kouho1.push([p1x+2, p1y+2]);
                    }
                }
            }else{  //隣が空き
                kouho1.push([p1x, p1y+2]);
            }
        }
    }

    if(p2x>=2){
        if(board[p2x-1][p2y]==0){   //隣に壁無し
            if(p1x==p2x-2 && p1y==p2y){ //隣に相手
                if(p2x>2){
                    if(board[p2x-3][p2y]==0){ //相手を挟んで壁無し
                        kouho2.push([p2x-4, p2y])
                    }else{  //相手を挟んで壁あり
                        if(p2y>=2)  if(board[p2x-2][p2y-1]==0)  kouho2.push([p2x-2, p2y-2]);    
                        if(p2y<=14) if(board[p2x-2][p2y+1]==0)  kouho2.push([p2x-2, p2y+2]);
                    }
                }
            }else{  //隣が空き
                kouho2.push([p2x-2, p2y]);
            }
        }
    }

    if(p2x<=14){
        if(board[p2x+1][p2y]==0){   //隣に壁無し
            if(p1x==p2x+2 && p1y==p2y){ //隣に相手
                if(p2x<14){
                    if(board[p2x+3][p2y]==0){ //相手を挟んで壁無し
                        kouho2.push([p2x+4, p2y])
                    }else{  //相手を挟んで壁あり
                        if(p2y>=2)  if(board[p2x+2][p2y-1]==0)  kouho2.push([p2x+2, p2y-2]);    
                        if(p2y<=14) if(board[p2x+2][p2y+1]==0)  kouho2.push([p2x+2, p2y+2]);
                    }
                }
            }else{  //隣が空き
                kouho2.push([p2x+2, p2y]);
            }
        }
    }

    if(p2y>=2){
        if(board[p2x][p2y-1]==0){   //隣に壁無し
            if(p1y==p2y-2 && p1x==p2x){ //隣に相手
                if(p2y>2){
                    if(board[p2x][p2y-3]==0){ //相手を挟んで壁無し
                        kouho2.push([p2x, p2y-4])
                    }else{  //相手を挟んで壁あり
                        if(p2x>=2)  if(board[p2x-1][p2y-2]==0)  kouho2.push([p2x-2, p2y-2]);    
                        if(p2x<=14) if(board[p2x+1][p2y-2]==0)  kouho2.push([p2x+2, p2y-2]);
                    }
                }
            }else{  //隣が空き
                kouho2.push([p2x, p2y-2]);
            }
        }
    }

    if(p2y<=14){
        if(board[p2x][p2y+1]==0){   //隣に壁無し
            if(p1y==p2y+2 && p1x==p2x){ //隣に相手
                if(p2y<14){
                    if(board[p2x][p2y+3]==0){ //相手を挟んで壁無し
                        kouho2.push([p2x, p2y+4])
                    }else{  //相手を挟んで壁あり
                        if(p2x>=2)  if(board[p2x-1][p2y+2]==0)  kouho2.push([p2x-2, p2y+2]);    
                        if(p2x<=14) if(board[p2x+1][p2y+2]==0)  kouho2.push([p2x+2, p2y+2]);
                    }
                }
            }else{  //隣が空き
                kouho2.push([p2x, p2y+2]);
            }
        }
    }


    for(let i=kouho1.length-1; i>=0; i--){
        if(kouho1[i][0]<0 || kouho1[i][0]>16 || kouho1[i][1]<0 || kouho1[i][1]>16){
            kouho1.splice(i, 1);
        }
    }
    for(let i=kouho2.length-1; i>=0; i--){
        if(kouho2[i][0]<0 || kouho2[i][0]>16 || kouho2[i][1]<0 || kouho2[i][1]>16){
            kouho2.splice(i, 1);
        }
    }


}