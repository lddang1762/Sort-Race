// Time-stamp: <2020-10-28 Luc Dang>
// Author: Luc Dang
// Info: lddang1762@csu.fullerton.edu
// Discription: Initializes grid and drawing pointer position

var g_canvas = { cell_size:20, wid:67, hgt:40 };
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 50; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

var g_bot = { dir:0, x:15, y:0, color:'white' };
var g_box = { t:1, hgt:39, l:1, wid:66 };

//================================================================================================

function setup() {
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );
    draw_grid( 20, 0, 'gray', 'white' );
    draw_dividers();
    draw_labels();
    
    init_sorts();
    load_input();
    g_bot.x = 1;
    g_bot.y = 1;
}

function draw_update(){ }

function draw(){
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop){ 
            pass();
        }
    }	
}

function keyPressed( ) { g_stop = ! g_stop; }

function mousePressed( ){ pass(); }
