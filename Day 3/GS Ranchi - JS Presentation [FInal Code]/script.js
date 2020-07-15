var text = document.getElementById("welcome").innerHTML;
            console.log("The first heading is " + text);



document.getElementById("btn1").addEventListener("click",imageHandler);
function imageHandler()
{
    alert("Changing the image");
    document.getElementById("image").src="Images/magic.png";
}


document.getElementById("btn2").addEventListener("click",backgroundHandler);
function backgroundHandler()
{
    alert("Changing the background");
    document.body.style.background="yellow";
}

document.getElementById("btn3").addEventListener("click",messageHandler);
function messageHandler()
{
    document.getElementById("welcome").innerHTML="Welcome to JS Class";
}