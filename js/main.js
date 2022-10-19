var elCardItem = document.querySelector(".card-list");

var slicePokemon = pokemons.slice(0, 148);

for (var i of slicePokemon) {
    var newItem = document.createElement("li")
    var badge = document.createElement("span");
    var titleWrap = document.createElement("div");
    var title = document.createElement("h2");
    var imgWrap = document.createElement("div");
    var img = document.createElement("img");
    var time = document.createElement("time");
    var subtitleWrap = document.createElement("div");
    var subtitle = document.createElement("strong");

    // Ochilgan elementlarga qiymat berish
    badge.textContent = i.num;
    title.textContent = i.name;
    img.src = i.img;
    img.width = "200";
    img.height = "200";
    img.alt = i.name;
    time.textContent = i.spawn_time
    time.setAttribute("datetime", `10-19-2022 ${i.spawn_time}`);
    subtitle.textContent = i.candy;

    // Style
    newItem.classList.add("card-item");
    badge.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "badge", "rounded-pill", "bg-danger")
    titleWrap.classList.add("title-wrap")
    imgWrap.classList.add("img-wrap")
    subtitleWrap.classList.add("subtitle-wrap")
    subtitle.style.fontWeight = 500;
    time.classList.add("time-wrap")

    // Elementlarni domga chiqarish
    newItem.appendChild(badge)
    titleWrap.appendChild(title)
    newItem.appendChild(titleWrap)
    imgWrap.appendChild(img)
    newItem.appendChild(imgWrap)
    newItem.appendChild(time)
    subtitleWrap.appendChild(subtitle)
    newItem.appendChild(subtitleWrap)

    elCardItem.appendChild(newItem)
}