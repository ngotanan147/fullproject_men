function updateTotalQuantity() {
    return (
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/cart/getTotalQuantity`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            console.log(res)
            $('#cartAmount').html(res.data)
        })
    )
}

updateTotalQuantity()