function updateTotalQuantity() {
    return (
        $.ajax({
            type: "GET",
            url: `https://fullproject-men.herokuapp.com/cart/getTotalQuantity`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            console.log(res)
            $('#cartAmount').html(res.data)
        })
    )
}

updateTotalQuantity()