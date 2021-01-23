// Select here the button that opens the menu and the wrapper element of the menu screen
const openMenu =  document.querySelector('#open-menu-btn');
const menu = document.querySelector('#menu');
//Show menu
openMenu.addEventListener('click', ()=>{
    showMenu();
})

// Get all lists
const firstList = document.querySelectorAll('#first-list li');
const secondList = document.querySelectorAll('#second-list li');
const thirdList = document.querySelectorAll('#third-list li');
// Transform each list from a nodeList to an array( necessary in order to reverse it)
const secondListItemsArr = jQuery.makeArray(secondList);
const thirdListItemsArr = jQuery.makeArray(thirdList);
// Reverse each array(necessary for arrow up functionality to prevent eternal loop through items)
const firstReversedArr = firstListItemsArr.reverse();
const seconReversedArr = secondListItemsArr.reverse();
const thirdReversedArr = thirdListItemsArr.reverse();

animateList(firstList);
animateList(secondList);
animateList(thirdList);

function showMenu(){
    menu.style.display = 'block';
    //Select background  menu elements
    const firstCircle = document.querySelector('#first-circle');
    const secondCircle = document.querySelector('#second-circle');
    const thirdCircle = document.querySelector('#third-circle');
    const greyBackground = document.querySelector('#grey-background');
    const nav = document.querySelector('#nav')
    //Animate menu background
    $(secondCircle).animate({
        left:'50%'
    },1200);
    $(thirdCircle).animate({
        left:'15%'
    },1400);
    $(greyBackground).animate({
        left:0
    },1000)    
    $(firstCircle).animate({
        left:'45%'
    },1400);    
    setTimeout(()=>{
    nav.style.background = 'none';
    },600)
}
function animateList(list){
    // Iterate through all elements on the menu and add a click event listener to display that item in the center and move the rest accordingly
    list.forEach(function(element, index){
        // Style every element to the bottom right initially
        element.style.top = 200*index + 'px'; 
        element.style.left = 100*index + 'px'; 
        if(element.getAttribute('main') == 'true'){
            //Display arrow icon
            element.childNodes[0].style.visibility = 'visible';
        }
        element.addEventListener('click', ()=>{ 
            listenForClick(element)        
        })
    });
}

// Main function that determines the element that will be displayed in the center(selected element)
function listenForClick(element){
        // If its the main element, nothing moves
        if(element.getAttribute('main') == 'true'){
            console.log('Element is main');
            //Open another menu?
        
        // If the element is not main iterate through previous and next to find Main
        }else{    
            // Get all the previous and next elements to the one clicked
            const previousAll = $(element).prevAll();
            const nextAll = $(element).nextAll();


            // We iterate through both previous and next elements to determine where is the Main element relative to the selected element
            previousAll.each((index,item)=>{
                //Determine the Main element
                if(item.hasAttribute('main')){                
                    //Times that each element needs to move depending on how may steps away is the selected element from the Main element
                    let timesToMove = index;                    
                    moveItemsUp(item, timesToMove);  
                }
            });
            nextAll.each((index,item)=>{  
                //Determine the Main element
                if(item.hasAttribute('main')){                               
                    //Times that each element needs to move depending on how may steps away is the selected element from the Main element
                    let timesToMove = index;
                    moveItemsDown(item, timesToMove);
                };
            })
            
            //Set Selected item to Main            
            element.setAttribute('main', 'true');
            element.classList.add('main');
            //Display arrow icon
            element.childNodes[0].style.visibility = 'visible';
        }
}

//Listens for arrow keys function and if its being pressed down or just pressed once
function listonForArrows(list){
    var down = {};
    $(document).keydown(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '40'){
            if (down['40'] == null) { // first press
                // Arrow up was pressed, move to item above
                reversedArr.forEach(function(element, index){
                    // Search for the Main item
                    if(element.hasAttribute('main')){
                        // If the Main item is the last one then we return null
                        if (reversedArr[index-1] === undefined) {
                            return null;
                        }
                        // Else we move every item upwards and we set the next item as the Main
                        else{
                        moveItemsUp(element);
                        reversedArr[index-1].setAttribute('main', 'true');
                        reversedArr[index-1].classList.add('main')                    
                        reversedArr[index-1].childNodes[0].style.visibility = 'visible';
                        }
                    }
                });
                down['40'] = true; // record that the key's down
            }
        }else if(keycode === 38){
            if(down['38'] == null){
                // Arrow down was pressed, move to item below
                firstList.forEach(function(element, index){
                    // Search for the Main item
                    if(element.hasAttribute('main')){
                        // If the Main item is the last one then we return null
                        if (listItems[index-1] === undefined) {
                            return null;
                        }
                        // Else we move every item downwards and we set the next item as the Main
                        else{                
                            moveItemsDown(element);           
                            firstList[index-1].setAttribute('main', 'true');
                            firstList[index-1].classList.add('main');           
                            firstList[index-1].childNodes[0].style.visibility = 'visible';    
                        }
                    }
                });
            down['38'] == true;
            }
        }
    });
    $(document).keyup(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        down[keycode] = null;
    });

}


/*
    Takes two inputs, a required element and an optional value in case the element must move several times.
*/
function moveItemsUp(item,timesToMove = 0){ 
    // Define all previous and next elements to the Main element
    const mainPrevElements = $(item).prevAll();
    const mainNextElements = $(item).nextAll();
    
    // We move all elements upwards
    mainNextElements.each((index, nextItem)=>{         
        animateTopLeft(nextItem);
    });
    mainPrevElements.each((index, prevItem)=>{
        animateTopRight(prevItem);
    });
    animateTopRight(item);
    
    //If a value was provided we call the same function passing the next element on the list as many times as the selected element needs to travel
    if (timesToMove>0) { 
        for (let i = 0; i < timesToMove; i++) {
            moveItemsUp(mainNextElements[i])
        }
    }

    // We remove the atribute and styling of the previous Main element
    item.removeAttribute('main');
    item.classList.remove('main');
    // Hide arrow icon
    item.childNodes[0].style.visibility = 'hidden';
}


/*
    Takes two inputs, a required element and an optional value in case the element must move several times.
*/
function moveItemsDown(item,timesToMove = 0){
    // Define all previous and next elements to the Main element
    const mainPrevElements = $(item).prevAll();
    const mainNextElements = $(item).nextAll();

    // We move all elements downwards
    mainPrevElements.each((index, prevItem)=>{
        animateBotLeft(prevItem);
    });
    mainNextElements.each((index, nextItem)=>{
        animateBotRight(nextItem);
    });
    animateBotRight(item);

    //If a value was provided we call the same function passing the next element on the list as many times as the selected element needs to travel
    if (timesToMove>0) { 
        for (let i = 0; i < timesToMove; i++) {
            moveItemsDown(mainPrevElements[i])
        }
    }

    // We remove the atribute and styling of the previous Main element
    item.removeAttribute('main');
    item.classList.remove('main');
    //  Hide arrow icon
    item.childNodes[0].style.visibility = 'hidden';
}



/*
    ANIMATIONS: They take one input(the element to animate) and it moves it in the desired direction
*/
function animateTopLeft(el){
    $(el).animate({
        top: "-=200",
        left: "-=100"
    })
}

function animateTopRight(el){
    $(el).animate({
        top: "-=200",
        left: "+=100"
    })
}

function animateBotLeft(el){
    $(el).animate({
        top: "+=200",
        left: "-=100"
    })
}

function animateBotRight(el){
    $(el).animate({
        top: "+=200",
        left: "+=100"
    })
}


// Prevents page from going up or down, allowing menu navigation with arrow keys
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);