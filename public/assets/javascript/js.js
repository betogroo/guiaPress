function deleteConfirm(event, form){
    event.preventDefault()
    var decision = confirm("Realmente deletar esta categoria?")
    if(decision){
        form.submit()
    }
}

function editConfirm(event, form){
    event.preventDefault()
    var decision = confirm("Realmente renomear esta categoria?")
    if(decision){
        form.submit()
    }
}

