
console.log('category page js')
// swal("Good job!", "You clicked the button!", "success");

$('.form-create').submit(function (e) {
    e.preventDefault();
    const formData = {
        name: $('.form-create input[name=name]').val(),
    }
    // console.log(formData)
    $.ajax({
        type: "POST",
        url: `${URL}create`,
        contentType: 'application/json',
        data: JSON.stringify(formData),
        encode: true,
    }).done(function (res) {
        console.log(res)
        $('#customer').append(`
            <tr class="text-center" id="${res.data._id}_container">
                <td id="${res.data._id}_name">${res.data.name}</td>
                <td>
                    <button class='btn btn-info edit' data-id="${res.data._id}" data-bs-toggle="modal"
                        data-bs-target="#editModal">Edit modal</button>
                    <button class='btn btn-warning detete' data-id="${res.data._id}">Remove</button>
                </td>
            </tr>
            
        `)
        $('.btn-close').click()
        deletee()
    })
})

function deletee() {
    return (
        $('.detete').click(function (e) {
            const id = $(this).attr('data-id')
            $.ajax({
                type: "DELETE",
                url: `${URL}delete/${id}`,
                contentType: 'application/json',
                encode: true,
            }).done(function (res) {
                console.log(res)
                if (res.status == true) {
                    $('#' + id + '_container').html('')
                } else {
                    alert('Không thể xóa!')
                }
            })
        })
    )
}
deletee()