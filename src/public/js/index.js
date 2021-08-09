// const URL = 'http://localhost:3000/'
const URL = 'https://fullproject-men.herokuapp.com/'

function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

function updateTotalQuantity() {
    return (
        $.ajax({
            type: "GET",
            url: `${URL}cart/getTotalQuantity`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            console.log(res)
            $('#cartAmount').html(res.data)
        })
    )
}



updateTotalQuantity()