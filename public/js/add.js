const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeAddress = document.getElementById('store-address');


async function addStore(e) {
    e.preventDefault();
    if (storeId.value === '' || storeAddress.value == '') {
        alert('Please fill in fields')
    }

    const payload = {
        storeId: storeId.value,
        address: storeAddress.value
    }

    try {
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify(payload)
        });
        if (res.status === 400) {
            throw Error('Store already exist!')
        }

        alert('store has been added')
        window.location.href = '/index.html'
    } catch (error) {
        alert(error)
        return
    }
}
storeForm.addEventListener('submit', addStore)

