
// Get all items on the menu
const listItems = document.querySelectorAll('li');
// Iterate through all items
listItems.forEach(function(element,index){
    element.addEventListener('click', ()=>{       

        // Get all the previous and next elements to the one clicked
        const previousAll = $(element).prevAll();
        const nextAll = $(element).nextAll();

        // If its the main element, nothing moves
        if(element.getAttribute('main') == 'true'){
            console.log('Element is main');
        
        // If the element is not main iterate through previous and next to find Main
        }else{            
            //Set Selected item to Main            
            element.setAttribute('main', 'true');
            element.classList.add('main');

            //Iterate through all elements before the clicked one
            previousAll.each((index,item)=>{                
                
                // Define all previous and next elements to each one of the items
                const itemPrevElements = $(item).prevAll();
                const itemNextElements = $(item).nextAll();

                //Determine old Main to change position and remove styling
                if(item.hasAttribute('main')){
                    
                    //Times that each element needs to move depending on how may steps away are they from the old Main
                    let timesToMove = index + 1;
                    //Remove old Main
                    item.removeAttribute('main');
                    item.classList.remove('main');

                    //Move selected Element, and if there is more than one item in between, repeat movement
                    animateTopLeft(element)
                    for (let i = 1; i < timesToMove; i++) {
                        setTimeout(animateTopLeft, 100, element)
                    }

                    //Move old Main, and if there is more than one item in between, repeat movement
                    animateTopRight(item)
                    for (let i = 1; i < timesToMove; i++) {
                        setTimeout(animateTopRight, 100, item)
                    }

                    // If the items need to move more than one time
                    if(timesToMove > 1){
                        // Move each item previous to old Main timesToMove times
                        for (let i = 0; i < timesToMove; i++) {
                            const prevSibling = itemPrevElements[i];
                            animateTopRight(prevSibling);
                            setTimeout(animateTopRight,100, prevSibling);
                        }
                        //Move each item after Main first left then right( passing through center effect ) as many times as items between old Main and selected item
                        for (let i = 0; i < itemNextElements.length - 1; i++) {
                            const nextSibling = itemNextElements[i];
                            animateTopLeft(nextSibling);
                            setTimeout(animateTopRight,100, nextSibling);
                        }

                    }
                    //Else if items need to move only once, then go ahead and move one time in the correct direction
                    else{
                        // Move all items previous to old Main to top-right
                        itemPrevElements.each((index, prevElement)=>{
                            animateTopRight(prevElement);
                        })
                        //Move all items after old Main to top-left
                        itemNextElements.each((index, nextElement)=>{
                            animateTopLeft(nextElement);
                        })
                    }
                }
            })

            //Iterate through all elements after the clicked one
            nextAll.each((index,item)=>{                 
                
                // Define all previous and next elements to each one of the items
                const itemPrevElements = $(item).prevAll();
                const itemNextElements = $(item).nextAll();

                //Determine old Main to change position and remove styling
                if(item.hasAttribute('main')){
                    
                    //Times that each element needs to move depending on how may steps away are they from the old Main
                    let timesToMove = index + 1;

                    //Remove old Main
                    item.removeAttribute('main');
                    item.classList.remove('main');

                    //Move selected Element, and if there is more than one item in between, repeat movement
                    animateBotLeft(element)
                    for (let i = 1; i < timesToMove; i++) {
                        setTimeout(animateBotLeft, 100, element)
                    }

                    //Move old Main, and if there is more than one item in between, repeat movement
                    animateBotRight(item)
                    for (let i = 1; i < timesToMove; i++) {
                        setTimeout(animateBotRight, 100, item)
                    }
                    
                    // If the items need to move more than one time
                    if(timesToMove > 1){
                        // Move each item previous to old Main timesToMove times
                        for (let i = 0; i < timesToMove; i++) {
                            const nextSibling = itemNextElements[i];
                            animateBotRight(nextSibling);
                            setTimeout(animateBotRight,100, nextSibling);
                        }
                        //Move each item first left then right( passing through center effect ) as many times as items between old Main and selected item
                        for (let i = 0; i < itemPrevElements.length - 1; i++) {
                            const nextSibling = itemPrevElements[i];
                            animateBotLeft(nextSibling);
                            setTimeout(animateBotRight,100, nextSibling);
                        }
                    }
                    //Else if items need to move only once, then go ahead and move one time in the correct direction
                    else{
                        // Move all items previous to old Main to top-right
                        itemPrevElements.each((index, prevElement)=>{
                            animateBotLeft(prevElement);
                        })
                        //Move all items after old Main to down-right
                        itemNextElements.each((index, nextElement)=>{
                            animateBotRight(nextElement);
                        })
                    }
                }
            })
        }
    })
    
});

function animateTopLeft(el){    
    TweenLite.to(el, .2,{
        y: "-=200",
        x: "-=100"
    })
    // $(el).animate({
    //     top: "-=200",
    //     left: "-=100"
    // })
}

function animateTopRight(el){
    TweenLite.to(el, .2,{
        y: "-=200",
        x: "+=100"
    })
    // const elPos = $(el).position();
    // $(el).animate({
    //     top: "-=200",
    //     left: "+=100"
    // })
}

function animateBotLeft(el){
    TweenLite.to(el, .2,{
        y: "+=200",
        x: "-=100"
    })
    // $(el).animate({
    //     top: "+=200",
    //     left: "-=100"
    // })
}

function animateBotRight(el){
    TweenLite.to(el, .2,{
        y: "+=200",
        x: "+=100"
    })
    // const elPos = $(el).position();
    // $(el).animate({
    //     top: "+=200",
    //     left: "+=100"
    // })
}

function animateToZero(el){
    $(el).animate({
        top:0,
        left:0
    })
}