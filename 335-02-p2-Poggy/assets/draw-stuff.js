// Time-stamp: <2020-10-28 Luc Dang>
// Author: Luc Dang
// Info: lddang1762@csu.fullerton.edu
// Discription: script helps draw the grid and the text for each pass

// === draw_grid ===
// Draw a fancy grid with major & minor lines 
// & major row/col numbers.
function draw_grid( rminor, rmajor, rstroke, rfill  ) 
{
    stroke( rstroke );
    fill( rfill );
    let sz = g_canvas.cell_size;
    let width = g_canvas.wid*sz;
    let height = g_canvas.hgt*sz
    for ( var ix = 0; ix < width; ix += rminor )
    {
        let big_linep = (ix % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( ix, 0, ix, height );
        strokeWeight( 1 );
        if ( ix % rmajor == 0 ) { text( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        let big_linep = (iy % rmajor == 0);
        let line_wgt = 1;
        if (big_linep) line_wgt = 2;
        strokeWeight( line_wgt );
        line( 0, iy, width, iy );
        strokeWeight( 1 );
        if ( iy % rmajor == 0 ) { text( iy, 0, iy + 10 ); }
    }
}

// === clear_grid ===
// fills grid with black after all sorts are finished
function clear_grid(){
   for(let x = 1; x <= g_canvas.wid; x++){
        g_bot.x = x;
        if(x != 16 && x != 17 && x != 33 && x != 34  && x != 50 && x != 51 )
        for(let y = 0; y <= g_canvas.hgt; y++){
            g_bot.y = y;
            color_cell('black');
	    }
	}    
}

// === draw_dividers ===
// Draws white dividers on initialization
function draw_dividers(){
    for(let x = 16; x <= g_canvas.wid; x += 17){
        g_bot.x = x;
        for(let y = 0; y <= g_canvas.hgt; y++){
            g_bot.y = y;
            color_cell('white');
	    }
	}    
}

// === draw_labels ===
// Draws red text for column labels
function draw_labels(){
    var txt = "X";
    for(let x = 0; x <= g_canvas.wid; x+=17){
        g_bot.x = x;
        for(let y = 0; y <= g_canvas.hgt; y++){
            g_bot.y = y;
            draw_text(y + "", 'red');
	    }
	}    
}

// === draw_text ===
// Draws text on the current cell (preferably single character)
function draw_text(txt, clr){
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1 + g_bot.x*sz;
    let y = 1 + g_bot.y*sz;
    let big = sz - 2;
    //noStroke();
    strokeWeight(0.5);
    stroke(clr);
    textSize(15);
    fill(clr);
    if(txt.length == 1){
        text(txt, x + 4, y - 5);
	}
    else{
        text(txt, x, y - 5);
	}
}

// === color_cell ===
// function colors the current cell with argument color
function color_cell(color){
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1 + g_bot.x*sz;
    let y = 1 + (g_bot.y- 1)*sz;
    let big = sz - 2; 
    fill(color);
    noStroke();
    //strokeWeight(1);
    //stroke( 'white' ); 
    rect(x, y, big, big );    
}