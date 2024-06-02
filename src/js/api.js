//se crea una constante con el endpoint en el json-server
const API = "http://localhost:3000/songs"
export async function agregarCancion(newSong) {
    await fetch(API, {
        method: "POST",
        body: JSON.stringify(newSong),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export async function traerCancionesFavoritas() {
    const response = await fetch(`${API}?favorite=true`)
    const data = await response.json()
    return data
}