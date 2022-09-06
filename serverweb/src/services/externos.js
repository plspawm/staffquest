class ExternosService {

    getRegiones() {
        return fetch("https://api.allorigins.win/raw?url=https://apis.digital.gob.cl/dpa/regiones")
        .then((res)=>res.json())
        .then((json)=>{
            return json
        });
    }
}

export default new ExternosService();