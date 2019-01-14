var searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchFunc);
var search = document.getElementById("search");
var content = document.getElementById("content");
var arrayResult = [];
var pages;
var url;
var currentPage = 1;
var sorting = "newest";

function searchFunc () {
    if (search.value.toString() != "" & search.value.toString() != "Please, type any city name here") {
        search.style.border = "1px solid #cde4da";
        search.style.color = "#495057";
        var leftMenu = document.getElementById("left-menu");
        leftMenu.style.display = "block";
        var script = document.createElement("script");
        var country = document.getElementById("country");
        var countryUrl = country.value;
        var count;
        var rentSale;
        var rent = document.getElementById("rent");
        var sale = document.getElementById("sale");
        if (rent.checked)
        {
            rentSale = "rent";
        }
        if (sale.checked)
        {
            rentSale = "buy";
        }
        switch (countryUrl){
            case "https://api.nestoria.com.au":
                count = "au";
                break;
            case "https://api.nestoria.com.br":
                count = "br";
                break;
            case "https://api.nestoria.de":
                count = "de";
                break;
            case "https://api.nestoria.es":
                count = "es";
                break;
            case "https://api.nestoria.fr":
                count = "fr";
                break;
            case "https://api.nestoria.in":
                count = "in";
                break;
            case "https://api.nestoria.it":
                count = "it";
                break;
            case "https://api.nestoria.mx":
                count = "mx";
                break;
            case "https://api.nestoria.co.uk":
                count = "uk";
                break;
        }

        url = countryUrl + "/api?encoding=json&pretty=1&action=search_listings&country=" + count + "&listing_type=" + rentSale +"&place_name=" + search.value.toString();
        currentPage = 1;
        filterFunction();

    }
    else {
        content.innerHTML = "";
        search.style.border = "2px solid red";
        search.style.color = "red";
        search.value = "Please, type any city name here";
        var leftMenu = document.getElementById("left-menu");
        leftMenu.style.display = "none";
    }
}
function callbackFunc (result) {
    if (result.response.total_results > 0 & result.response.total_results != undefined) {
        var sort = document.getElementById("sort");
        sort.style.display = "block";
        pages = result.response.total_pages;
        if (pages <= 11) {
            var page = document.getElementById("page-list");
            var pageLi = document.createElement("li");
            if(currentPage == 1) {
                pageLi.className = "page-item disabled";
            }
            else {
                pageLi.className = "page-item";
            }
            pageLi.id = "previous";
            pageLi.innerHTML = "<a class=\"page-link\" href=\"#\">Previous</a>";
            pageLi.addEventListener("click", previousFunc);
            page.appendChild(pageLi);
            for(var p=1; p<=pages; p++) {
                var pageLi2 = document.createElement("li");
                if(p == currentPage) {
                    pageLi2.className = "page-item active";
                }
                else {
                    pageLi2.className = "page-item";
                }
                pageLi2.id = p;
                pageLi2.innerHTML = "<a class=\"page-link\" href=\"#\">" + p + "</a>";
                pageLi2.addEventListener("click", paginationFunc);
                page.appendChild(pageLi2);
            }
            var pageLi3 = document.createElement("li");
            if (currentPage == pages) {
                pageLi3.className = "page-item disabled";
            }
            else {
                pageLi3.className = "page-item";
            }
            pageLi3.id = "next";
            pageLi3.innerHTML = "<a class=\"page-link\" href=\"#\">Next</a>";
            pageLi3.addEventListener("click", nextFunc);
            page.appendChild(pageLi3);
        }
        else {
            var first = currentPage - 5;
            var second = Number(currentPage) + 5;
            if (currentPage > 6) {
                if (pages - currentPage < 5){
                    var page = document.getElementById("page-list");
                    var pageLi = document.createElement("li");
                    if(currentPage == 1) {
                        pageLi.className = "page-item disabled";
                    }
                    else {
                        pageLi.className = "page-item";
                    }
                    pageLi.id = "previous";
                    pageLi.innerHTML = "<a class=\"page-link\" href=\"#\">Previous</a>";
                    pageLi.addEventListener("click", previousFunc);
                    page.appendChild(pageLi);
                    for(var p=pages-10; p<=pages; p++) {
                        var pageLi2 = document.createElement("li");
                        if(p == currentPage) {
                            pageLi2.className = "page-item active";
                        }
                        else {
                            pageLi2.className = "page-item";
                        }
                        pageLi2.id = p;
                        pageLi2.innerHTML = "<a class=\"page-link\" href=\"#\">" + p + "</a>";
                        pageLi2.addEventListener("click", paginationFunc);
                        page.appendChild(pageLi2);
                    }
                    var pageLi3 = document.createElement("li");
                    if (currentPage == pages) {
                        pageLi3.className = "page-item disabled";
                    }
                    else {
                        pageLi3.className = "page-item";
                    }
                    pageLi3.id = "next";
                    pageLi3.innerHTML = "<a class=\"page-link\" href=\"#\">Next</a>";
                    pageLi3.addEventListener("click", nextFunc);
                    page.appendChild(pageLi3);
                }
                else {
                    var page = document.getElementById("page-list");
                    var pageLi = document.createElement("li");
                    if(currentPage == 1) {
                        pageLi.className = "page-item disabled";
                    }
                    else {
                        pageLi.className = "page-item";
                    }
                    pageLi.id = "previous";
                    pageLi.innerHTML = "<a class=\"page-link\" href=\"#\">Previous</a>";
                    pageLi.addEventListener("click", previousFunc);
                    page.appendChild(pageLi);
                    for(var p=first; p<=second; p++) {
                        var pageLi2 = document.createElement("li");
                        if(p == currentPage) {
                            pageLi2.className = "page-item active";
                        }
                        else {
                            pageLi2.className = "page-item";
                        }
                        pageLi2.id = p;
                        pageLi2.innerHTML = "<a class=\"page-link\" href=\"#\">" + p + "</a>";
                        pageLi2.addEventListener("click", paginationFunc);
                        page.appendChild(pageLi2);
                    }
                    var pageLi3 = document.createElement("li");
                    if (currentPage == pages) {
                        pageLi3.className = "page-item disabled";
                    }
                    else {
                        pageLi3.className = "page-item";
                    }
                    pageLi3.id = "next";
                    pageLi3.innerHTML = "<a class=\"page-link\" href=\"#\">Next</a>";
                    pageLi3.addEventListener("click", nextFunc);
                    page.appendChild(pageLi3);
                }
            }
            else {
                var page = document.getElementById("page-list");
                var pageLi = document.createElement("li");
                if(currentPage == 1) {
                    pageLi.className = "page-item disabled";
                }
                else {
                    pageLi.className = "page-item";
                }
                pageLi.id = "previous";
                pageLi.innerHTML = "<a class=\"page-link\" href=\"#\">Previous</a>";
                pageLi.addEventListener("click", previousFunc);
                page.appendChild(pageLi);
                for(var p=1; p<=11; p++) {
                    var pageLi2 = document.createElement("li");
                    if(p == currentPage) {
                        pageLi2.className = "page-item active";
                    }
                    else {
                        pageLi2.className = "page-item";
                    }
                    pageLi2.id = p;
                    pageLi2.innerHTML = "<a class=\"page-link\" href=\"#\">" + p + "</a>";
                    pageLi2.addEventListener("click", paginationFunc);
                    page.appendChild(pageLi2);
                }
                var pageLi3 = document.createElement("li");
                if (currentPage == pages) {
                    pageLi3.className = "page-item disabled";
                }
                else {
                    pageLi3.className = "page-item";
                }
                pageLi3.id = "next";
                pageLi3.innerHTML = "<a class=\"page-link\" href=\"#\">Next</a>";
                pageLi3.addEventListener("click", nextFunc);
                page.appendChild(pageLi3);
            }
        }
        content.innerHTML = "";
        arrayResult = result;
        for (var i = 0; i < arrayResult.response.listings.length; i++) {
            var img_url = arrayResult.response.listings[i].img_url;
            var bath = arrayResult.response.listings[i].bathroom_number;
            var bed = arrayResult.response.listings[i].bedroom_number;
            var car = arrayResult.response.listings[i].car_spaces;
            var keywords = arrayResult.response.listings[i].keywords;
            var latitude = arrayResult.response.listings[i].latitude;
            var longitude = arrayResult.response.listings[i].longitude;
            var price = arrayResult.response.listings[i].price;
            var price_currency = arrayResult.response.listings[i].price_currency;
            var price_type = arrayResult.response.listings[i].price_type;
            var summary = arrayResult.response.listings[i].summary;
            var title = arrayResult.response.listings[i].title;
            var thumb_url = arrayResult.response.listings[i].thumb_url;
            var div = document.createElement("div");
            var priceFinal;
            if (price == undefined) {
                priceFinal = "price negotiable";
            }
            else {
                priceFinal = price_currency + price + " " + price_type;
            }
            div.className = "container";
            div.id = "house";
            div.innerHTML = "<div class=\"row\">\n" +
                "    <div class=\"column\">\n" +
                "        <div>\n" +
                "            <h6>" + title + "</h6>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>\n" +
                "<div class=\"row\">\n" +
                "    <div class=\"col-md-2\">\n" +
                "        <div>\n" +
                "            <img src=\"" + thumb_url + "\">\n" +
                "        </div>\n" +
                "        <div class=\"row\">\n" +
                "            <div class=\"col-md-2\" id=\"price\" >\n" +
                "                <div>\n" +
                "                    <p>" + priceFinal + "</p>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <div class=\"col-md-8\">\n" +
                "        <div class=\"row\">\n" +
                "            <div class=\"column\">\n" +
                "                <div>\n" +
                "                    <p>" + summary + "</p>\n" +
                "                </div>\n" +
                "                <div class=\"row\">\n" +
                "                    <div class=\"col-md-8\">\n" +
                "                        <div>\n" +
                "                            <p><mark><small>" + keywords + "</small></mark></p>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                " <div class=\"row\">\n" +
                " <div class=\"col-md-8\">\n" +
                " <div>\n" +
                " <p class=\"font-weight-bold\">Bedrooms:" + bed + " Bathrooms:" + bath + " Car spaces:" + car + "</p>\n" +
                " </div>\n" +
                " </div>\n" +
                " </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <div class=\"col-md-2\">\n" +
                "        <div>\n" +
                "            <p class=\"details\" data-toggle=\"modal\" data-target=\".modal-large\" id=\"" + i.toString() + "\">Details</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
            content.appendChild(div);
            var detailsButton = document.getElementById(i.toString());
            detailsButton.addEventListener("click", modalFunction);
            detailsButton.addEventListener("mouseenter", onEnterButton);
            detailsButton.addEventListener("mouseleave", onLeaveButton);
            var filterButton = document.getElementById("filterButton");
            filterButton.addEventListener("click", prefilterFunction);
            var newFirst = document.getElementById("new-first");
            var cheapFirst = document.getElementById("cheap-first");
            newFirst.addEventListener("click", newFirstFunc);
            cheapFirst.addEventListener("click", cheapFirstFunc);
        }
    }
    else {
        content.innerHTML = "";
        var sort = document.getElementById("sort");
        sort.style.display = "none";
        var div = document.createElement("div");
        div.className = "no-result";
        div.innerHTML = "There is nothing to display! Try to set another parameters";
        content.appendChild(div);
    }
}

function onEnterButton() {
    document.body.style.cursor = "pointer";
}

function onLeaveButton() {
    document.body.style.cursor = "default";
}

function modalFunction() {
    for (var i = 0; i < arrayResult.response.listings.length; i++) {
        if (this.id == i) {

            var house = document.createElement("div");
            var latitude = arrayResult.response.listings[i].latitude;
            var longitude = arrayResult.response.listings[i].longitude;
            var price = arrayResult.response.listings[i].price;
            var price_currency = arrayResult.response.listings[i].price_currency;
            var price_type = arrayResult.response.listings[i].price_type;
            var priceFinal;
            if (price == undefined) {
                priceFinal = "price negotiable";
            }
            else {
                priceFinal = price_currency + price + " " + price_type;
            }
            var title = arrayResult.response.listings[i].title;
            var summary = arrayResult.response.listings[i].summary;
            var keywords = arrayResult.response.listings[i].keywords;
            var modalLabel = document.getElementById("modal-label");
            modalLabel.innerHTML = title;
            var img_url = arrayResult.response.listings[i].img_url;
            var modalBody = document.getElementById("modal-body");
            modalBody.innerHTML = "<div class=\"row\">\n" +
                "    <div class=\"col-md-8\">\n" +
                "        <img src=\""+ img_url +"\">\n" +
                "    </div>\n" +
                "    <div class=\"col-md-4\">\n" +
                "        <div class=\"row\">\n" +
                "            <p>" + summary + "</p>\n" +
                "        </div>\n" +
                "        <div class=\"row\">\n" +
                "            <p><small><mark>" + keywords + "</mark></small></p>\n" +
                "        </div>\n" +
                "        <div class=\"row\" id=\"price\">\n" +
                "            <p>" + priceFinal + "</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>\n" +
                "<div class=\"row\">\n" +
                "    <div class=\"col-md-12\" id=\"map\" style=\"width: 800px; height: 300px\">\n" +
                "\n" +
                "    </div>\n" +
                "</div>";
            var map, myPlacemark;
            map = new ymaps.Map("map", {
                center: [latitude, longitude],
                zoom: 14
            });
            myPlacemark = new ymaps.Placemark([latitude, longitude], { hintContent: title, balloonContent: 'title' });
            map.geoObjects.add(myPlacemark);
            modalBody.appendChild(house);
        }
    }
}

function prefilterFunction() {
    currentPage = 1;
    filterFunction();
}

function filterFunction() {
    var page = document.getElementById("page-list");
    page.innerHTML = "";
    var lowPrice = document.getElementById("low-price");
    var highPrice = document.getElementById("high-price");
    var bedrooms = document.getElementById("bedrooms");
    var bathrooms = document.getElementById("bathrooms");
    var script = document.createElement("script");
    script.src = url + "&page=" + currentPage + "&price_min=" + lowPrice.value + "&price_max=" + highPrice.value + "&bedroom_min=" + bedrooms.value + "&bedroom_max=" + bedrooms.value + "&bathroom_min=" + bathrooms.value + "&bathroom_max=" + bathrooms.value + "&sort=" + sorting + "&callback=callbackFunc";
    document.getElementsByTagName("head")[0].appendChild(script);
}

function paginationFunc() {
    currentPage = this.id.toString();
    filterFunction();
}

function previousFunc() {
    if (currentPage != 1) {
        currentPage--;
        filterFunction();
    }
}

function nextFunc() {
    if (currentPage != pages) {
        currentPage++;
        filterFunction();
    }
}

function newFirstFunc() {
    sorting = "newest";
    prefilterFunction();
}

function cheapFirstFunc() {
    sorting = "price_lowhigh";
    prefilterFunction();
}
