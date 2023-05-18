//agrego mi input y mi boton de buscar
const buscar = document.querySelector('#btn');
const inputBuscar = document.querySelector('#buscarVideo')
let contenedorVideo = document.querySelector("#iframe");
let creador = document.querySelector('#creador')
let logoCreador = document.querySelector('#logo-creador')
let titulo = document.querySelector('#video h2')
//comentarios
let contenedorComentarios = document.querySelector('#caja-comentarios')
let nComentarios= document.querySelector('#nComentarios') //revisar
//Descriptions
let likes = document.querySelector('#likes p')
let views = document.querySelector('#views p')
let fecha = document.querySelector('#fecha')
let hashtags = document.querySelector('#hashtags')
let descripcion = document.querySelector('#description-video')
//Videos relacionados
let videosRecomendados = document.querySelector('#lista-videos')



//  son las opciones que se usa para consumir los datos que trae la API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c010562850msh841c7710e92fd1ep163100jsn30b1d49c937e',
		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
	}
};

//Agrego un evento de escucha al buscar, para que no me consuma tantos recursos de busqueda de la api y solo haga las cosas cuando hago click en el boton
buscar.addEventListener('click',(e)=>{
    e.preventDefault();
    getVideo(inputBuscar.value)
    

})

//funcion para traerme los datos de la API
//le paso el value que recibe el input para poder buscar el video que quiero por el id
const getVideo = async(inputBuscar)=>{
    options.method = "GET";     
    let video = await ( await fetch(`https://youtube138.p.rapidapi.com/search/?q=${inputBuscar}&hl=en&gl=US`,options)).json();
    //Video
    contenedorVideo.src = `https://www.youtube.com/embed/${video.contents[0].video.videoId}`
    let id = video.contents[0].video.videoId
    //Especificaciones del canal
    //Nombre
    creador.innerHTML = video.contents[0].video.author.title
    //Logo
    logoCreador.src = video.contents[0].video.author.avatar[0].url
    getComments(id)
    //título video
    titulo.innerHTML = video.contents[0].video.title
    getDescription(id)
    //videos recomendados
    getVideosRelacionados(id)
}

//funcion comentarios
const getComments = async(id)=>{
    options.method = "GET";     
    let comments = await ( await fetch(`https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`,options)).json();
    comments.innerHTML=``
    for(let i=0;i<comments.comments.length;i++){

        contenedorComentarios.innerHTML += `
        <div class=comentario>
            <h3>${comments.comments[i].author.title}</h3>
            <p>${comments.comments[i].content}</p>
        </div>
        `
    }
}

//Description
const url = 'https://youtube138.p.rapidapi.com/video/details/?id=kJQP7kiw5Fk&hl=en&gl=US';

const getDescription = async(id)=>{
    options.method = "GET";
    let description = await ( await fetch(`https://youtube138.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`,options)).json();
    likes.innerHTML = description.stats.likes
    views.innerHTML = description.stats.views
    nComentarios.innerHTML = `Número de comentarios: ${description.stats.comments} `//revisar
    fecha.innerHTML = description.publishedDate
    descripcion.innerHTML = description.description
    hashtags.innerHTML=``
    for (let i=0; i<description.superTitle.items.length;i++){
        hashtags.innerHTML += description.superTitle.items[i]
    }
}
//Videos relacionados
const getVideosRelacionados = async(id)=>{
    options.method = "GET";
    let videosRelacionados = await ( await fetch(`https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`,options)).json();
    videosRecomendados.innerHTML = ``
    for(let i=0; i<3;i++){
        
        videosRecomendados.innerHTML += `
        <iframe width="430" height="245" src="https://www.youtube.com/embed/${videosRelacionados.contents[i].video.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `
    }
}



