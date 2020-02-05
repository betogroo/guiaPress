function deleteConfirm(event, form){
    event.preventDefault()
    var decision = confirm("Realmente gostaria de DELETAR?")
    if(decision){
        form.submit()
    }
}

function editConfirm(event, form){
    event.preventDefault()
    var decision = confirm("Realmente gostaria de EDITAR este campo?")
    if(decision){
        form.submit()
    }
}

