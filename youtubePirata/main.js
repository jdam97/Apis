//agrego mi input y mi boton de buscar
const buscar = document.querySelector('#btn');
const inputBuscar = document.querySelector('#buscarVideo')
let contenedorVideo = document.querySelector("#iframe");
let creador = document.querySelector('#creador')
let logoCreador = document.querySelector('#logo-creador')

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
    //Especificaciones del canal

}

