//agrego mi input y mi boton de buscar
const buscar = document.querySelector('#btn');
const inputBuscar = document.querySelector('#buscarVideo')
let contenedorVideo = document.querySelector("#iframe");
let creador = document.querySelector('#creador')
let logoCreador = document.querySelector('#logo-creador')
let titulo = document.querySelector('#video h2')
//comentarios
let contenedorComentarios = document.querySelector('#caja-comentarios')
let nComentarios= document.querySelector('#header-comentarios') //revisar
//Descriptions
let likes = document.querySelector('#likes p')
let views = document.querySelector('#views p')




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
}

//funcion comentarios
const getComments = async(id)=>{
    options.method = "GET";     
    let comments = await ( await fetch(`https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`,options)).json();

    for(let i=0;i<comments.comments.length;i++){

        contenedorComentarios.innerHTML += `
        <div class="comentario">
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
    nComentarios.innerHTML = `<h4>Número de comentarios: ${description.stats.comments}</h4> ` //revisar

}








