const base_url= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns= document.querySelectorAll(".dropdown select");
const btn= document.querySelector(".exchange");
let fromCurr= document.querySelector(".from select");
let toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");
const changebtn= document.querySelector(".arrowbtn");
for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value=currCode;
        if(select.name==="from"&&currCode==="INR")
        {
            newOption.selected=true;
        }
        else if(select.name==="to"&&currCode==="USD")
        {
                newOption.selected=true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag =(element)=>{
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;

}
const updateExchange= async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal= amount.value;
    if(amtVal===""||amtVal<1)
    {
        amtVal=1;
        document.querySelector(".amount input").value="1";
    }
    const url=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data= await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalamt= amtVal*rate;
    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;

};
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchange();
});
changebtn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    let obj=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=obj;
    updateExchange();
    let fromOption=document.createElement("Option");
    fromOption=fromCurr.value;
    fromOption.innerText=fromCurr.value;
    let toOption=document.createElement("Option");
    toOption=toCurr.value;
    toOption.innerText=toCurr.value;
    for(let select of dropdowns)
    {
        if(select.name==="from")
        {
            fromOption.selected=true;
        }
        else if(select.name==="to"){
            toOption.selected=true;
        }
        updateFlag(select);
    }
   
});
