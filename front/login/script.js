let matricula = document.getElementById('matricula')
let pin = document.getElementById('pin')

async function login() {
    let response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            matricula: matricula.value,
            pin: pin.value
        })
    });
    if(response.status == 200){
        const token = await jwt.sign({ matricula: colaborador.matricula }, process.env.KEY, {
            //expira em uma hora ou 3600 segundos
            expiresIn: 3600
    });
}
}
