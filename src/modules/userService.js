export class UserService {
    constructor(url) {
        this._url = url;
    }

    get url() { return this._url }

    set url(url) { this._url = url }

    getUsers() {
        return fetch(this._url)
            .then(res => {
                this.isValidate(res.ok)
                if (res.ok) {
                    return res.json()
                }
            })
            .catch(error => console.log(error.message))
    }

    addUser(user) {
        return fetch(this._url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .catch(error => console.log(error.message))
    }

    removeUser(id) {
        return fetch(`${this._url}/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .catch(error => console.log(error.message))
    }


    changeUser(id, data) {
        return fetch(`${this._url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .catch(error => console.log(error.message))
    }

    getUser(id) {
        return fetch(`${this._url}/${id}`)
            .then(res => res.json())
            .catch(error => console.log(error.message))
    };

    editUser(id, user) {
        return fetch(`${this._url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .catch(error => console.log(error.message))
    }

    filterUsers(filterOption) {
        return fetch(`${this._url}?${filterOption}=true`)
            .then(res => res.json())
            .catch(error => console.log(error.message))
    }

    getSortUsers(sortOptions) {
        return fetch(`${this._url}?_sort=${sortOptions.name}&_order=${sortOptions.value}`)
            .then(res => res.json())
            .catch(error => console.log(error.message))
    }

    getSearchUsers(str) {
        return fetch(`${this._url}?name_like=${str}`)
            .then(res => res.json())
            .catch(error => console.log(error.message))

    }
    isValidate(boolean) {
        const table = document.querySelector('.table-responsive')

        table.insertAdjacentHTML('beforeend', `
        <div id='errorBlock' class='col d-flex justify-content-center'></div>
        `)

        const errorBlock = document.getElementById('errorBlock')

        if (!boolean) {
            errorBlock.textContent = 'Произошла ошибка, данных нет!'
        } else {
            errorBlock.textContent = ''
        }
    }

}
