const button = document.querySelector("#button");
const content = document.querySelector("#card");

button.addEventListener("click", function () {
content.classList.toggle("content-hidden");

if (content.classList.contains("content-hidden"))
{button.textContent = "SHOW"}

else {button.textContent = "HIDE"}

})





const headers = document.querySelectorAll("[data-name='accordeon-title']")

headers.forEach(function (item) 
{
item.addEventListener("click", showContent)
function showContent() {
 this.nextElementSibling.classList.toggle("hidden");
}
})



const tabHeaders = document.querySelectorAll("[data-tab]");
const tabContent = document.querySelectorAll("[data-tab-content]");


 tabHeaders.forEach(function (item) {

    item.addEventListener("click", function () {

        tabHeaders.forEach(function (item) {
            item.classList.add("aktiv");

        })

        tabContent.forEach(function (item) {
            item.classList.add("hidden");

        })

        const contentBox = document.querySelector("#" + this.dataset.tab);
        contentBox.classList.remove("hidden");      
        })

    })
    
