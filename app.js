let acc = '';
let personaje = document.querySelector('.personajes');
let localidades = document.querySelector('.localidades');
let episodios = document.querySelector('.episodios');
let arrPersonajes = [];
let arrLocalidades = [];
let arrEpisodios = [];
let resultados = document.getElementById('resultados');
let resultadosLoc = document.getElementById('resultadosLoc');
let resultadosEpi = document.getElementById('resultadosEpi');
let resulPaginas = document.getElementById('resultadosPaginas');

let currentNext = '';
let currentPrev = '';

let siguiente = document.getElementById('siguiente');
let anterior = document.getElementById('anterior');


function inicio() {
	resultados.innerHTML = "";
	resulPaginas.innerHTML = "";
	resultadosLoc.innerHTML = "";
	resultadosEpi.innerHTML = "";

	resultados.classList.add("deshabilitar")
	resultadosLoc.classList.add("deshabilitar")
	resultadosEpi.classList.add("deshabilitar");
	resulPaginas.classList.add("deshabilitar")

	anterior.disabled = true;
	siguiente.disabled = true;

}

function mostrarPersonaje(personaje) {
	acc += `
    <div class='cont-personaje'>
      <div class="cont-img">
        <img src="${personaje.image}"/>
      </div>
      <div class="cont-info">
        <h5 class="name">${personaje.name}</h5>
        <p class="gender">genero: ${personaje.gender}</p>
        <p class="species">especie: ${personaje.species}</p>
        <p class="status">status: ${personaje.status}</p>
        </div>
     </div>
    `;
}

function mostrarLocalidad(localidad) {
	acc += `
    <div class='cont-localidad'>
      <div class="cont-info">
        <h5 class="name">${localidad.name}</h5>
			  <p class="gender"><span>tipo:</span> ${localidad.type}</p>
        <p class="species"><span>dimension:</span> ${localidad.dimension}</p>
      </div>
     </div>
    `;
}

function mostrarEpisodio(episodio) {
	acc += `
    <div class='cont-episodio'>
      <div class="cont-info">
        <h5 class="name">${episodio.name}</h5>
        <p class="fecha">fecha: ${episodio.air_date}</p>
        <p class="episodio"><span>episodio:</span> ${episodio.episode}</p>
      </div>
    </div>
    `;
}

personaje.addEventListener('click', (e) => {
	fetch(`https://rickandmortyapi.com/api/character`)
		.then(res => res.json())
		.then(data => {
			arrPersonajes = [...data.results];
			currentNext = data.info.next;
			resultadosLoc.classList.add("deshabilitar");
			resultadosEpi.classList.add("deshabilitar");
			resultados.classList.remove("deshabilitar");
			resulPaginas.classList.add("deshabilitar");

			resultados.innerHTML = "";
			arrPersonajes.map((personaje) => {
				mostrarPersonaje(personaje);
			});

			resultados.innerHTML = acc;
			acc = "";
			if (data.info.prev == null) {
				anterior.disabled = true;
			} else {
				anterior.disabled = false;
			};
			if (data.info.next == null) {
				siguiente.disabled = true;
			} else {
				siguiente.disabled = false;
			};
		})
		.catch(err => { console.log(err) });
});

localidades.addEventListener('click', (e) => {
	fetch(`https://rickandmortyapi.com/api/location`)
		.then(res => res.json())
		.then(data => {
			arrLocalidades = [...data.results];
			currentNext = data.info.next;
			resultados.classList.add("deshabilitar");
			resultadosEpi.classList.add("deshabilitar");
			resultadosLoc.classList.remove("deshabilitar");
			resulPaginas.classList.add("deshabilitar");

			resultadosLoc.innerHTML = "";

			arrLocalidades.map((localidad) => {
				mostrarLocalidad(localidad);
			})

			resultadosLoc.innerHTML = acc;
			acc = "";
			if (data.info.prev == null) {
				anterior.disabled = true;
			} else {
				anterior.disabled = false;
			};
			if (data.info.next == null) {
				siguiente.disabled = true;
			} else {
				siguiente.disabled = false;
			};
		})
		.catch(err => { console.log(err) });
})

episodios.addEventListener('click', (e) => {
	fetch(`https://rickandmortyapi.com/api/episode`)
		.then(res => res.json())
		.then(data => {
			arrEpisodios = [...data.results];
			currentNext = data.info.next;

			resultados.classList.add("deshabilitar")
			resultadosLoc.classList.add("deshabilitar")
			resultadosEpi.classList.remove("deshabilitar");
			resulPaginas.classList.add("deshabilitar")

			resultadosEpi.innerHTML = "";

			arrEpisodios.map((episodio) => {
				mostrarEpisodio(episodio);
			})

			resultadosEpi.innerHTML = acc;
			acc = "";
			if (data.info.prev == null) {
				anterior.disabled = true;
			} else {
				anterior.disabled = false;
			}
			if (data.info.next == null) {
				siguiente.disabled = true;
			} else {
				siguiente.disabled = false;
			}
		})
		.catch(err => { console.log(err) });
})
//__________________________________________________________________
siguiente.addEventListener('click', () => {
	fetch(currentNext)
		.then(res => res.json())
		.then(data => {
			if (currentNext.includes('character')) {
				arrPersonajes = [...data.results];
				arrPersonajes.map((personaje) => {
					mostrarPersonaje(personaje);
				})
			};
			if (currentNext.includes('location')) {
				arrLocalidades = [...data.results];
				arrLocalidades.map((localidad) => {
					mostrarLocalidad(localidad);
				})
			};
			if (currentNext.includes('episode')) {
				arrEpisodios = [...data.results];
				arrEpisodios.map((episodio) => {
					mostrarEpisodio(episodio);
				})
			};

			currentNext = data.info.next;
			currentPrev = data.info.prev;

			resultados.classList.add("deshabilitar");
			resultadosLoc.classList.add("deshabilitar");
			resultadosEpi.classList.add("deshabilitar");
			resulPaginas.classList.remove("deshabilitar");

			resulPaginas.innerHTML = "";

			resulPaginas.innerHTML = acc;
			acc = "";

			if (data.info.next == null) {
				siguiente.disabled = true;
			} else {
				anterior.disabled = false;
			};
			if (data.info.next == null) {
				siguiente.disabled = true;
			} else {
				siguiente.disabled = false;
			};
		})
		.catch(err => { console.log(err) });
})

anterior.addEventListener('click', (e) => {
	fetch(currentPrev)
		.then(res => res.json())
		.then(data => {
			if (currentNext.includes('character')) {
				arrPersonajes = [...data.results];
				arrPersonajes.map((personaje) => {
					mostrarPersonaje(personaje);
				});
			};
			if (currentNext.includes('location')) {
				arrLocalidades = [...data.results];
				arrLocalidades.map((localidad) => {
					mostrarLocalidad(localidad);
				});
			};
			if (currentNext.includes('episode')) {
				arrEpisodios = [...data.results];
				arrEpisodios.map((episodio) => {
					mostrarEpisodio(episodio);
				});
			};

			currentNext = data.info.next;
			currentPrev = data.info.prev;

			resultados.classList.add("deshabilitar");
			resultadosLoc.classList.add("deshabilitar");
			resultadosEpi.classList.add("deshabilitar");
			resulPaginas.classList.remove("deshabilitar");

			resulPaginas.innerHTML = "";

			resulPaginas.innerHTML = acc;
			acc = "";

			currentPrev = data.info.prev
			if (data.info.prev == null) {
				anterior.disabled = true;
			} else {
				anterior.disabled = false;
			};
			if (data.info.next == null) {
				siguiente.disabled = true;
			} else {
				siguiente.disabled = false;
			};
		})
		.catch(err => { console.log(err) });
})