function format(n) {
    return (n * 1000).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
    })
}

let totalPrice = 0

function increase() {
    return (
        $('.inc').click(function () {
            const id = $(this).attr('data-id')
            $.ajax({
                type: "PUT",
                url: `http://localhost:3000/cart/increase/${id}`,
                contentType: 'application/json',
                encode: true,
            }).done(function (res) {
                console.log(res)
                $('#' + id + '_quantityInput').val(res.data)
                updateTotalQuantity()
                updateTotalPrice()
                updatePriceById(res.id)
            })
        })
    )
}

function decrease() {
    return (
        $('.dec').click(function () {
            const id = $(this).attr('data-id')
            $.ajax({
                type: "PUT",
                url: `http://localhost:3000/cart/decrease/${id}`,
                contentType: 'application/json',
                encode: true,
            }).done(function (res) {
                console.log(res)
                updateTotalQuantity()
                updateTotalPrice()
                if (res.data == 0) {
                    $('#' + res.id + '_product').html('')
                    return
                }
                $('#' + id + '_quantityInput').val(res.data)
                updatePriceById(res.id)
            })
        })
    )
}

function updateTotalPrice() {
    return (
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/cart/getTotalPrice`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            totalPrice = res.data
            $('#sumPrice').html(format(totalPrice))
        })
    )
}

function updatePriceById(id) {
    return (
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/cart/getTotalPriceById/${id}`,
            contentType: 'application/json',
            encode: true,
        }).done(function (res) {
            $('#' + id + '_totalPrice').html(format(res.data))
        })
    )
}

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

function deletee() {
    return (
        $('.deletee').click(function () {
            const id = $(this).attr('data-id')
            return (
                $.ajax({
                    type: "DELETE",
                    url: `http://localhost:3000/cart/delete/${id}`,
                    contentType: 'application/json',
                    encode: true,
                }).done(function (res) {
                    $('#' + id + '_product').html('')
                    updateTotalPrice()
                    updateTotalQuantity()
                })
            )
        })
    )
}

function quantityInputOnchange() {
    return (
        $('.quantityInput').change(function () {
            const id = $(this).attr('data-id')
            if (isNaN($(this).val()) || $(this).val() < 1) {
                $(this).val(1)
            }
            const newQuantity = $(this).val()
            
            $.ajax({
                type: "PUT",
                url: `http://localhost:3000/cart/updateQuantity/${id}/${newQuantity}`,
                contentType: 'application/json',
                encode: true,
            }).done(function (res) {
                updatePriceById(id)
                updateTotalPrice()
                updateTotalQuantity()
            })
        })
    )
}


$.ajax({
    type: "GET",
    url: `http://localhost:3000/cart/getCart`,
    contentType: 'application/json',
    encode: true,
}).done(function (res) {
    Array.from(res.data).forEach(item => {
        $('#cart_items').append(`
            <tr id="${item.id}_product">
                <th scope="row">
                    <img src="${item.imageSrc}" alt="" width="75" height="auto">
                </th>
                <td>${item.name}</td>
                <td>    
                    <span id="${item.id}_price" data-id=${item.price}>${format(item.price)}</span>
                </td>
                <td>
                    <div class="congtru">
                        <button class="inc" data-id="${item.id}">+</button>
                        <input id="${item.id}_quantityInput" data-id="${item.id}" class="quantityInput" type="text" value="${item.quantity}" style="width:35px">
                        <button class="dec" data-id="${item.id}">-</button>
                    </div>
                </td>
                <td>
                    <span id="${item.id}_totalPrice" data-id="" class="totalPrice">${format(item.quantity * item.price)}</span>
                </td>
                <td>
                    <a class="deletee" data-id="${item.id}">
                        <button id="btn btn-warning">
                            Delete
                        </button>
                    </a>
                </td>
            </tr>
        `)
    })
    increase()
    decrease()
    deletee()
    quantityInputOnchange()
})

updateTotalPrice()

