# Rotative-menu

In order to make this Menu work in your website, there are a few things that need to be adjusted so that the JavaScript file can do it's work.<br>

How it works:
  menu.js listens and looks for 3 type of lists, there can only be one Main list, but there can be as many lists of the second or third type.<br>
  
  Each list will be displayed in a column depending on the class given (first-menu, second-menu and third-menu).<br>
  
  The file will automatically style the initial position of the 'li' elements towards the bottom-right of the screen parting from the very first item on the list which
  should always start as the main element of that list.<br>
  
  Once an item on any of the list is clicked, that item will be moved dinamically to the center of the screen, moving all other items on the list accordingly
  creating the illusion of a wheel. If that selected item has a sub-list associated to it then that list will be displayed, hiding any other sub-list that might
  have been displayed previously and resetting the hidden list so that the first item is Main again.<br>
  If the item selected does not have a sub-list associated with,then is up to you to add an <a> tag and link it to another page.<br>
  
  The relationship between a link and a sub-list is very important and it's explained in the 'MUST HAVE' section.<br>
  
  You can navigate through the menu also with the arrows/enter keys and with the mouse wheel.<br>
  
  The background has been styled with a particular design if there is any adjusts or changes you would like to do look into the showMenu() and displaySecondList() 
  functions where the animation happens, and as a recommendation play only with the 'left' property to adjust to the screen unless you know exactly what you are doing :D.<br>
  
MUST HAVE:<br>
  -The button that opens the menu must have an id of 'open-menu-btn', if you would like to change this you can do so in line 2 of menu.js<br>
  -The button that closes the menu, currently is the logo which has an id of 'menu-logo', so give your logo an id of 'menu-logo' or if you incorporate a different
    way to close the menu, you can change the id in the line 5 of menu.js.<br>
  -The lists must be wrapped inside a <nav> tag with id 'nav', and then wrapped in a <div> tag with id 'menu'.<br>
  -All lists must be <ul> and populated with 'li' items. <br>
  -There can only be one Main list which must have an id of 'main-list'  (<ul id='main-list'></ul>)<br>
  -You must think for each list if it belongs to the second or third type and give it the corresponding class of 'second-list' or 'third-list'
   as I mentioned before, there can be any number of second or third type lists.<br>
  -All links should have the class of 'link'.<br>
  -The icons in each list item are SVG files imported from the Fontawesome library and if you want to use the same you have to include the fontawesome cdn in your html head
    or you can change the '<i>' tags for '<img>' but you will have to modify in lines 499 and 510 of menu.js the I for IMG (note the capital letters).<br>
   
   Very important!!<br>
   -The very first item of each list no matter the type must have the attribute main='true'.<br>
   -If a 'li' has a sub-list ralated to it, that link must have an attribute of sub-list='name-list' and  the list that is related to must have 
    an id of 'name-list'.<br>
   
   
   
 OVERALL IT SHOULD LOOK LIKE THIS:<br>
 
    <div id='menu'>
        <nav id='nav'>
            <ul id='main-list' class='second-list'>
                <li main='true' class='link main' sub-list='name-list' ><i class="fas fa-sort"></i>Main link</li>
                <li class='link'><i class="fas fa-sort"></i>Test link</li>
                <li class='link'><i class="fas fa-sort"></i>Test link</li>
            </ul>
            
            <!--Second list-->
            <ul id='name-list' class='second-list'>
                <li main='true' class='link main' sub-list='name2-list' ><i class="fas fa-sort"></i>Main link</li>
                <li class='link'><i class="fas fa-sort"></i>Test link</li>
                <li class='link'><i class="fas fa-sort"></i>Test link</li>
            </ul>

            <!--Third lists-->
            <ul id='name2-list' class='third-list'>
                <li main='true'  class='link main'>Test link</li>
                <li class='link'>Test link</li>
            </ul>
        </nav>
        
        <!-- Background images and logo -->
    </div>
   
   
   
   
   I hope you like this and if you encounter any problems please leave a comment.
   
   
   
   
   
   
   
   
   
   
   
