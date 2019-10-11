	function diveto(){let a=location.hash,al=a.length;
						if(al)return a.substr(1,al-1);return null;}
	function relocate(){let s=diveto();
						if(s)relocateit(document.getElementById(s));}	
    function divein(a){if(a!==null)for(;a.tagName!=='body';a=a.parentElement)	 
						a.childNodes[1].setAttribute("checked","checked");}
	function relocateid(i){	location.hash=i;relocateit(document.getElementById(i));}								
    function relocateit(b,at=0){b.scrollIntoView({inline:"end"});
						b.style.borderColor='purple';b.style.borderStyle='double none';
						divein(b);}		
    function occurrencesOf(e,v){let r=[];
		for(ontag=0,l=v.length,el=e.length,i=0;i<el;){i=e.indexOf(v,i+l);
			   if(i===-1)break; 			// console.log("occurrencesOf  - r,i:",r,i);
			   ontag=e.lastIndexOf('<',i);//		console.log(x,i);
			   let tag1=e[ontag+1], tag3=e.substr([ontag+1],3);
			   if(tag1!=='a'&&tag3!=="<di")   //   &&tag3!=="<la" and why having 
			       r.push(i);}//// filling r with  found v  only if the tag is not of link	     
	    return r;}	  // else console.log(i," was not pushed tag3=", tag3);			  //console.log("occurrencesOf  - r:",r);
	function removehtag(hiliteTag){let arr = document.getElementsByTagName(hiliteTag);// remove highlighting //console.log("removehtag ",arr);
		while(arr.length && (el = arr[0])) {let parent = el.parentNode;
					parent.replaceChild(el.firstChild, el);
					parent.normalize();}};								
	function unfold(n,oc={}){if(oc.length){	
		let highlight = new Highlight(document.querySelectorAll(".content-inner")[n]); // id of the element to parse
		highlight.apply(document.getElementById("searchItem").value);
		} relocateit(document.querySelectorAll(".content-inner")[n]); } 
	function resultb(n,r,i={},l=0){let bu = document.createElement("button");
			bu.innerHTML= l.toString(); // r.toString()+here we should have number of results in the element
		//	bu.onmouseover=marked;// on hover;
			bu.type		="button";	
//			bu.background-color ='purple';				
			bu.addEventListener("click", function(){unfold(n,i);}, false);			
			return bu;}
				
	function cleaning(alsov=true){let res=document.getElementById("searchresults");
	  while(res.childNodes[0]) res.removeChild(res.childNodes[0]);
	  document.getElementById("searchmsg").textContent='';
	  if(alsov){
		  console.log("alsov in cleaning ");
		  removehtag( "MARK");//document.getElementById("searchItem").value||
	  document.getElementById("searchItem").value='';
  }
	  return res;}
	  		
	function findit(a){if(a){//		 console.log("findit a", a);
		let res=cleaning(false);
	  let item = document.querySelectorAll(".content-inner"),//document.querySelec­torAll("content-inner");// getting the hidden element from the doby.
		  maxn = item.length,  r = 0,	n = 0, t = 0;//console.log("maxn="+maxn);
	  for(;n<maxn&&r<100;n++){let i=occurrencesOf(item[n].innerHTML,a);//		  let i=occurrencesOf(item[n].outerHTML,a);//item[n].outerHTML.indexOf(a);//item[n].innerHTML.indexOf(a);					
		   if (i.length){res.appendChild(resultb(n,r++,i,i.length));
				t+=i.length;}}
		   document.getElementById("searchmsg").textContent=t.toString();
		  return t;	 } 
		  else cleaning(true);;
		  }
		  
function Highlight(id, tag){////https://www.the-art-of-web.com/javascript/search-highlight/  Original JavaScript code by Chirp Internet: www.chirp.com.au // Please acknowledge use of this code by including this header.
  let targetNode = id;//document.getElementById(id) || document.body;
  let hiliteTag = tag || "MARK";
  let skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
  let colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
  let wordColor = [];
  let colorIdx = 0;
  let matchRegExp = "";
  let openLeft = false;
  let openRight = false; 
  let endRegExp = new RegExp('^[^\\w]+|[^\\w]+$', "g");// characters to strip from start and end of the input string 
  let breakRegExp = new RegExp('[^\\w\'-]+', "g");// characters used to break up the input string into words

  this.setEndRegExp = function(regex) {  endRegExp = regex;
										 return endRegExp; };
  this.setBreakRegExp = function(regex) {breakRegExp = regex;
										return breakRegExp;  };
  this.setMatchType = function(type){switch(type){
      case "left": this.openLeft = false;  this.openRight = true;break;
      case "right":this.openLeft = true;   this.openRight = false;break;
      case "open": this.openLeft = this.openRight = true; break;
      default:        this.openLeft = this.openRight = false;    }  };
  this.setRegex = function(input){
    input = input.replace(endRegExp, "");
    input = input.replace(breakRegExp, "|");
    input = input.replace(/^\||\|$/g, "");
    if(input) { let       re = "(" + input + ")";
      if(!this.openLeft)  re = "\\b" + re;
      if(!this.openRight) re = re + "\\b";
      matchRegExp = new RegExp(re, "i");
      return matchRegExp; }
    return false;  };
  this.getRegex = function() { let retval = matchRegExp.toString();
	retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;  };
  this.hiliteWords = function(node){// recursively apply word highlighting
    if(node === undefined || !node) 	return;
    if(!matchRegExp) 					return;
    if(skipTags.test(node.nodeName)) 	return;
    if(node.hasChildNodes()){for(let i=0; i < node.childNodes.length; i++)
								this.hiliteWords(node.childNodes[i]);}
    if(node.nodeType == 3) { // NODE_TEXT
      if((nv = node.nodeValue) && (regs = matchRegExp.exec(nv))) {
        if(!wordColor[regs[0].toLowerCase()]) 
			wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
        let match = document.createElement(hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
        match.style.color = "#000";
        let after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }    }  };//      }    };  };

  
  this.remove = function(){let arr = document.getElementsByTagName(hiliteTag);// remove highlighting
    while(arr.length && (el = arr[0])) {let parent = el.parentNode;
					parent.replaceChild(el.firstChild, el);
					parent.normalize();    }  };
  
  this.apply = function(input){ this.remove();// start highlighting at target node
    if(input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ""))) return;    
    if(this.setRegex(input)) this.hiliteWords(targetNode);    
    return matchRegExp;};
}// end of Highlight
//let lv=a.length;//			   console.log(n +"startloop i="+i); //v=document.getElementById("searchItem").value,
//  <body onfocus="relocate()">
// <body onfocus="relocate(data-active-id)"> 

 //<body >					  	
