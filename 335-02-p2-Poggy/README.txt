Readme for Sort Race
Time-stamp: <2020-10-28 Luc Dang>
------------------------------------------------------------

Intro

  This project compares the sorting times of 4 different sorting algorithms and displays
  them onto the webpage with p5.js. The project will compare Insertion Sort, Pore sort,
  Merge sort, and Quick sort. Program will select the string to sort randomly out of a 
  set of 12. Refresh the webpage for a different string to sort.

Zip Contents

  File readme.txt.  This file.

  File Race.png.  A snapshot of the program after one race pass has completed.

  File Project2Complexity.pdf.  A report of the Big-O Complexity of this project.

  File SortRace.html. Drag and drop this into a browser to run the example.
    Click anywhere to call a pass on each sort. (Used to speed up the race)
    Hit (almost) any key to pause and unpause the race.

  File p5.js. This is the P5 package.  It is loaded inside the html.

  File cs-sketch.js.
    Will call pass() function on every frame to display to the webpage.

  File assets/Sorts.js
    Contains all sort-related functions and properties defined by Luc Dang.
    Controls each pass for each sort the information passed between. 

  File assets/styles.css.  css file provided by Professor Siska.

  File assets/draw-stuff.js. 
    Contains many project-oriented functions defined by Luc Dang.
    Will manipulate the grid to draw and color for displaying to the webpage.

Installation & Running

  1. Extract the .zip file into a folder.

  2. Drag the index HTML file, SortRace.html., into a browser
    window.  The example P5 program should start immediately.  You
    should see a grid (gray lines on black background) with
    column headers and the race starting. See the picture Race.png
    for a image of an end to a race.

  3. Refresh the webpage for a new randomly selected string to sort.

Known Bugs

  o- Program will only display one winner in a case of a tie

Warnings

  o- Testing was light.  Didn't try all key or mouse combos.

Testing

  o- Followed multiple sort races. All sorts work well.

Credits

  Skeleton code provided by Professor Siska (CSUF)
  Quicksort code logic borrowed from https://www.guru99.com/quicksort-in-javascript.html

  And, of course, thanks to the HTML and P5.js developers.
