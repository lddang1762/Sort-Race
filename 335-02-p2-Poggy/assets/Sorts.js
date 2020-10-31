// Time-stamp: <2020-10-28 Luc Dang>
// Author: Luc Dang
// Info: lddang1762@csu.fullerton.edu
// Discription:  Contains all sort-related functions and properties defined by Luc Dang.
//               Controls each pass for each sort the information passed between. 

var input_arr = ["05CA627BC2B6F13", "065DE6671F040BA", "0684FB893D5754E", "07C9A2D183E4B65",
                 "09F48E7862D2616", "1FAB3D47905C286", "286E1D0342D7859", "30E530C4786AF21",
                 "328DE4765C10BA9", "34F2756F18E90BA", "90BA34F0756F180", "D7859286E2D0342"];
//var _input = "2D7859286E2D034";
var _input = input_arr[Math.floor(Math.random() * input_arr.length)]
var winner = "";
var numRuns = 0;
var insertionsort, poresort, mergesort, quicksort;
var raceComplete = false;
var wins = [0,0,0,0];

function init_sorts(){
    insertionsort = {
        pass: 0, 
        input: "", 
        i: 1, j: 1, key: "",
        x:1, y:1,
        inloop: false,
        color: 'white', 
        finished: false
    }
    poresort = {
        pass: 0, 
        input: "", 
        x:18, y:1,
        odd: false,
        color: 'white', 
        oddsorted: false, evensorted: false,
        finished: false
    }
    mergesort = {
        pass: 0, 
        input: "",
        i: 0,
        arr: [],
        x:35, y:1, 
        color: 'white',
        sorted: false,
        finished: false
    }
    quicksort = {
        pass: 0, 
        input: "", 
        i: 0,
        arr: [],
        x:52, 
        y:1, 
        color: 'white', 
        sorted: false,
        finished: false
    }
}

function load_input(){
	insertionsort.input = _input;
	poresort.input = _input;
	mergesort.input = _input;
	quicksort.input = _input;
}

function rotate_input(){
    let newInput = _input[_input.length - 1] + "";
    for(let i = 0; i < _input.length - 1; i++){
        newInput += _input[i];
	}
    _input = newInput;
}

// 1, 18, 35, 52
function print_input(input, x, y, clr){
	g_bot.x = x;
    g_bot.y = y;
	for(let i = 0; i < 15; i++, g_bot.x++){
        color_cell('black');
        if(i < input.length){
            draw_text(input[i], clr);
		}
	}
}

//================================
// Sorting                       |
//================================

function InsertionSort(){
    let i = insertionsort.i, j, key = "";
    let input = insertionsort.input;
    if(i < input.length) {  
        //if(insertionsort.inloop == false){
            //insertionsort.key = input[i];
            key = input[i];
            //key = insertionsort.key;
            //insertionsort.j = i - 1;
            j = i-1;
            //j = insertionsort.j;
            //insertionsort.inloop = true;
		//}  
        //if(insertionsort.inloop == true && j >= 0 && input[j] > key) {
        while (j >= 0 && input[j] > key) {   
            input[j + 1] = input[j];
            input = setCharAt(input, j+1, input[j]);
            //insertionsort.input = input;
            j-= 1;  
        }
        //else{
            //insertionsort.inloop = false;
            input[j + 1] = key;
            input = setCharAt(input, j+1, key);
            insertionsort.input = input;
            insertionsort.i++;
		//}        
    }
    else {
        insertionsort.finished = true;
	}
}

function Poresort(){
    let odd = poresort.odd;
    let oddsorted = poresort.oddsorted;
    let evensorted = poresort.evensorted;
    let str = poresort.input;
    if(!oddsorted || !evensorted){ 
        if(odd){ //odd pairs
            oddsorted = true;
            for(let o = 1; o < str.length - 1; o +=2){
                if(str[o+1] < str[o]){
                    let c = str[o]  
                    str = setCharAt(str, o, str[o+1]);
                    str = setCharAt(str, o+1, c);
                    oddsorted = false;
				}
		    }
            poresort.odd = false;
	    }
        else{ //even pairs
            evensorted = true;
            for(let e = 0; e < str.length - 1; e +=2){
                if(str[e+1] < str[e]){
                    let c = str[e]  
                    str = setCharAt(str, e, str[e+1]);
                    str = setCharAt(str, e+1, c);
                    evensorted = false;
				}
		    }
            poresort.odd = true;
	    }
        poresort.input = str;
        poresort.oddsorted = oddsorted;
        poresort.evensorted = evensorted;
        poresort.finished = (oddsorted && evensorted);
	}
}

function Mergesort(arr){
    mergesort.arr.push(arr.slice());
    if (arr.length <= 1) {
        return arr; 
    }
    let mid = Math.ceil(arr.length / 2);
    let left = Mergesort(arr.slice(0, mid));
    let right = Mergesort(arr.slice(mid));

    mergesort.arr.push(merge(left, right));
    return merge(left, right);
}

function merge(arr1, arr2){
    let index = 0, i = 0, j = 0;
    let sorted = "";

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) { 
            sorted += arr1[i];
            i++;
        }
        else { 
            sorted += arr2[j];
            j++;
        }
    }
    while(i < arr1.length){
        sorted += arr1[i]; 
        i++;
	}
    while(j < arr2.length){
        sorted += arr2[j]; 
        j++;
	}

    return sorted;
}

function Quicksort(items, left = 0, right = items.length-1) {
    var index;
    //quicksort.arr.push(items.slice(left,right+1).join(""));
    if (items.length > 1) {
        index = partition(items, left, right); 
        if (left < index - 1) { 
            Quicksort(items, left, index - 1);
        }
        if (index < right) { 
            Quicksort(items, index, right);
        }
    }
    return items;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            if(i!=j){ quicksort.arr.push(items.slice().join("")); }
            
            i++;
            j--;
        }
    }
    return i;
}

function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    //quicksort.arr.push(items.slice(leftIndex, rightIndex+1).join(""));
}

//======================================
// Pass helpers                        |
//======================================

function setCharAt(str, index, c){
    if(index > str.length-1) { return str; }
    return str.substring(0,index) + c + str.substring(index+1);
}

function newRun(){
    rotate_input();
    init_sorts();
    load_input();
    clear_grid();
    numRuns++;
}

function pass(){
    if(numRuns != 15){
        if(insertionsort.finished && poresort.finished && mergesort.finished && quicksort.finished) {
            let min = Math.min(insertionsort.pass, poresort.pass, mergesort.pass, quicksort.pass);
            if(min == insertionsort.pass){ wins[0]++; }
            if(min == poresort.pass){ wins[1]++; }
            if(min == mergesort.pass){ wins[2]++;}
            if(min == quicksort.pass){ wins[3]++;}
            newRun();
        }
        InsertionSort_Pass();
        Poresort_Pass();
        Mergesort_Pass();
        Quicksort_Pass();   
	}
    else{
        if(!raceComplete){
            var text = document.createElement("P")
            let win = Math.max(...wins);
            if(win == wins[0]){ winner = "Insertion Sort"; }
            else if(win == wins[1]){ winner = "Poresort"; }
            else if(win == wins[2]){ winner = "Mergesort"; }
            else if(win == wins[3]){ winner = "Quicksort"; }
            text.innerHTML = "Race is finished. Winner is " + winner + " with " + win + " wins.";
            //console.log("wins:", ...wins);
            text.id = "fin";
            document.getElementById("Title").appendChild(text);
            raceComplete = true;
		}        
	}
}

function InsertionSort_Pass(){
    if(!insertionsort.finished){
        if(insertionsort.pass != 0 && insertionsort.pass % g_canvas.hgt == 0){
              insertionsort.color == 'yellow' ? insertionsort.color = 'white' : insertionsort.color = 'yellow'
              insertionsort.y = 1;
		}
        g_bot.y = insertionsort.y;
        print_input(insertionsort.input, 1, g_bot.y, insertionsort.color);
        insertionsort.y++;

        InsertionSort();
        insertionsort.pass++;
        if(insertionsort.finished == true){
              print_input(insertionsort.input, 1, g_bot.y, 'aqua');
		}
        document.getElementById("movenum1").innerHTML = "# of Passes: " + insertionsort.pass;
	}
}

function Poresort_Pass(){
    if(!poresort.finished){
        if(poresort.pass != 0 && poresort.pass % g_canvas.hgt == 0){
              poresort.color == 'yellow' ? poresort.color = 'white' : poresort.color = 'yellow'
              poresort.y = 1;
		}
        g_bot.y = poresort.y;
        print_input(poresort.input, 18, g_bot.y, poresort.color);
        poresort.y++;

        Poresort();
        poresort.pass++;
        if(poresort.finished == true){
              print_input(poresort.input, 18, g_bot.y, 'aqua');
		}
        document.getElementById("movenum2").innerHTML = "# of Passes: " + poresort.pass;
	}
}

function Mergesort_Pass(){
    if(!mergesort.finished){
        if(!mergesort.sorted){
            Mergesort(mergesort.input);
            mergesort.sorted = true;
		}
        if(mergesort.pass != 0 && mergesort.pass % g_canvas.hgt == 0){
              mergesort.color == 'yellow' ? mergesort.color = 'white' : mergesort.color = 'yellow'
              mergesort.y = 1;
		}
        g_bot.y = mergesort.y;
        print_input(mergesort.arr[mergesort.i++], 35, g_bot.y, mergesort.color);
        
        if(mergesort.i == mergesort.arr.length){
            mergesort.finished = true;
            print_input(mergesort.arr[mergesort.i-1], 35, g_bot.y, 'aqua');
		}

        mergesort.y++;
        mergesort.pass++;
        document.getElementById("movenum3").innerHTML = "# of Passes: " + mergesort.pass;
	}
}

function Quicksort_Pass(){
    if(!quicksort.finished){
        if(!quicksort.sorted){
            quicksort.input = quicksort.input.split('');
            Quicksort(quicksort.input);
            //quicksort.input = quicksort.input.join("");
            //quicksort.arr.push(quicksort.input)
            quicksort.sorted = true;
		}
        if(quicksort.pass != 0 && quicksort.pass % g_canvas.hgt == 0){
              quicksort.color == 'yellow' ? quicksort.color = 'white' : quicksort.color = 'yellow'
              quicksort.y = 1;
		}
        g_bot.y = quicksort.y;
        print_input(quicksort.arr[quicksort.i++], 52, g_bot.y, quicksort.color);
        
        if(quicksort.i == quicksort.arr.length){
            quicksort.finished = true;
            print_input(quicksort.arr[quicksort.i-1], 52, g_bot.y, 'aqua');
		}

        quicksort.y++;
        quicksort.pass++;
        document.getElementById("movenum4").innerHTML = "# of Passes: " + quicksort.pass;
	}
}