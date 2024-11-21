const STATUS = [
    {
        key: 0,
        name: 'Chờ xác nhận'
    },
    {
        key: 1,
        name: 'Đang làm'
    },
    {
        key: 2,
        name: 'Hoàn thành'
    }
]

const STATUSNAMES = STATUS.map(val => val.name)
const STATUSKEYS = STATUS.map(val => val.key)

const ROLES = [
    {
        key: 0,
        name: 'Admin',
        id: 'f94b96cc-fc9a-43b7-9791-8bfe7c109930'
    },
    {
        key: 1,
        name: 'Đầu bếp',
        id: '9097011b-94c6-420d-bd5c-bed9908df657'
    },
    {
        key: 2,
        name: 'Kế toán',
        id: 'b3811a5e-0e30-4fa3-8ce6-39f494c8b441'
    }
]

const ROLENAMES = ROLES.map(val => val.name)
const ROLEKEYS = ROLES.map(val => val.key)
const ROLEIDS = ROLES.map(val => val.id)

const isValidPassword = (password) => {
    // Biểu thức chính quy để kiểm tra độ mạnh mật khẩu
    const regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    return regex.test(password);
}

module.exports = {
    STATUS,
    ROLES,
    ROLENAMES,
    ROLEKEYS,
    STATUSNAMES,
    STATUSKEYS,
    isValidPassword,
    ROLEIDS
}