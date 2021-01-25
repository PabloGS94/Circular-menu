// Select here the button that opens the menu and the wrapper element of the menu screen
const openMenu =  document.querySelector('#open-menu-btn');
const menu = document.querySelector('#menu');
const body = document.querySelector('body');
const closeMenu = document.querySelector('#menu-logo');
//Show menu
openMenu.addEventListener('click', ()=>{
    showMenu();
})
closeMenu.addEventListener('click', ()=>{
    hideMenu();
})


// Get Main list items as nodeList and its parent(ul)
const firstList = document.querySelectorAll('#main-list li');
const firstUl = document.querySelector('#main-list');


// First function that runs to display the menu 
function showMenu(){
    body.style.overflow = 'hidden';
    menu.style.display = 'block';
    //Animate menu background
    $('#second-circle').animate({
        left:'40%'
    },1000);
    $('#third-circle').animate({
        left:'-25%'
    },1000);   
    $('#first-circle').animate({
        left:'45%'
    },1000);    
    $(firstUl).animate({
        left: '57%'
    },700)
    
    animateList(firstList, firstUl);
    listenForArrows(firstList,firstUl);
    listenForScroll(firstList);
    
    // Prevents page from going up or down, allowing menu navigation with arrow keys
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([13,32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

}

// Takes two inputs, a nodeList with all the li items and its parent and displays the list, aswell as styling the initial location of each item
function animateList(list, listParent){
    listParent.style.display = 'block';
    // Iterate through all elements on the menu and add a click event listener to display that item in the center and move the rest accordingly
    list.forEach(function(element, index){
        // Style every element to the bottom right initially
        element.style.top = 200*index + 'px'; 
        element.style.left = 100*index + 'px'; 
        if(element.getAttribute('main') == 'true'){
            //Display arrow icon            
            elementIsMain(element);
        }
        element.addEventListener('click', ()=>{ 
            listenForClick(element,listParent)
        })
    });
}

let fullMenuDisplayed = false;
//Function that animates the background and displays the secondary menu
function displaySecondList(subListUl,subList){
    // Prevents background animation from firing again if another secondary menu has been displayed previously
    if (fullMenuDisplayed === true) {
        $('.third-list').each((index, thirdList)=>{
            resetHiddenList(thirdList);
            thirdList.style.display = 'none';

        }) 
        // Then display the new sub-menu
        animateList(subList, subListUl);
    }else{
        $('#second-circle').animate({
            left:'50%'
        },1000);
        $('#third-circle').animate({
            left:'15%'
        },1000);
        $(firstUl).animate({
            left: '63%'
        },700)    
        $('#grey-background').animate({
            left:0
        },0) 
        fullMenuDisplayed = true;
        animateList(subList, subListUl);
    }
    listenForArrows(subList,subListUl);
    listenForScroll(subList);
}
// Function that displays the third row of lists
function displayThirdList(subListUl, subList){
    // Get all third lists and check which one is displayed  and hide it   
    $('.third-list').each((index,list)=>{
        if (list.style.display === 'block') {
            list.style.display = 'none';
        }
    })  
    // Then display the new sub-menu
    animateList(subList, subListUl);
    listenForArrows(subList,subListUl);
    listenForScroll(subList);
}

// Main function that determines the element that will be displayed in the center(selected element) and the sub-list related to that item
function listenForClick(element,listParent){
    if (listParent.id === 'main-list') {
        //hide all other lists
        $('.second-list').each((index,secondList)=>{
            if (secondList.style.display === 'block') {
                resetHiddenList(secondList);
                secondList.style.display = 'none';
            }
        }) 
        $('.third-list').each((index, thirdList)=>{
            resetHiddenList(thirdList);
            thirdList.style.display = 'none';
        }) 
    }
        // If its the main element, nothing moves
        if(element.getAttribute('main') == 'true'){ 
            // Search for the Main item
            if(element.hasAttribute('main')){
                handleSubLists(element);
            }
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
            elementIsMain(element);
            handleSubLists(element);
        }
}
//Listens for arrow keys function and if its being pressed down or just pressed once
function listenForArrows(list,listParent){
    // Unbinds any previous arrow event listener to prevent calling the function several times
    $(document).unbind('keydown');
    // Transform each list from a nodeList to an array( necessary in order to reverse it)
    const listArr = jQuery.makeArray(list);
    // Reverse each array(necessary for arrow up functionality to prevent eternal loop through items)
    const reversedArr = listArr.reverse();
    //Event listener 
    $(document).keydown(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode === 40){
            //Arrow Down
            handleArrowControl(reversedArr, keycode,listParent);
        }else if(keycode === 38){
            //Arrow Up
            handleArrowControl(list, keycode,listParent);
        }else if(keycode === 37 || keycode === 13){
            //Arrow Left or Enter
            handleArrowControl(list,keycode, listParent);
        }else if(keycode === 39){
            //Arrow Right
            handleArrowControl(list, keycode, listParent);
        }
    });

    //Handles which list should be navigated with the arrows depending on which one is being displayed
    function handleArrowControl(list, keycode,listParent){        
            // Check if the list that was passed was from the third type and give it functionality
            if(listParent.classList.contains('third-list')){
                if(keycode === 40){
                    arrowDown(list);
                }else if(keycode === 38){
                    arrowUp(list);
                }else if(keycode === 37 || keycode === 13){ 
                    return;
                }else if(keycode === 39){
                    //Hide all third lists
                    $('.third-list').each((i, thirdList)=>{
                        resetHiddenList(thirdList);
                        thirdList.style.display = 'none';
                    })
                    //Find the secondary list that is being displayed and add the arrow event listener
                    $('.second-list').each((i,secondList)=>{
                        if (secondList.style.display === 'block') {
                            const secondListNodes = document.querySelectorAll('#'+secondList.id+' li');
                            listenForArrows(secondListNodes,secondList);
                        }
                    });
                }
            }            
            // Check if the list that was passed was from the second type
            else if (listParent.classList.contains('second-list')) {
                let thirdListDisplayed = false;
                // Then we iterate through all the third lists to see if one is being displayed, if so we remove the functionality from the second list, else we provide that functionality
                $('.third-list').each((i, thirdList)=>{
                    if (thirdList.style.display === 'block') {
                        thirdListDisplayed = true;
                    }
                });
                if (thirdListDisplayed === true){
                    return;
                }else{
                    if(keycode === 40){
                        arrowDown(list);
                    }else if(keycode === 38){
                        arrowUp(list);
                    }else if(keycode === 37 || keycode === 13){            
                        list.forEach(function(element, index){
                            // Search for the Main item
                            if(element.hasAttribute('main')){
                                handleSubLists(element);
                            }
                        });
                    }else if(keycode === 39){
                        //Hide all secondary lists
                        $('.second-list').each((index,secondList)=>{
                            resetHiddenList(secondList);
                            secondList.style.display = 'none';
                        }) 
                        // Add event listener again for main list
                        listenForArrows(firstList,firstUl);
                    }
                }
                
            }
            // Else it is the main list            
            else if (listParent.classList.contains('first-list')){
                let secondListDisplayed = false;
                // Check if any of the secondary lists is being displayed, if so we remove functionality from main list, else we provide that functionality
                $('.second-list').each((i, secondList)=>{
                    if (secondList.style.display === 'block') {
                        secondListDisplayed = true;
                    }
                });
                if (secondListDisplayed === true) {
                    return;
                }else{
                    if(keycode === 40){
                        arrowDown(list);
                    }else if(keycode === 38){
                        arrowUp(list);
                    }else if(keycode === 37 || keycode === 13){  
                        list.forEach(function(element, index){
                            // Search for the Main item
                            if(element.hasAttribute('main')){
                                handleSubLists(element);
                            }
                        });
                    }else if(keycode === 39){
                        return;
                    }
                }
            }
    }
    function arrowDown(reversedArr){        
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
                elementIsMain(reversedArr[index-1]);                          
                }
            }
        })
    };
    function arrowUp(list){    
        // Arrow down was pressed, move to item below
        list.forEach(function(element, index){
            // Search for the Main item
            if(element.hasAttribute('main')){
                // If the Main item is the last one then we return null
                if (list[index-1] === undefined) {
                    return null;
                }
                // Else we move every item downwards and we set the next item as the Main
                else{                
                    moveItemsDown(element);                 
                    elementIsMain(list[index-1]);
                }
            }
        });
    }
}
//Listens for the mousewheel to scroll up or down when a list is displayed
function listenForScroll(list){
    
    // Unbinds any previous wheel event listener to prevent calling the function several times
    $(list).unbind('wheel');

    //Scroll event listener
    $(list).on('wheel', function (e) {
        
        // Transform each list from a nodeList to an array( necessary in order to reverse it)
        const listArr = jQuery.makeArray(list);
        // Reverse each array(necessary for arrow up functionality to prevent eternal loop through items)
        const reversedArr = listArr.reverse();
        if (e.originalEvent.deltaY < 0) {
            $(reversedArr).each((i, item)=>{
                if (item.getAttribute('main')){ 
                    if (reversedArr[i-1] === undefined) {
                        return;
                    }else{           
                        moveItemsUp(item);
                        //Set Selected item to Main                 
                        elementIsMain(reversedArr[i-1]);
                    }
                }
            });

        } else {
            $(list).each((i, item)=>{
                if (item.getAttribute('main')){  
                    if (list[i-1] === undefined) {
                        return;
                    }else{         
                        moveItemsDown(item);
                        //Set Selected item to Main
                        elementIsMain(list[i-1]);
                    }
                }
            });
        }
    });
}


//Takes the Main element either from a click or from arrow left  and displays it's sub-list
function handleSubLists(element){
            // We get the atribute that makes the relationship between the link and the sub-menu
            const subListName = element.getAttribute('sub-list');
            const subListUl = document.querySelector('#'+subListName);
            const subList = document.querySelectorAll('#'+subListName+' li');
            // If the item has no sub-list we return nothing
            if(subListUl === null){
                return;
                //LINK TO PAGE?
            }else{
                // If the sub-list contains 'third-list' class, it means we are selecting from a secondary list
                if (subListUl.classList.contains('third-list')) {
                    // If the sub-menu is already visible then nothing happens
                    if (subListUl.style.display === 'block') {
                        return;
                    }
                    // Else we display it
                    else{
                        displayThirdList(subListUl,subList);
                    }
                }
                // Else we are selecting from the main list
                else{
                    // If the sub-menu is already visible then nothing happens
                    if (subListUl.style.display === 'block') {
                        return;
                    }
                    // Else we display it
                    else{
                        displaySecondList(subListUl,subList);
                    }
                }
            } 
}


//Takes two inputs, a required element and an optional value in case the element must move several times.
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
    elementIsNotMain(item);
}
//Takes two inputs, a required element and an optional value in case the element must move several times.
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
    elementIsNotMain(item);
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

// Takes a list that will be hidden and resets the first item to be the main one and takes whatever item was main before and removes the attribute
function resetHiddenList(list){
    const thirdListNodeEl = $('#'+list.id+' li');
    //Reset Main attribute for the list that will be hidden
    $(thirdListNodeEl).each((i,item)=>{
    
        if(item.getAttribute('main') == 'true'){
            //  Hide arrow icon
            elementIsNotMain(item);
            elementIsMain(thirdListNodeEl[0]);
        }
    })
}

//Takes an element and sets it to main attribute and style
function elementIsMain(element){
    element.setAttribute('main','true');
    element.classList.add('main');
    //Display arrow icon
    if(element.childNodes[0].tagName == "I"){
        element.childNodes[0].style.visibility = 'visible';
    }
}

//Takes an element and removes main attribute and style
function elementIsNotMain(element){
    // Remove Main attribute and styling
    element.removeAttribute('main');
    element.classList.remove('main');
    //Hide arrow icon
    if(element.childNodes[0].tagName == "I"){
        element.childNodes[0].style.visibility = 'hidden';
    }
}

//Animation to hide the menu
function hideMenu(){
    body.style.overflow = 'visible';
    //Animate menu background
    $('#second-circle').animate({
        left:'-200%'
    },1000);
    $('#third-circle').animate({
        left:'-200%'
    },1000);   
    $('#first-circle').animate({
        left:'200%'
    },1000);  
    menu.style.animation = 'fadeOut ease 1s';
    setTimeout(()=>{        
    menu.style.animation = 'fadeIn ease .3s';
    menu.style.display = 'none';
    },800)
    fullMenuDisplayed = false;
    
    const allSecondLists = document.querySelectorAll('.second-list');
    const allThirdLists = document.querySelectorAll('.third-list');
    allSecondLists.forEach((list, i)=>{
        list.style.display = 'none';
    })
    allThirdLists.forEach((list, i)=>{
        list.style.display = 'none';
    })
}