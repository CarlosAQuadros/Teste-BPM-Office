//========== api cep consult: (https://postmon.com.br/) implement ======//

var zipCode = $("#inputPostCode");
const showData = (result) => {
    for (const field in result) {
        if (document.querySelector("#input_" + field)) { //code didn't work with jquery shorthands, 
            document.querySelector("#input_" + field).value = result[field]
        }
    }
}
zipCode.blur((Event) => {
    let fomatedZip = zipCode.val().replace("-", "")

    const options = {
        method: "GET",
        mode: "cors",
        cache: "default"
    }

    fetch(`https://api.postmon.com.br/v1/cep/${fomatedZip}`, options)
        .then(response => {
            response.json()
                .then(data => showData(data))
        })
        .catch(e => alert("Insira um cep válido"))
})