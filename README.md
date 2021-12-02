This is my very web first project - risograph-inspired etch-a-sketch. I made this project while working through the Odin Project's Foundations course in December 2021.

**About Riso**
Risograph or 'riso' printers are digital printers that layer each color with bright, semi-transparent inks. It became popular with zine-makers and illustators because it's an easy and scalable way to emulate the look of screen-printing, and because of the availability of a beautiful range of bright colors in the inks. I first learned about riso printing at the School of Visual Arts Riso Lab in NYC (https://risolab.sva.edu/). 

**Color Mixing and Layering**
One of the main draws of riso printing is the ability to play the transparency of the colors as you layer them. This is such a beautiful feature of working with riso and something I wanted to include in my etch-a-sketch. However, I really struggled with the implementation of this feature specifically.  I read that there are some easy ways to mix colors with PHP, SASS, and LESS, among other things, so I'll probably go back and update my code once I learn how to use those.

In the meantime, at first I tried to use mix-blend-mode but couldn't get it to work properly. I eventually gave up and decided to mix the colors with a formula I copied from convert programming-idioms.org (https://www.programming-idioms.org/idiom/154/halfway-between-two-hex-color-codes)

Then I ran into the issue of the browser converting back and forth between HEX, HEXA, RGB, and RBGA when you change the hues and saturations. At first I tried to use formulas again to manually convert between the color spaces (https://css-tricks.com/converting-color-spaces-in-javascript/ so that they could then be manually mixed), but eventually I realized it would be easier to save the hex code as a variable in each square and use that in the formula. I had to adjust to account for the transparency and I *finally* got the results that I want. I'll probably try to default to RGB for my next project, which hopefully will make experimenting with colors a bit easier. 


**Overall Thoughts**
This was a fun first project in that I was able to combine my interest in art and colors with what I've been practicing in Javascript + CSS. Things that I felt apprehensive about at first, like adding event listeners, now feel slightly less mysterious. 

**Future Updates**
I'd like to add the following functionalities at some future point:
    + Clicking to start and stop drawing
    + An eraser
    + The ability to save what you've created
    + the ability to toggle between an isometric grid