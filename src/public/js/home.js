console.log('home.js')

$('.addToCart').click(function () {
    const id = $(this).attr('data-id')
    $.ajax({
        type: "POST",
        url: `${URL}/cart/addToCart/${id}`,
        contentType: 'application/json',
        encode: true,
    }).done(function (res) {
        console.log(res)
        swal("Đã thêm vào giỏ!", "", "success")
        updateTotalQuantity()
    })
})

function updateTotalQuantity() {
    return (
        $.ajax({
            type: "GET",
            url: `${URL}/cart/getTotalQuantity`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            console.log(res)
            $('#cartAmount').html(res.data)
        })
    )
}