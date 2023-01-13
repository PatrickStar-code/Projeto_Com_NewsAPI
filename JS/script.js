
$(document).ready(function () {

    const categorias = {
        Destaque: "https://newsapi.org/v2/top-headlines?country=br&apiKey=b1dcddf3957e4b99835cf2470b05d408",
        bussines: "https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=b1dcddf3957e4b99835cf2470b05d408",
        entertainment: "https://newsapi.org/v2/top-headlines?country=br&category=entertainment&apiKey=b1dcddf3957e4b99835cf2470b05d408",
        health: "https://newsapi.org/v2/top-headlines?country=br&category=health&apiKey=b1dcddf3957e4b99835cf2470b05d408",
        science: "https://newsapi.org/v2/top-headlines?country=br&category=science&apiKey=b1dcddf3957e4b99835cf2470b05d408",
        sports: "https://newsapi.org/v2/top-headlines?country=br&category=sports&apiKey=b1dcddf3957e4b99835cf2470b05d408",
        technology: "https://newsapi.org/v2/top-headlines?country=br&category=technology&apiKey=b1dcddf3957e4b99835cf2470b05d408"
    }


    const categoria_texto ={
        Destaque : "Em Destaque",
        bussines: "Noticias de Negocio",
        entertainment: "Noticias de Entretenimento",
        health: "Noticias de Saude",
        science: "Noticias de Ciencia",
        sports: "Noticias de Esporte",
        technology: "Noticias de Tecnologia"
    }
    var url = "https://newsapi.org/v2/top-headlines?country=br&apiKey=b1dcddf3957e4b99835cf2470b05d408"
    $.get(url,
        function (data) {
            for (let i = 0; i < data.articles.length; i++) {
                var html = ` <div>
            <img class="relative z-10 object-cover w-full rounded-md h-96"
                src="${data.articles[i].urlToImage}"
                alt="">

            <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow ">
                <a href="article?i=${i}" class="font-semibold text-gray-800 hover:underline">
                ${data.articles[i].title}                
                </a>

                <p class="mt-3 text-sm text-gray-500  md:text-sm">
                ${data.articles[i].description}                
                </p>

                <p class="mt-3 text-sm text-blue-500">${data.articles[i].publishedAt}  </p>
            </div>
        </div>`

                $("#noticias").append(html);

            }

        }
    );
    $("#categoria").change(function (e) {

        e.preventDefault();
        const categoria_escolhida = $("#categoria").val();
        const url_categoria = categorias[categoria_escolhida];
        $("#loader").show();

        $.get(url_categoria,
            function (data) {
                $("#noticias").empty();

                for (let i = 0; i < data.articles.length; i++) {
                    const html = ` <div>
                    <img class="relative z-10 object-cover w-full rounded-md h-96"
                        src="${data.articles[i].urlToImage}"
                        alt="">
        
                    <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow ">
                        <a href="article?i=${i}" class="font-semibold text-gray-800 hover:underline">
                        ${data.articles[i].title}                
                        </a>
        
                        <p class="mt-3 text-sm text-gray-500  md:text-sm">
                        ${data.articles[i].description}                
                        </p>
        
                        <p class="mt-3 text-sm text-blue-500">${data.articles[i].publishedAt}  </p>
                    </div>
                </div>`

                    $("#noticias").append(html);
                   

                }

                $("#texto_categoria").html(categoria_texto[categoria_escolhida]);

                $("#loader").hide();
            }
        );


    });

    $("#pesquisar").submit(function (e) { 
        e.preventDefault();
        const pesquisa = $("#simple-search").val(); 
        const categoria_escolhida = $("#categoria").val();
    
        const url = "https://newsapi.org/v2/top-headlines?q="+pesquisa+"&country=br&category="+categoria_escolhida+"&apiKey=b1dcddf3957e4b99835cf2470b05d408"

        $.get(url,
            function (data) {
                $("#noticias").empty();

                for (let i = 0; i < data.articles.length; i++) {
                    var html = ` <div>
                <img class="relative z-10 object-cover w-full rounded-md h-96"
                    src="${data.articles[i].urlToImage}"
                    alt="">
    
                <div class="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow ">
                    <a href="article?i=${i}" class="font-semibold text-gray-800 hover:underline">
                    ${data.articles[i].title}                
                    </a>
    
                    <p class="mt-3 text-sm text-gray-500  md:text-sm">
                    ${data.articles[i].description}                
                    </p>
    
                    <p class="mt-3 text-sm text-blue-500">${data.articles[i].publishedAt}  </p>
                </div>
            </div>`
    
                    $("#noticias").append(html);
                }
                $("#texto_categoria").hide();

    
            }
        );

    });

});
