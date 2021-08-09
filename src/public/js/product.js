
console.log('product')
// const URL = 'http://localhost:3000'
$.ajax({
    type: "GET",
    url: `${URL}category/getCategory`,
    contentType: 'application/json',
    encode: true,
}).done(function (res) {
    Array.from(res.data).forEach(item => {
        $('.select-form').append(`
            <option value="${item._id}">${item.name}</option>
        `)
    })
})


function editButtonClick() {
    return (
        $('.editProduct').click(function (e) {
            let id = $(this).attr('data-id')
            let name = $('#' + id + '_name').html()
            let price = $('#' + id + '_price').html()
            let info = $('#' + id + '_info').html()
            let imageSrc = $('#' + id + '_image').attr('src')
            let category = $('#' + id + '_category').html()

            $('.product-edit-modal input[name=name]').val(name)
            $('.product-edit-modal input[name=price]').val(price)
            $('.product-edit-modal input[name=info]').val(info)
            $('.product-edit-modal input[name=category]').val(category)
            $('.current-image img').attr('src', imageSrc)
            $('.product-edit-modal').attr('data-id', id)
            $('.product-edit-modal').attr('action', `/product/edit/${id}`)
        })
    )
}

function deletee() {
    return (
        $('.deleteProduct').click(function (e) {
            const id = $(this).attr('data-id')
            $.ajax({
                type: "DELETE",
                url: `${URL}product/delete/${id}`,
                contentType: 'application/json',
                encode: true,
            }).done(function (res) {
                if (res.status == true) {
                    $('#' + id + '_container').html('')
                }
            })
        })
    )
}



editButtonClick()
deletee()
