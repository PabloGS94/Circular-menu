const openMenu =  document.querySelector('#open-menu-btn');
const menu = document.querySelector('#menu');

// Get all items on the menu
const listItems = document.querySelectorAll('li');
// Transform listItems from a nodeList to an array( necessary in order to reverse it)
const listItemsArr = jQuery.makeArray(listItems);
// Reverse the array(necessary for arrow up functionality to prevent eternal loop through items)
const reversedArr = listItemsArr.reverse()

//Show menu
openMenu.addEventListener('click', ()=>{
    showMenu();
})

function showMenu(){
    menu.style.display = 'block';
    listItems.forEach(function(element){
        $(element).fadeIn('slow')
    });
    //Animate circles
    const firstCircle = document.querySelector('#first-circle');
    const secondCircle = document.querySelector('#second-circle');
    const thirdCircle = document.querySelector('#third-circle');
    const greyBackground = document.querySelector('#grey-background');
    const nav = document.querySelector('#nav')
    $(secondCircle).animate({
        left:'50%'
    },1200);
    $(thirdCircle).animate({
        left:'20%'
    },1400);
    $(greyBackground).animate({
        left:0
    },1000)    
    $(firstCircle).animate({
        left:'40%'
    },2000);
    
    setTimeout(()=>{
    nav.style.background = 'none';
    },600)
}

// Adds event listener for arrow keys to navigate the menu
// document.onkeydown = checkKey;
// Iterate through all elements on the menu and add a click event listener to display that item in the center and move the rest accordingly
listItems.forEach(function(element){
    element.addEventListener('click', ()=>{ 
        //Avoids spam on links, prevents malfunction
        setTimeout(listenForClick,200,element);
    })
});

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

        }
}

// $(document).keydown(function(event){
//     $flag=false;
//     var keycode = (event.keyCode ? event.keyCode : event.which);

//     if(keycode === 40){
//         if(!$flag){
//             $flag=true;
//         }
//     }else if(keycode === 38){
//         $flag=true;

//     }
 
// });
var down = {};

$(document).keydown(function(event){
    let runningAnimation = false
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if  (runningAnimation = true){
        if(keycode == '40'){
            if (down['40'] == null) { // first press
                
                runningAnimation = true;
                setTimeout(()=>{
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
                            }
                        }
                    });
                },200)
                
                runningAnimation = false;
                down['40'] = true; // record that the key's down
            }
        }else if(keycode === 38){
            if(down['38'] == null){
                runningAnimation = true;
                setTimeout(()=>{
                    // Arrow down was pressed, move to item below
                    listItems.forEach(function(element, index){
                        // Search for the Main item
                        if(element.hasAttribute('main')){
                            // If the Main item is the last one then we return null
                            if (listItems[index-1] === undefined) {
                                return null;
                            }
                            // Else we move every item downwards and we set the next item as the Main
                            else{                
                                moveItemsDown(element);           
                                listItems[index-1].setAttribute('main', 'true');
                                listItems[index-1].classList.add('main');
            
                            }
                        }
                    });

                },200)
                runningAnimation = false;
                down['38'] == true;
            }
        }
    }else{
        console.log('animation running');
    }
});

$(document).keyup(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    down[keycode] = null;
});
//Function that determines if the arrow up or arrow down was pressed and move elements accordingly
// function checkKey(e) {

//     e = e || window.event;

//     if (e.keyCode === 40) {
//     }
//     else if (e.keyCode === 38) {
        
//     }
// }


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