function invalid(selector) {
    selector.addClass("is-invalid")
}
function valid(selector) {
    selector.addClass("is-valid")
}
function cleanValidationStatus(selector){
    selector.removeClass("is-valid")
}
$(function () {
    $('#inputCpf').blur(function () {
        var cpf = $('#inputCpf').val().replace(/[^0-9]/g, '');
        if (cpf.length == 11) {
            if (cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999") {
                invalid($('#inputCpf'))
                $('#inputCpf').val('');
            } else {
                $('#inputCpf').removeClass("is-invalid")
                valid($('#inputCpf'))
            }

            var v = [];
            //Calcula o primeiro dígito de verificação, first digit verification//
            v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
            v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
            v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
            v[0] = v[0] % 11;
            v[0] = v[0] % 10;

            //Calcula o segundo dígito de verificação, second digit verification//
            v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
            v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
            v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
            v[1] = v[1] % 11;
            v[1] = v[1] % 10;

            //compara o calculo com o digito preenchido.
            if ((v[0] != cpf[9]) || (v[1] != cpf[10])) {

                invalid($('#inputCpf'))
                $('#inputCpf').val('');
            }
        }
        else {

            $('#inputCpf').val('');
        }
    });
});
var zipCode = $("#inputPostCode");
const showData = (result) => {
    for (const field in result) {
        if (document.querySelector("#input_" + field)) {
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
                .then(data => showData(data),
                    $('#inputPostCode').removeClass("is-invalid"),
                    valid($('#inputPostCode')))
        })
        .catch(e => $('#inputPostCode').val(''), invalid($("#inputPostCode")),
    )
})


$(document).ready(function () {

    $("#form").submit(function (event) {
        console.table($(this).serializeArray());
        event.preventDefault();
        cleanValidationStatus($("#form :input"))
        $("#form :input").val("")
      
    })
});