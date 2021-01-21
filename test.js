
// Get all items on the menu
const listItems = document.querySelectorAll('li');
// Iterate through all items
listItems.forEach(function(element,index){
    element.addEventListener('click', ()=>{

        let elementPos = $(element).position();        

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

                // Get the position of each element
                let itemPos = $(item).position();
                
                
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

                    //Move old Main and next item
                    $(item).animate({
                        top: itemPos.top + (-150 * timesToMove),
                        left: itemPos.left + (150 * timesToMove)
                    })

                    if(timesToMove > 1){
                        const nextSibling = $(itemNextElements[0])
                        let nextSiblingPos = $(nextSibling).position();
                        console.log('moving left');
                        $(nextSibling).animate({
                            top: nextSiblingPos.top -150,
                            left: nextSiblingPos.left -150
                        })     
                        const newSiblingPos = $(nextSibling).position();                  
                        console.log('moving right'); 
                        $(nextSibling).animate({
                            top: newSiblingPos.top -300,
                            left: newSiblingPos.left +150
                        })

                    }else{
                        // Move all items previous to old Main to top-right
                        itemPrevElements.each((index, prevElement)=>{
                            let prevElemPos = $(prevElement).position()
                            $(prevElement).animate({
                                top: prevElemPos.top + (-150 * timesToMove),
                                left: prevElemPos.left + (150 * timesToMove)
                            })
                        })
                        //Move all items after old Main to down-right
                        itemNextElements.each((index, nextElement)=>{      
                            let nextElemPos = $(nextElement).position()                                 
                            $(nextElement).animate({
                                top: nextElemPos.top + (-150 * timesToMove),
                                left: nextElemPos.left  + (-150 * timesToMove)
                            })
                        })
                    }
                }else{
                    return null;
                    // If the item is the last one on the list, we find how many positions are between the item and the Main
                    if (itemPrevElements[0] == undefined){
                        console.log('Last item:',item);
                        itemNextElements.each((index, nextElement)=>{
                            if(nextElement.hasAttribute('main')){
                                console.log('Main is:',nextElement,index);
                                // If its more than 2 steps we hide it else we show it
                                if(index>1){ 
                                    $(item).animate({
                                        top:itemY - 550,
                                        left:itemX + 550
                                    })
                                }else{                
                                    $(item).animate({
                                        top:itemY - 150,
                                        left:itemX + 150
                                    })
                                }                       
                            }
                        });
                    }
                    // If the item is not the last on the list, then we swap the position of the item to it's previous one
                    else{                
                        $(item).animate({
                            top:itemY - 150,
                            left:itemX + 150
                        })
                    }
                }
            })

            //Iterate through all elements after the clicked one
            nextAll.each((index,item)=>{ 

                // Get the position of each element
                let itemPos = $(item).position();     

                // Get the position of each element
                let itemX = $(item).position().left;
                let itemY = $(item).position().top;
                
                
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

                    //Move old Main and next item
                    $(item).animate({
                        top: itemPos.top + (150 * timesToMove),
                        left: itemPos.left + (150 * timesToMove)
                    })

                    // Move all items previous to old Main to top-right
                    itemPrevElements.each((index, prevElement)=>{
                        let prevElemPos = $(prevElement).position()
                        $(prevElement).animate({
                            top: prevElemPos.top + (150 * timesToMove),
                            left: prevElemPos.left + (-150 * timesToMove)
                        })
                    })
                    //Move all items after old Main to down-right
                    itemNextElements.each((index, nextElement)=>{      
                        let nextElemPos = $(nextElement).position()                                 
                        $(nextElement).animate({
                            top: nextElemPos.top + (150 * timesToMove),
                            left: nextElemPos.left  + (150 * timesToMove)
                        })
                    })
                }else{
                    return;
                    // If the item is the last one on the list, we find how many positions are between the item and the Main
                    if (itemNextElements[0] == undefined){
                        console.log('Last item:',item);
                        itemPrevElements.each((index, prevElement)=>{
                            if(prevElement.hasAttribute('main')){
                                console.log('Main is:',prevElement,index);
                                // If its more than 2 steps we hide it else we show it
                                if(index>1){
                                    $(item).animate({
                                        top:itemY + 550,
                                        left:itemX + 550
                                    })
                                }else{               
                                    $(item).animate({
                                        top:itemY - 150,
                                        left:itemX - 150
                                    })
                                }                       
                            }
                        });
                    }
                    // If the item is not the last on the list, then we swap the position of the item to it's previous one
                    else{                
                        $(item).animate({
                            top:itemY - 150,
                            left:itemX - 150
                        })
                    }
                }
            })
        }
    })
    
});