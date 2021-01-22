
// Get all items on the menu
const listItems = document.querySelectorAll('li');
// Iterate through all items
listItems.forEach(function(element){
    element.addEventListener('click', ()=>{ 
        setTimeout(listenForClick,200,element);
    })
});

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

            //Iterate through all elements before the clicked one to find Main
            iteratePrevElements(previousAll, element);

            //Iterate through all elements after the clicked one to find Main
            iterateNextElements(nextAll, element);
            
            //Set Selected item to Main            
            element.setAttribute('main', 'true');
            element.classList.add('main');

        }
}


function iteratePrevElements(previousAll, element){
    previousAll.each((index,item)=>{              

        //Determine the Main element
        if(item.hasAttribute('main')){
            // Define all previous and next elements to the Main element
            const mainPrevElements = $(item).prevAll();
            const mainNextElements = $(item).nextAll();
            
            //Times that each element needs to move depending on how may steps away is the selected element from the Main element
            let timesToMove = index + 1;

            // If the items need to move more than one time
            if(timesToMove > 1){
                // Move each item previous to old Main timesToMove times
                for (let i = 0; i < timesToMove; i++) {
                    const prevSibling = mainPrevElements[i];
                    animateTopRight(prevSibling);
                    setTimeout(animateTopRight,0, prevSibling);
                }
                //Move each item after Main first left then right( passing through center effect ) as many times as items between old Main and selected item
                for (let i = 0; i < timesToMove - 1; i++) {
                    const nextSibling = mainNextElements[i];
                    animateToZero(nextSibling);
                    setTimeout(animateTopRight,0, nextSibling);
                }
                //Move selected Element, and if there is more than one item in between, repeat movement
                animateTopLeft(element)
                setTimeout(animateToZero, 0, element)

            }
            //Else if items need to move only once, then go ahead and move one time in the correct direction
            else{
                // Move all items previous to old Main to top-right
                mainPrevElements.each((index, prevElement)=>{
                    animateTopRight(prevElement);
                })
                //Move all items after old Main to top-left
                mainNextElements.each((index, nextElement)=>{
                    animateTopLeft(nextElement);
                })
                animateToZero(element);
            }

            //Move old Main, and if there is more than one item in between, repeat movement
            animateTopRight(item)
            for (let i = 1; i < timesToMove; i++) {
                setTimeout(animateTopRight, 100, item)
            }
            
            //Remove old Main
            item.removeAttribute('main');
            item.classList.remove('main');
        }
    })
}


function iterateNextElements(nextAll, element){
    nextAll.each((index,item)=>{                
    // Define all previous and next elements to each one of the items
    const mainPrevElements = $(item).prevAll();
    const mainNextElements = $(item).nextAll();

    //Determine old Main to change position and remove styling
    if(item.hasAttribute('main')){
        
        //Times that each element needs to move depending on how may steps away are they from the old Main
        let timesToMove = index + 1;
        
        // If the items need to move more than one time
        if(timesToMove > 1){
            // Move each item previous to Main element timesToMove times
            for (let i = 0; i < timesToMove; i++) {
                const nextSibling = mainNextElements[i];
                animateBotRight(nextSibling);
                setTimeout(animateBotRight,0, nextSibling);
            }
            //Move each item first left then right( passing through center effect ) as many times as items between old Main and selected item
            for (let i = 0; i < timesToMove - 1; i++) {
                const prevSibling = mainPrevElements[i];
                animateToZero(prevSibling);
                setTimeout(animateBotRight,0, prevSibling);
            }
            //Move selected Element, and if there is more than one item in between, repeat movement
            animateBotLeft(element)
            setTimeout(animateToZero, 0, element)
        }
        //Else if items need to move only once, then go ahead and move one time in the correct direction
        else{
            // Move all items previous to old Main to top-right
            mainPrevElements.each((index, prevElement)=>{
                animateBotLeft(prevElement);
            })
            //Move all items after old Main to down-right
            mainNextElements.each((index, nextElement)=>{
                animateBotRight(nextElement);
            })//Move selected Element, and if there is more than one item in between, repeat movement
            animateToZero(element)

            //Remove old Main
            item.removeAttribute('main');
            item.classList.remove('main');
        }

        //Move  Main element, and if there is more than one item in between, repeat movement
        animateBotRight(item)
        for (let i = 1; i < timesToMove; i++) {
            setTimeout(animateBotRight, 0, item)
        }
            
        //Remove old Main
        item.removeAttribute('main');
        item.classList.remove('main');
    }
})  
}























                                                                            //ANIMATIONS
function animateTopLeft(el){    
    // TweenLite.to(el, .2,{
    //     y: "-=200",
    //     x: "-=100"
    // })
    $(el).animate({
        top: "-=200",
        left: "-=100"
    })
}

function animateTopRight(el){
    // TweenLite.to(el, .2,{
    //     y: "-=200",
    //     x: "+=100"
    // })
    $(el).animate({
        top: "-=200",
        left: "+=100"
    })
}

function animateBotLeft(el){
    // TweenLite.to(el, .2,{
    //     y: "+=200",
    //     x: "-=100"
    // })
    $(el).animate({
        top: "+=200",
        left: "-=100"
    })
}

function animateBotRight(el){
    // TweenLite.to(el, .2,{
    //     y: "+=200",
    //     x: "+=100"
    // })
    $(el).animate({
        top: "+=200",
        left: "+=100"
    })
}

function animateToZero(el){
    $(el).animate({
        top:0,
        left:0
    })
}