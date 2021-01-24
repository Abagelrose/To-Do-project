const switcher = document.querySelector('.toDo__titlecta');
var items = [1,2,3,4,5,6];
var itemsactive = [1,2,3,4,5,6];
var itemsleft = document.getElementById('itemsleft');
var endsect = document.getElementById('endsection');
var clear = document.getElementById('clear');
var filled =  document.getElementsByClassName('fill');

switcher.addEventListener('click', function() {
	document.body.classList.toggle('dark-theme');
	var className = document.body.className;
	if (className == 'light-theme') {
		// this.textContent = "Dark";
		//lightstyle();
	} else {
		//this.textContent = "Light";
		//darkstyle();
	}
	console.log('current class name: ' + className);
});
for (var w = 0; w < items.length; w++){
	var check = document.getElementsByClassName('toDo__cta');
	check[w].addEventListener("click",completeItem);
}
for (var d = 0; d < items.length; d++) {
	var deletes = document.getElementsByClassName("toDo__deletebtn");
	deletes[d].addEventListener("click",removeItem);
}

var input = document.getElementById("textInput");
input.addEventListener("keyup", function(event) {
  if (input.value != ""){
    if (event.key == "Enter") {
        event.preventDefault();
		creatingitem();
    }
  }
});

var activeall1 = document.getElementById('active1');
activeall1.addEventListener('click', function(){
for(var x = 0; x < items.length; x++){
	var checks = document.getElementsByClassName('toDo__cta');
	if(checks[x].classList.contains('fill')){
		var id1 = (checks[x].id).match(/\d+/g).map(Number);
		checks[x].classList.toggle("fill");
		itemsactive.push(id1[0]);
		itemsleft.textContent = itemsactive.length + " items left";
	}
}
});

var compall1 = document.getElementById('allcomp1');
compall1.addEventListener('click', function(){
for(var y = 0; y < items.length; y++){
	var checkss = document.getElementsByClassName('toDo__cta');
	console.log(checkss);
	if(!checkss[y].classList.contains('fill')){
		var id1 = (checkss[y].id).match(/\d+/g).map(Number);
		checkss[y].classList.toggle("fill");
		itemsactive = [];
	}
	itemsleft.textContent = itemsactive.length + " items left"
}
});

var activeall2 = document.getElementById('active2');
activeall2.addEventListener('click', function(){
for(var x = 0; x < items.length; x++){
	var checks = document.getElementsByClassName('toDo__cta');
	if(checks[x].classList.contains('fill')){
		var id1 = (checks[x].id).match(/\d+/g).map(Number);
		checks[x].classList.toggle("fill");
		itemsactive.push(id1[0]);
		itemsleft.textContent = itemsactive.length + " items left";
	}
}
});

var compall2 = document.getElementById('allcomp2');
compall2.addEventListener('click', function(){
for(var y = 0; y < items.length; y++){
	var checkss = document.getElementsByClassName('toDo__cta');
	console.log(checkss);
	if(!checkss[y].classList.contains('fill')){
		var id1 = (checkss[y].id).match(/\d+/g).map(Number);
		checkss[y].classList.toggle("fill");
		itemsactive = [];
	}
	itemsleft.textContent = itemsactive.length + " items left"
}
});





clear.addEventListener('click', function(){
	var c = 0;
	while( c < filled.length  ){
		if (filled.length > 0){
		
		
		filled =  document.getElementsByClassName('fill');
		var newidd = filled[c].id;
		console.log(c);
		
		var deleting = newidd.match(/\d+/g).map(Number);
		var deleted = document.getElementById(deleting);
		deleted.remove();
	
		
	}
	}
});




/* still in progress */

function sortable(section, onUpdate) {
	var dragEl, nextEl, newPos, dragGhost;

	let oldPos = [ ...section.children ].map((item) => {
		item.draggable = true;
		let pos = document.getElementById(item.id).getBoundingClientRect();
		return pos;
	});

	function _onDragOver(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';

		var target = e.target;
		if (target && target !== dragEl && target.nodeName == 'DIV') {
			if (target.classList.contains('inside')) {
				e.stopPropagation();
			} else {
				//getBoundinClientRect contains location-info about the element (relative to the viewport)
				var targetPos = target.getBoundingClientRect();
				//checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
				var next =
					(e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > 0.5 ||
					(e.clientX - targetPos.left) / (targetPos.right - targetPos.left) > 0.5;
				section.insertBefore(dragEl, (next && target.nextSibling) || target);

				/*  console.log("oldPos:" + JSON.stringify(oldPos));
             console.log("newPos:" + JSON.stringify(newPos)); */
				/* console.log(newPos.top === oldPos.top ? 'They are the same' : 'Not the same'); */
				console.log(oldPos);
			}
		}
	}

	function _onDragEnd(evt) {
		evt.preventDefault();
		newPos = [ ...section.children ].map((child) => {
			let pos = document.getElementById(child.id).getBoundingClientRect();
			return pos;
		});
		console.log(newPos);
		dragEl.classList.remove('ghost');
		section.removeEventListener('dragover', _onDragOver, false);
		section.removeEventListener('dragend', _onDragEnd, false);

		nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
	}

	section.addEventListener('dragstart', function(e) {
		dragEl = e.target;
		nextEl = dragEl.nextSibling;
		/* dragGhost = dragEl.cloneNode(true);
        dragGhost.classList.add('hidden-drag-ghost'); */

		/*  document.body.appendChild(dragGhost);
        e.dataTransfer.setDragImage(dragGhost, 0, 0); */

		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('Text', dragEl.textContent);

		section.addEventListener('dragover', _onDragOver, false);
		section.addEventListener('dragend', _onDragEnd, false);

		setTimeout(function() {
			dragEl.classList.add('ghost');
		}, 0);
	});
	endsect.draggable = false;

}

sortable(document.getElementById('list'), function(item) {
	/* console.log(item); */
});

/* The setData() method is used to add an item to the drag data, as shown in the following example.

function dragstart_handler(ev) {
  // Add the drag data
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.setData("text/html", "<p>Example paragraph</p>");
  ev.dataTransfer.setData("text/uri-list", "http://developer.mozilla.org"); */

/* you may succeed this a hacky solution. The native draggability doesn't allow CSS styles like: opacity:0;, visibility:hidden or display:none.
But you can do it using: transform:translateX(-9999px).
I've updated your JSFiddle with the solution. */


function creatingitem(){
  var list = document.querySelector('#list');
  var newid = document.createElement('div');
  var checkbutton = document.createElement('button');
  var fix = document.createElement('div');
  var text = document.createElement('div');
  var deletebtn = document.createElement('button');
  var max1 = 0;
  var max2 = 0;
  
  
  for (var i = 0; i < items.length; i++) {
    if(items[i] > max1){
      max1 = items[i];
    }
  }

  for (var h = 0; h < itemsactive.length; h++) {
    if(itemsactive[i] > max2){
      max2 = itemsactive[h];
    }
  
  }
  newid.id = max1 + 1;
  newid.classList = "toDo__item container--px flex flex-ai-c";
  items.push(max1 + 1);
  itemsactive.push(max1 + 1);
  newid.innerHTML;
  newid.draggable = true;
  checkbutton.classList =" button toDo__cta inside";
  checkbutton.id = "btn" + (max1 + 1);
  checkbutton.innerHTML;
  newid.appendChild(checkbutton);
  fix.classList = "toDo__fix flex flex-jc-sb flex-ai-c inside";
  fix.innerHTML;
  newid.appendChild(fix);
  text.classList = "toDo__text inside";
  text.textContent= input.value;
  text.innerHTML;
  fix.appendChild(text);
  deletebtn.classList = "inside button toDo__deletebtn";
  deletebtn.id = max1 + 1;
  deletebtn.innerHTML;
  fix.appendChild(deletebtn);
  input.value = "";
  itemsleft.textContent = itemsactive.length + " items left";
  checkbutton.addEventListener("click",completeItem);
  deletebtn.addEventListener("click",removeItem);
  
  list.appendChild(newid);
  	
}

function completeItem(){
	// grab the `li` by targeting the parent of the parent of the button (button -> div -> li)
	let item = this.parentNode.parentNode;
	// grab the `ul` (li -> ul)
	let parent = item.parentNode;
	// grab the parent id
	let id = parent.id;
	var id1 = (this.id).match(/\d+/g).map(Number);
  
	// check if the item should go in the completed or if it should be re-added to todo by using a ternary operator
	let target = (id === "list") ? document.getElementById("fill") : document.getElementById('list');
	var fill = document.getElementById(this.id);
	if( fill.classList.contains('fill') ){
		itemsactive.push(id1[0]);
		itemsleft.textContent = itemsactive.length + " items left";
		console.log('no');
	}
	for (var k = 0; k < itemsactive.length  && !fill.classList.contains('fill'); k++){
		
		if(itemsactive[k] == id1){
			
			itemsactive.splice(k, 1);
			console.log('yes');
			itemsleft.textContent = itemsactive.length + " items left";
			filled =  document.getElementsByClassName('fill');
		}
		
		
		
	}
	fill.classList.toggle("fill");
  } 
  
  function removeItem(){
	// grab the `li` by targeting the parent of the parent of the button (button -> div -> li)
	let item = this.parentNode.parentNode;
	// grab the `ul` (li -> ul)
	let parent  = item.parentNode;
	// remove `li` from `ul`
	for (var j=0; j < items.length; j++){
	
		if(items[j] == this.id){
			
			 
				items.splice(j, 1);
				
				
		}
	}

	for (var a=0; a < itemsactive.length; a++){

		if(itemsactive[a] == this.id){
			
			 
			itemsactive.splice(a, 1);
			itemsleft.textContent = itemsactive.length + " items left";
		}
	}
	parent.removeChild(item);
  }






